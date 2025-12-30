
import React from 'react';
import { MetricConfig } from '../../types';

interface Props {
  config: MetricConfig;
  setConfig: React.Dispatch<React.SetStateAction<MetricConfig>>;
}

const DisplayConfigTab: React.FC<Props> = ({ config, setConfig }) => {
  const handleToggle = (field: string) => {
    setConfig(prev => ({
      ...prev,
      displayConfig: {
        ...prev.displayConfig,
        [field]: !((prev.displayConfig as any)[field])
      }
    }));
  };

  const handleDeepChange = (group: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      displayConfig: {
        ...prev.displayConfig,
        [group]: {
          ...(prev.displayConfig as any)[group],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* 1. General Display */}
      <section className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">1. General display</h3>
        
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[12px] font-bold text-slate-700">Show Tooltip information</p>
            <p className="text-[11px] text-slate-400">These details will be formatted and displayed inside the information icon next to display title name</p>
          </div>
          <button 
            onClick={() => handleToggle('showTooltip')}
            className={`w-10 h-5 rounded-full relative transition-colors ${config.displayConfig.showTooltip ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${config.displayConfig.showTooltip ? 'translate-x-5' : ''}`}></div>
          </button>
        </div>

        {config.displayConfig.showTooltip && (
          <textarea 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 leading-relaxed h-24 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={config.displayConfig.tooltipInfo}
            onChange={(e) => handleDeepChange('', 'tooltipInfo', e.target.value)}
          />
        )}

        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[12px] font-bold text-slate-700">Show Latest updated time</p>
            <p className="text-[11px] text-slate-400">Display a time badge indicating when the data was last refreshed</p>
          </div>
          <button 
            onClick={() => handleToggle('showLatestUpdatedTime')}
            className={`w-10 h-5 rounded-full relative transition-colors ${config.displayConfig.showLatestUpdatedTime ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${config.displayConfig.showLatestUpdatedTime ? 'translate-x-5' : ''}`}></div>
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[12px] font-bold text-slate-700">Show Comparison mode</p>
            <p className="text-[11px] text-slate-400">Show the change between the current value and the previous value.</p>
          </div>
          <button 
            onClick={() => handleToggle('showComparisonMode')}
            className={`w-10 h-5 rounded-full relative transition-colors ${config.displayConfig.showComparisonMode ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${config.displayConfig.showComparisonMode ? 'translate-x-5' : ''}`}></div>
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[12px] font-bold text-slate-700">Show Previous value</p>
            <p className="text-[11px] text-slate-400">Show the previous value next to the change indicator for quick comparison.</p>
          </div>
          <button 
            onClick={() => handleToggle('showPreviousValue')}
            className={`w-10 h-5 rounded-full relative transition-colors ${config.displayConfig.showPreviousValue ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${config.displayConfig.showPreviousValue ? 'translate-x-5' : ''}`}></div>
          </button>
        </div>
      </section>

      {/* 2. Layout */}
      <section className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">2. Layout</h3>
        
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1.5">
             <label className="text-[11px] text-slate-500 font-bold">Height (px)</label>
             <div className="relative">
               <input 
                 type="number" 
                 value={config.displayConfig.layout.height}
                 onChange={(e) => handleDeepChange('layout', 'height', Number(e.target.value))}
                 className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
               />
               <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
             </div>
           </div>
           <div className="space-y-1.5">
             <label className="text-[11px] text-slate-500 font-bold">Padding all (px)</label>
             <div className="relative">
               <input 
                 type="number" 
                 value={config.displayConfig.layout.padding}
                 onChange={(e) => handleDeepChange('layout', 'padding', Number(e.target.value))}
                 className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
               />
               <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
             </div>
           </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] text-slate-500 font-bold">Horizontal Alignment</label>
          <div className="relative">
            <select 
              value={config.displayConfig.layout.horizontalAlignment}
              onChange={(e) => handleDeepChange('layout', 'horizontalAlignment', e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Left</option>
              <option>Center</option>
              <option>Right</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] text-slate-500 font-bold">Vertical Alignment</label>
          <div className="relative">
            <select 
              value={config.displayConfig.layout.verticalAlignment}
              onChange={(e) => handleDeepChange('layout', 'verticalAlignment', e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Top</option>
              <option>Middle</option>
              <option>Bottom</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
        </div>
      </section>

      {/* 3. Typography */}
      <section className="space-y-6">
        <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">3. Typography</h3>
        
        {/* Title Font */}
        <div className="space-y-3">
          <p className="text-[12px] font-bold text-slate-600">Title</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="relative">
                <label className="text-[10px] text-slate-400 absolute left-3 top-1">Font Size</label>
                <input 
                  type="number"
                  value={config.displayConfig.typography.titleSize}
                  onChange={(e) => handleDeepChange('typography', 'titleSize', Number(e.target.value))}
                  className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm focus:outline-none"
                />
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
             </div>
             <div className="relative">
                <label className="text-[10px] text-slate-400 absolute left-3 top-1">Font Style</label>
                <input 
                  type="text"
                  value="IBM Plex Sans"
                  readOnly
                  className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm bg-slate-50"
                />
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
             </div>
          </div>
          <div className="relative">
            <label className="text-[10px] text-slate-400 absolute left-3 top-1">Font Weight</label>
            <select 
              value={config.displayConfig.typography.titleWeight}
              onChange={(e) => handleDeepChange('typography', 'titleWeight', e.target.value)}
              className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm bg-white appearance-none focus:outline-none"
            >
              <option>Regular</option>
              <option>Medium</option>
              <option>Semi-bold</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Main Number Font */}
        <div className="space-y-3">
          <p className="text-[12px] font-bold text-slate-600">Main Number</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="relative">
                <label className="text-[10px] text-slate-400 absolute left-3 top-1">Font Size</label>
                <input 
                  type="number"
                  value={config.displayConfig.typography.valueSize}
                  onChange={(e) => handleDeepChange('typography', 'valueSize', Number(e.target.value))}
                  className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm focus:outline-none"
                />
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
             </div>
             <div className="relative">
                <label className="text-[10px] text-slate-400 absolute left-3 top-1">Font Style</label>
                <input 
                  type="text"
                  value="IBM Plex Sans"
                  readOnly
                  className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm bg-slate-50"
                />
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Number Formatting */}
      <section className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">4. Number Formatting</h3>
        
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400">Main Number</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="relative">
                <label className="text-[10px] text-slate-400 absolute left-3 top-1">Data Type</label>
                <select className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm focus:outline-none appearance-none">
                  <option>Number</option>
                  <option>Currency</option>
                  <option>Percentage</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
             </div>
             <div className="relative">
                <label className="text-[10px] text-slate-400 absolute left-3 top-1">Display Format</label>
                <select className="w-full border border-slate-200 rounded pl-3 pr-8 pt-4 pb-1.5 text-sm focus:outline-none appearance-none">
                  <option>Full</option>
                  <option>Compact</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
             </div>
          </div>
          <div className="flex items-center justify-between py-2">
             <span className="text-[12px] font-medium text-slate-600">Use thousands separator</span>
             <button 
                onClick={() => handleDeepChange('formatting', 'useThousandsSeparator', !config.displayConfig.formatting.useThousandsSeparator)}
                className={`w-10 h-5 rounded-full relative transition-colors ${config.displayConfig.formatting.useThousandsSeparator ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${config.displayConfig.formatting.useThousandsSeparator ? 'translate-x-5' : ''}`}></div>
              </button>
          </div>
        </div>
      </section>

      {/* 5. Style */}
      <section className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">5. Style</h3>
        
        <div className="space-y-3">
          {[
            { label: 'Card Background Colour', field: 'backgroundColor', group: 'style' },
            { label: 'Title Colour', field: 'titleColor', group: 'style' },
            { label: 'Main Number Colour', field: 'valueColor', group: 'style' },
            { label: 'Sub-text Colour', field: 'subTextColor', group: 'style' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <label className="text-[11px] text-slate-500 font-bold mb-1 block">{item.label}</label>
              <div className="flex items-center space-x-2">
                 <div 
                   className="w-8 h-8 rounded border border-slate-200 cursor-pointer" 
                   style={{ backgroundColor: (config.displayConfig.style as any)[item.field] }}
                 ></div>
                 <input 
                   type="text" 
                   value={(config.displayConfig.style as any)[item.field]}
                   onChange={(e) => handleDeepChange('style', item.field, e.target.value)}
                   className="flex-1 border border-slate-200 rounded px-3 py-1.5 text-sm font-mono focus:outline-none"
                 />
                 <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DisplayConfigTab;
