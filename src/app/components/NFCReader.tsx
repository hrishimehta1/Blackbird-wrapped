'use client';

import React from 'react';

interface NFCReaderProps {
  isActivated: boolean;
}

const NFCReader: React.FC<NFCReaderProps> = ({ isActivated }) => {
  return (
    <div className={`nfc-reader ${isActivated ? 'activated' : ''}`}>
      <div className="nfc-symbol"></div>
    </div>
  );
};

export default NFCReader; 