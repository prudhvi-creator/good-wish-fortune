import React from 'react';

interface SevenSegmentDisplayProps {
  value: number | string;
  label?: string;
  isMeasuring?: boolean;
}

export const SevenSegmentDisplay: React.FC<SevenSegmentDisplayProps> = ({
  value,
  label = 'KG',
  isMeasuring = false
}) => {
  const displayVal = typeof value === 'number' 
    ? value.toFixed(1).padStart(5, ' ') 
    : String(value).padStart(5, ' ');

  return (
    <div className="seven-seg-container">
      <div className="seven-seg-glass">
        {/* Shadow segment background for 888.8 look */}
        <div className="seven-seg-background" aria-hidden="true">
          888.8
        </div>
        {/* Active segment LED text */}
        <div className={`seven-seg-active ${isMeasuring ? 'animate-flicker' : ''}`}>
          {displayVal}
        </div>
      </div>
      <div className="seven-seg-unit font-mono text-xs text-red-500 font-bold tracking-widest uppercase mt-1 text-center">
        {label}
      </div>
    </div>
  );
};
