
import React, { useState } from 'react';
import { MetricConfig } from '../types';

interface MetricCardProps {
  config: MetricConfig;
}

const MetricCard: React.FC<MetricCardProps> = ({ config }) => {
  const { displayConfig, dataConfig, name } = config;
  const [showTooltip, setShowTooltip] = useState(false);

  const formatValue = (val: number) => {
    let formatted = val.toFixed(displayConfig.formatting.decimalPlaces);
    if (displayConfig.formatting.useThousandsSeparator) {
      formatted = parseFloat(formatted).toLocaleString('vi-VN');
    }
    if (displayConfig.formatting.displayFormat === 'Compact') {
      if (val >= 1000000000) return (val / 1000000000).toFixed(1) + 'B';
      if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
      if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
    }
    return `${displayConfig.formatting.prefix}${formatted}${displayConfig.formatting.suffix}`;
  };

  const currentVal = dataConfig.lastRunData?.current || 0;
  const prevVal = dataConfig.lastRunData?.compare || 0;
  const trend = dataConfig.lastRunData?.dod || 0;

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
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    width: '100%',
    transition: 'all 0.2s ease-in-out',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: `${displayConfig.typography.titleSize}px`,
    fontWeight: displayConfig.typography.titleWeight === 'Regular' ? 400 : 
                 displayConfig.typography.titleWeight === 'Medium' ? 500 : 600,
    color: displayConfig.style.titleColor,
    marginBottom: '2px',
    display: 'flex',
    alignItems: 'center',
    textAlign: displayConfig.layout.horizontalAlignment.toLowerCase() as any,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: `${displayConfig.typography.valueSize}px`,
    fontWeight: displayConfig.typography.valueWeight === 'Semi-bold' ? 600 : 700,
    color: displayConfig.style.valueColor,
    lineHeight: '1.2',
  };

  const trendStyle: React.CSSProperties = {
    fontSize: `${displayConfig.typography.comparisonSize}px`,
    color: trend < 0 ? displayConfig.style.trendDownColor : displayConfig.style.trendUpColor,
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className="group hover:shadow-lg hover:border-blue-300">
      <div style={titleStyle}>
        {name}
        {displayConfig.showTooltip && (
          <div className="relative ml-2 inline-flex items-center">
            <i 
              className="fa-regular fa-circle-question text-slate-300 cursor-help hover:text-slate-500 transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            ></i>
            {showTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-56 p-2.5 bg-slate-800 text-white text-[11px] rounded-lg shadow-2xl leading-relaxed whitespace-pre-wrap">
                {displayConfig.tooltipInfo}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800"></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={valueStyle}>
        {formatValue(currentVal)}
      </div>

      {displayConfig.showComparisonMode && (
        <div style={trendStyle}>
          <div className={`flex items-center px-1.5 py-0.5 rounded ${trend < 0 ? 'bg-red-50' : 'bg-green-50'} mr-1.5`}>
            <i className={`fa-solid fa-caret-${trend < 0 ? 'down' : 'up'} mr-1 text-[10px]`}></i>
            <span className="font-bold">{Math.abs(trend).toFixed(1)}%</span>
          </div>
          {displayConfig.showPreviousValue && (
            <span style={{color: displayConfig.style.subTextColor}} className="text-[11px] opacity-70">
              vs prev. ({formatValue(prevVal)})
            </span>
          )}
        </div>
      )}

      {displayConfig.showLatestUpdatedTime && (
        <div className="absolute top-3 right-3 flex items-center space-x-1 opacity-40 group-hover:opacity-100 transition-opacity">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[9px] text-slate-500 font-medium">Live</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
