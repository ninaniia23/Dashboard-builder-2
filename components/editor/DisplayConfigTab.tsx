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

  const handleDeepChange = (group: keyof MetricConfig['displayConfig'] | '', field: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      if (group === '') {
        (newConfig.displayConfig as any)[field] = value;
      } else {
        (newConfig.displayConfig[group] as any)[field] = value;
      }
      return newConfig;
    });
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-10 h-5 rounded-full relative transition-all duration-300 ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${active ? 'translate-x-5' : ''}`}></div>
    </button>
  );

  // Fix: Make children optional to resolve TS error where nested JSX children are not identified as satisfying the required prop.
  const Section = ({ title, children, icon }: { title: string, children?: React.ReactNode, icon?: string }) => (
    <div className="space-y-4 pt-6 border-t border-slate-100 first:border-t-0 first:pt-0">
      <div className="flex items-center space-x-2">
        {icon && <i className={`${icon} text-blue-500 text-xs`}></i>}
        <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300 pb-10">
      <Section title="1. General display" icon="fa-solid fa-desktop">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className="text-[12px] font-bold text-slate-700">Tooltip Information</p>
              <p className="text-[11px] text-slate-400">Contextual help for this metric</p>
            </div>
            <Toggle active={config.displayConfig.showTooltip} onClick={() => handleToggle('showTooltip')} />
          </div>
          {config.displayConfig.showTooltip && (
            <textarea 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 h-20 focus:ring-2 focus:ring-blue-100 outline-none"
              value={config.displayConfig.tooltipInfo}
              onChange={(e) => handleDeepChange('', 'tooltipInfo', e.target.value)}
            />
          )}
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className="text-[12px] font-bold text-slate-700">Live Indicator</p>
              <p className="text-[11px] text-slate-400">Show "Updated X min ago" badge</p>
            </div>
            <Toggle active={config.displayConfig.showLatestUpdatedTime} onClick={() => handleToggle('showLatestUpdatedTime')} />
          </div>
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className="text-[12px] font-bold text-slate-700">Comparison Mode (Trend)</p>
              <p className="text-[11px] text-slate-400">Show percentage change vs previous period</p>
            </div>
            <Toggle active={config.displayConfig.showComparisonMode} onClick={() => handleToggle('showComparisonMode')} />
          </div>
        </div>
      </Section>

      <Section title="2. Layout & Alignment" icon="fa-solid fa-layer-group">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Height (px)</label>
            <input type="number" value={config.displayConfig.layout.height} onChange={(e) => handleDeepChange('layout', 'height', Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Card Padding</label>
            <input type="number" value={config.displayConfig.layout.padding} onChange={(e) => handleDeepChange('layout', 'padding', Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Horizontal</label>
            <select value={config.displayConfig.layout.horizontalAlignment} onChange={(e) => handleDeepChange('layout', 'horizontalAlignment', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option>Left</option><option>Center</option><option>Right</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Vertical</label>
            <select value={config.displayConfig.layout.verticalAlignment} onChange={(e) => handleDeepChange('layout', 'verticalAlignment', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option>Top</option><option>Middle</option><option>Bottom</option>
            </select>
          </div>
        </div>
      </Section>

      <Section title="3. Typography" icon="fa-solid fa-font">
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase">Title Text</p>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-1.5">
                 <label className="text-[10px] text-slate-400">Size</label>
                 <input type="number" value={config.displayConfig.typography.titleSize} onChange={(e) => handleDeepChange('typography', 'titleSize', Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm" />
              </div>
              <div className="flex-1 space-y-1.5">
                 <label className="text-[10px] text-slate-400">Weight</label>
                 <select value={config.displayConfig.typography.titleWeight} onChange={(e) => handleDeepChange('typography', 'titleWeight', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
                   <option>Regular</option><option>Medium</option><option>Semi-bold</option>
                 </select>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase">Value Number</p>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-1.5">
                 <label className="text-[10px] text-slate-400">Size</label>
                 <input type="number" value={config.displayConfig.typography.valueSize} onChange={(e) => handleDeepChange('typography', 'valueSize', Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm" />
              </div>
              <div className="flex-1 space-y-1.5">
                 <label className="text-[10px] text-slate-400">Weight</label>
                 <select value={config.displayConfig.typography.valueWeight} onChange={(e) => handleDeepChange('typography', 'valueWeight', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
                   <option>Semi-bold</option><option>Bold</option>
                 </select>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="4. Formatting" icon="fa-solid fa-hashtag">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Scale</label>
            <select value={config.displayConfig.formatting.displayFormat} onChange={(e) => handleDeepChange('formatting', 'displayFormat', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option value="Full">Full Number</option>
              <option value="Compact">Compact (K/M/B)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Decimals</label>
            <input type="number" value={config.displayConfig.formatting.decimalPlaces} onChange={(e) => handleDeepChange('formatting', 'decimalPlaces', Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex items-center justify-between">
           <span className="text-[12px] font-bold text-slate-700">Thousands Separator</span>
           <Toggle active={config.displayConfig.formatting.useThousandsSeparator} onClick={() => handleDeepChange('formatting', 'useThousandsSeparator', !config.displayConfig.formatting.useThousandsSeparator)} />
        </div>
      </Section>

      <Section title="5. Style & Colors" icon="fa-solid fa-palette">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Card Background</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
               <input type="color" value={config.displayConfig.style.backgroundColor} onChange={(e) => handleDeepChange('style', 'backgroundColor', e.target.value)} className="w-10 h-10 p-1 border-none bg-transparent" />
               <input type="text" value={config.displayConfig.style.backgroundColor} onChange={(e) => handleDeepChange('style', 'backgroundColor', e.target.value)} className="flex-1 px-2 text-xs font-mono uppercase border-none outline-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Value Color</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
               <input type="color" value={config.displayConfig.style.valueColor} onChange={(e) => handleDeepChange('style', 'valueColor', e.target.value)} className="w-10 h-10 p-1 border-none bg-transparent" />
               <input type="text" value={config.displayConfig.style.valueColor} onChange={(e) => handleDeepChange('style', 'valueColor', e.target.value)} className="flex-1 px-2 text-xs font-mono uppercase border-none outline-none" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DisplayConfigTab;