'use client'; // component should be rendered on client side 

import React from 'react';

interface ProgressDotsProps {
  currentScreen: number;
  totalScreens: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ currentScreen, totalScreens }) => { //maintain on all screens
  return (
    <div className="progress-dots">
      {Array.from({ length: totalScreens }).map((_, index) => (
        <div 
          key={index} 
          className={`dot ${index === currentScreen ? 'active' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressDots; 
