'use client'; /* component should be rendered on client side */

import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="instructions">
      <p>Click the phone to tap the NFC reader</p>
    </div>
  );
};

export default Instructions; 
