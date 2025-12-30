
import React, { useState } from 'react';
import { MetricConfig } from '../types';

interface MetricCardProps {
  config: MetricConfig;
  previewValue?: string;
  previewTrend?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  config, 
  previewValue = "40.931.284", 
  previewTrend = -50.1 
}) => {
  const { displayConfig, name } = config;
  const [showTooltip, setShowTooltip] = useState(false);

  const containerStyle: React.CSSProperties = {
    backgroundColor: displayConfig.style.backgroundColor,
    height: `${displayConfig.layout.height}px`,
    padding: `${displayConfig.layout.padding}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: displayConfig.layout.verticalAlignment === 'Top' ? 'flex-start' : 
                     displayConfig.layout.verticalAlignment === 'Middle' ? 'center' : 'flex-end',
    alignItems: displayConfig.layout.horizontalAlignment === 'Left' ? 'flex-start' :
                displayConfig.layout.horizontalAlignment === 'Center' ? 'center' : 'flex-end',
    position: 'relative',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    width: '100%',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: `${displayConfig.typography.titleSize}px`,
    fontWeight: displayConfig.typography.titleWeight === 'Regular' ? 400 : 
                 displayConfig.typography.titleWeight === 'Medium' ? 500 : 600,
    color: displayConfig.style.titleColor,
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: `${displayConfig.typography.valueSize}px`,
    fontWeight: displayConfig.typography.valueWeight === 'Semi-bold' ? 600 : 700,
    color: displayConfig.style.valueColor,
  };

  const trendStyle: React.CSSProperties = {
    fontSize: `${displayConfig.typography.comparisonSize}px`,
    color: previewTrend < 0 ? '#DC2626' : '#16A34A',
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className="group transition-all hover:border-blue-400">
      <div style={titleStyle}>
        {name}
        {displayConfig.showTooltip && (
          <div className="relative ml-1.5">
            <i 
              className="fa-regular fa-circle-question text-slate-300 cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            ></i>
            {showTooltip && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 w-64 p-3 bg-slate-800 text-white text-[11px] rounded shadow-xl leading-relaxed whitespace-pre-wrap pointer-events-none">
                {displayConfig.tooltipInfo}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-right-8 border-r-slate-800"></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={valueStyle}>
        {previewValue}
      </div>

      {displayConfig.showComparisonMode && (
        <div style={trendStyle}>
          <i className={`fa-solid fa-caret-${previewTrend < 0 ? 'down' : 'up'} mr-1`}></i>
          <span className="font-bold">{Math.abs(previewTrend)}%</span>
          {displayConfig.showPreviousValue && (
            <span className="text-slate-400 ml-1 font-normal">vs prev. (80.33M)</span>
          )}
        </div>
      )}

      {displayConfig.showLatestUpdatedTime && (
        <div className="absolute bottom-2 right-2 text-[9px] text-slate-400">
          Updated 2m ago
        </div>
      )}
    </div>
  );
};

export default MetricCard;
