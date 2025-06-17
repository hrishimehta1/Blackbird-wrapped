'use client';

import React, { useState, useEffect } from 'react';
import NFCReader from './components/NFCReader';
import Phone from './components/Phone';
import Instructions from './components/Instructions';
import ProgressDots from './components/ProgressDots';
import data from '@/data/data.json'; // Import data here

// Helper function to generate screen data dynamically 
const generateScreens = (my2025: typeof data.my2025) => [
  {
    id: 'screen-0',
    title: 'Blackbird Wrapped',
    stat: '2025',
    description: 'Tap your phone on the NFC reader to unlock your year in dining',
  },
  {
    id: 'screen-1',
    title: 'Total Taps',
    stat: my2025.timeAndFrequency.totalCheckIns,
    description: `You checked into restaurants ${my2025.timeAndFrequency.totalCheckIns} times this year. That's a tap every ${my2025.timeAndFrequency.avgCheckInsPerDay} days!`,
  },
  {
    id: 'screen-2',
    title: '$FLY Earned',
    stat: `$${my2025.flyMetrics.totalFlyEarned.toLocaleString()}`,
    description: `Your dining earned you $${my2025.flyMetrics.totalFlyEarned.toLocaleString()} in $FLY tokens. You're basically a crypto trader now.`,
  },
  {
    id: 'screen-3',
    title: 'Total Spent',
    stat: `$${my2025.spendingPatterns.totalSpent.value.toLocaleString()}`,
    description: `You spent a grand total of $${my2025.spendingPatterns.totalSpent.value.toLocaleString()} on dining this year. Treat yourself!`,
  },
  {
    id: 'screen-4',
    title: 'Favorite Spot',
    stat: my2025.restaurantMetrics.topRestaurantsByCheckIn[0].name,
    description: `${my2025.restaurantMetrics.topRestaurantsByCheckIn[0].checkIns} check-ins at ${my2025.restaurantMetrics.topRestaurantsByCheckIn[0].name}. You're practically family there.`,
  },
  {
    id: 'screen-5',
    title: 'Longest Streak',
    stat: `${my2025.restaurantMetrics.longestStreakAtSameRestaurant.streak} days`,
    description: `Your longest dining streak was ${my2025.restaurantMetrics.longestStreakAtSameRestaurant.streak} consecutive days at ${my2025.restaurantMetrics.longestStreakAtSameRestaurant.restaurant}. Dedication level: Restaurant Regular.`,
  },
  {
    id: 'screen-6',
    title: 'Most Expensive Meal',
    stat: `$${my2025.restaurantMetrics.mostExpensiveMeal.amount.value.toLocaleString()}`,
    description: `Your most lavish meal was at ${my2025.restaurantMetrics.mostExpensiveMeal.restaurant} on ${my2025.restaurantMetrics.mostExpensiveMeal.date}.`,
  },
  {
    id: 'screen-7',
    title: 'Top Restaurants by Spend',
    stat: '',
    description: 'You have expensive taste!',
    renderList: my2025.restaurantMetrics.topRestaurantsBySpend.slice(0, 5).map((restaurant, index) => 
      `${index + 1}. ${restaurant.name} - $${restaurant.totalSpent.value.toLocaleString()}`
    ),
  },
  {
    id: 'screen-8',
    title: 'Top Cuisines by Count',
    stat: '',
    description: 'You\'re a culinary explorer!',
    renderList: my2025.cuisineAndPreferences.topCuisinesByCount.slice(0, 5).map((cuisine, index) => 
      `${index + 1}. ${cuisine.cuisine} (${cuisine.count} visits)`
    ),
  },
  {
    id: 'screen-9',
    title: 'Your Dining Personality',
    stat: my2025.uniqueInsights.diningPersonality,
    description: 'Keep exploring your culinary identity!',
    renderList: my2025.uniqueInsights.personalityTraits.slice(0, 3).map((trait, index) => 
      `- ${trait}`
    ),
  },
  {
    id: 'screen-10',
    title: 'NFC Master',
    stat: '🏆',
    description: 'You\'ve mastered the art of the tap. See you in 2026 for more dining adventures!',
  },
];

export default function Home() {
  const [isNfcReaderActivated, setIsNfcReaderActivated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = React.useMemo(() => generateScreens(data.my2025), [data.my2025]);
  const totalScreens = screens.length;

  const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial', 'flyingTitle', 'nfcInteraction'

  // Orchestrate animations
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (animationPhase === 'initial') {
      timeout = setTimeout(() => {
        setAnimationPhase('flyingTitle');
      }, 500); // Small delay before flying title
    } else if (animationPhase === 'flyingTitle') {
      // Wait for the flying title animation to complete (5s) plus a small buffer
      timeout = setTimeout(() => {
        setAnimationPhase('nfcInteraction');
      }, 5500); // 5s for animation + 500ms buffer
    }

    return () => clearTimeout(timeout);
  }, [animationPhase]);

  useEffect(() => {
    // Global background particle animation
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // Increased frequency
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 1 + 'px'; // Varying size
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`; // Colorful particles
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        particle.style.animation = `float ${Math.random() * 6 + 4}s linear forwards`; // Varying speed
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), (parseFloat(particle.style.animationDuration) * 1000) + 100);
      }
    }, 100); // More frequent particle creation

    return () => clearInterval(interval);
  }, []);

  const handlePhoneTap = (isTapping: boolean) => {
    setIsNfcReaderActivated(isTapping);
    const containerElement = document.querySelector('.container') as HTMLElement;
    if (containerElement) {
      containerElement.classList.toggle('shake', isTapping);
    }
  };

  const handleScreenChange = (screenIndex: number) => {
    setCurrentScreen(screenIndex);
  };

  return (
    // The main layout wrapper. It is the direct child of <body>, which is centered via globals.css
    <>
      {animationPhase === 'flyingTitle' && (
        <div className="flying-title">Blackbird Wrapped 2025</div>
      )}

      {animationPhase === 'nfcInteraction' && (
        <>
          <div className="container"> 
            <NFCReader isActivated={isNfcReaderActivated} />
            <Phone onTap={handlePhoneTap} onScreenChange={handleScreenChange} screens={screens} />
          </div>
          <Instructions />
          <ProgressDots currentScreen={currentScreen} totalScreens={totalScreens} />
          
          {/* Floating Background Elements */}
          <div className="floating-elements">
            <div className="food-icon">🍕</div>
            <div className="food-icon">🍜</div>
            <div className="food-icon">🍣</div>
            <div className="price-tag">$FLY</div>
            <div className="price-tag">$25.99</div>
            <div className="decorative-line"></div>
            <div className="decorative-line"></div>
            <div className="glow-orb"></div>
            <div className="glow-orb"></div>
          </div>
        </>
      )}
    </>
  );
}