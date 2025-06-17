'use client'; // component should be rendered on client side 

import React, { useState, useEffect } from 'react';
import { playNFCSound } from '@/lib/nfc-audio';
import { 
  createEnhancedParticles, 
  createSuccessCheck, 
  createSoundWaves, 
  createEnhancedRipple 
} from '@/lib/nfc-animations';

interface ScreenData {
  id: string;
  title: string;
  stat: string | number;
  description: string;
  renderList?: string[]; // Optional list for certain screens
}

interface PhoneProps {
  onTap: (isTapping: boolean) => void;
  onScreenChange: (screenIndex: number) => void;
  screens: ScreenData[]; // Correctly typed array of ScreenData
}

const Phone: React.FC<PhoneProps> = ({ onTap, onScreenChange, screens }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const totalScreens = screens.length;

  // Initialize audio context on first user interaction
  // Not sure how i got this to work with audio but it worked 
  useEffect(() => {
    const handleFirstClick = () => {
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }
    };
    
    document.addEventListener('click', handleFirstClick, { once: true });
    return () => document.removeEventListener('click', handleFirstClick);
  }, []);

  const updateScreen = () => {
    const prevScreenElement = document.getElementById(`screen-${currentScreen}`) as HTMLElement;
    if (prevScreenElement) {
      prevScreenElement.classList.remove('active');
    }
    
    const nextScreenIndex = (currentScreen + 1) % totalScreens;
    setCurrentScreen(nextScreenIndex);
    onScreenChange(nextScreenIndex);

    // Delay to match CSS transition
    setTimeout(() => {
      const nextScreenElement = document.getElementById(`screen-${nextScreenIndex}`) as HTMLElement;
      if (nextScreenElement) {
        nextScreenElement.classList.add('active');
      }
    }, 400);

    // Hide tap indicator after first tap
    if (nextScreenIndex === 1) {
      const tapIndicator = document.querySelector('.tap-indicator') as HTMLElement;
      if (tapIndicator) {
        tapIndicator.style.display = 'none';
      }
    }
  };

  const handlePhoneTap = () => {
    const phoneElement = document.getElementById('phone') as HTMLElement;
    const nfcReaderElement = document.querySelector('.nfc-reader') as HTMLElement;
    const containerElement = document.querySelector('.container') as HTMLElement;

    if (!phoneElement || !nfcReaderElement || !containerElement) return;

    onTap(true); // Emit tapping state to parent

    containerElement.classList.add('active'); // Activate holographic glow
    phoneElement.classList.add('tapping'); // Trigger phone tapping animation
    containerElement.classList.add('shake'); // Add screen shake effect
    nfcReaderElement.classList.add('activated'); // Activate NFC reader visual effect
    
    // Create enhanced ripple effect on NFC reader
    createEnhancedRipple(nfcReaderElement);
    createEnhancedParticles(nfcReaderElement); // Create enhanced floating particles
    createSoundWaves(nfcReaderElement); // Create sound wave visualization
    
    // Create success checkmark after delay
    setTimeout(() => {
      createSuccessCheck(nfcReaderElement);
    }, 500);
    
    // Play enhanced NFC sound
    try {
      playNFCSound();
    } catch (e) {
      console.error('Audio not supported or error playing sound:', e);
    }
    
    // Update screen content with delay for dramatic effect
    setTimeout(() => {
      updateScreen();
    }, 700);
    
    // Remove animations
    setTimeout(() => {
      phoneElement.classList.remove('tapping');
      nfcReaderElement.classList.remove('activated');
      containerElement.classList.remove('shake');
    }, 1500);
    
    // Remove holographic glow
    setTimeout(() => {
      containerElement.classList.remove('active');
    }, 2000);
  };

  return (
    <div className="phone" id="phone" onClick={handlePhoneTap}>
      <div className="phone-screen">
        {screens.map((screen: ScreenData, index: number) => (
          <div 
            key={screen.id} 
            className={`screen-content ${currentScreen === index ? 'active' : ''}`} 
            id={screen.id}
          >
            <h2>{screen.title}</h2>
            {screen.stat && <div className="stat">{screen.stat}</div>}
            {screen.description && <p>{screen.description}</p>}
            {screen.renderList && (
              <ul className="stat-list">
                {screen.renderList.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="tap-indicator">Tap me!</div>
    </div>
  );
};

export default Phone;
