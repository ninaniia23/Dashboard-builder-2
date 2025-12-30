
import React, { useState } from 'react';
import { MetricConfig } from '../../types';

interface Props {
  config: MetricConfig;
  setConfig: React.Dispatch<React.SetStateAction<MetricConfig>>;
}

const DataConfigTab: React.FC<Props> = ({ config, setConfig }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleChange = (field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      dataConfig: { ...prev.dataConfig, [field]: value }
    }));
  };

  const handleRunData = () => {
    setIsRunning(true);
    // Simulate API call
    setTimeout(() => {
      setIsRunning(false);
      const randomVal = Math.floor(Math.random() * 50000000) + 10000000;
      const randomPrev = Math.floor(Math.random() * 50000000) + 10000000;
      const randomDod = ((randomVal - randomPrev) / randomPrev) * 100;

      setConfig(prev => ({
        ...prev,
        dataConfig: {
          ...prev.dataConfig,
          lastRunData: {
            current: randomVal,
            compare: randomPrev,
            dod: randomDod
          }
        }
      }));
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Dataset type</label>
            <div className="relative">
              <select 
                value={config.dataConfig.datasetType}
                onChange={(e) => handleChange('datasetType', e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              >
                <option>Real-time</option>
                <option>Historical</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Reference Key</label>
            <input 
              type="text" 
              value={config.dataConfig.referenceKey}
              onChange={(e) => handleChange('referenceKey', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="e.g. GB_001"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Data source</label>
          <select 
            value={config.dataConfig.dataSource}
            onChange={(e) => handleChange('dataSource', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          >
            <option>view_jus_vn_billing_delivery_recharge</option>
            <option>fact_daily_active_users</option>
            <option>dim_game_servers</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[12px] font-bold text-slate-700 flex items-center">
            <i className="fa-solid fa-code text-blue-500 mr-2"></i>
            Query statement
          </label>
          <button 
            onClick={handleRunData}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-2 ${isRunning ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100'}`}
          >
            {isRunning ? (
              <><i className="fa-solid fa-spinner fa-spin"></i><span>Running...</span></>
            ) : (
              <><i className="fa-solid fa-play"></i><span>Run query</span></>
            )}
          </button>
        </div>
        <div className="group relative">
           <textarea 
             spellCheck={false}
             className="w-full h-56 bg-[#0D1117] text-emerald-400 p-4 font-mono text-xs rounded-xl custom-scrollbar resize-none focus:ring-4 focus:ring-blue-500/10 outline-none border border-slate-800 transition-all"
             value={config.dataConfig.query}
             onChange={(e) => handleChange('query', e.target.value)}
           />
           <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded"><i className="fa-regular fa-copy"></i></button>
           </div>
        </div>
      </div>

      <div className="space-y-3">
         <label className="text-[12px] font-bold text-slate-700">Preview results</label>
         <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-2.5 font-bold text-slate-500 uppercase tracking-wider">field_name</th>
                  <th className="px-4 py-2.5 font-bold text-slate-500 uppercase tracking-wider">sample_value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="px-4 py-2.5 text-slate-500 font-mono">current</td>
                  <td className="px-4 py-2.5 text-blue-600 font-mono font-bold">
                    {isRunning ? '...' : (config.dataConfig.lastRunData?.current.toLocaleString() || 'N/A')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-slate-500 font-mono">compare</td>
                  <td className="px-4 py-2.5 text-slate-600 font-mono">
                    {isRunning ? '...' : (config.dataConfig.lastRunData?.compare.toLocaleString() || 'N/A')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-slate-500 font-mono">dod</td>
                  <td className="px-4 py-2.5 font-mono text-red-500">
                    {isRunning ? '...' : (config.dataConfig.lastRunData?.dod.toFixed(2) || '0.00')}%
                  </td>
                </tr>
              </tbody>
            </table>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Value Mapping</label>
          <select 
            value={config.dataConfig.valueMapping}
            onChange={(e) => handleChange('valueMapping', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <option value="current">current</option>
            <option value="compare">compare</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Compare Field</label>
          <select 
            value={config.dataConfig.previousValueField}
            onChange={(e) => handleChange('previousValueField', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <option value="compare">compare</option>
            <option value="current">current</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataConfigTab;
