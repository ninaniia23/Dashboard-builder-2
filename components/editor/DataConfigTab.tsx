
import React from 'react';
import { MetricConfig } from '../../types';

interface Props {
  config: MetricConfig;
  setConfig: React.Dispatch<React.SetStateAction<MetricConfig>>;
}

const DataConfigTab: React.FC<Props> = ({ config, setConfig }) => {
  const handleChange = (field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      dataConfig: {
        ...prev.dataConfig,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Dataset Type */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-slate-600">Dataset type <span className="text-red-500">*</span></label>
        <div className="relative">
          <select 
            value={config.dataConfig.datasetType}
            onChange={(e) => handleChange('datasetType', e.target.value)}
            className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>Real-time</option>
            <option>Historical</option>
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
        </div>
      </div>

      {/* Data Source */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-slate-600">Data source <span className="text-red-500">*</span></label>
        <div className="relative">
          <select 
            value={config.dataConfig.dataSource}
            onChange={(e) => handleChange('dataSource', e.target.value)}
            className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>view_jus_vn_billing_delivery_recharge</option>
            <option>user_engagement_summary</option>
            <option>marketing_spend_tracker</option>
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
        </div>
      </div>

      {/* Reference Key */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-slate-600">Reference Key <span className="text-red-500">*</span></label>
        <input 
          type="text" 
          placeholder="Input reference key"
          value={config.dataConfig.referenceKey}
          onChange={(e) => handleChange('referenceKey', e.target.value)}
          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* SQL Editor */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <label className="text-[12px] font-bold text-slate-600">Query statement <span className="text-red-500">*</span></label>
          <button className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-[11px] font-bold hover:bg-blue-100">
            Run data
          </button>
        </div>
        <div className="relative">
           <textarea 
             spellCheck={false}
             className="w-full h-48 bg-[#0D1117] text-blue-100 p-4 font-mono text-xs rounded-lg custom-scrollbar resize-none focus:outline-none ring-1 ring-blue-900/50"
             value={config.dataConfig.query}
             onChange={(e) => handleChange('query', e.target.value)}
           />
        </div>
      </div>

      {/* Preview Table */}
      <div className="space-y-3">
         <label className="text-[12px] font-bold text-slate-600">Data table (Preview)</label>
         <div className="border border-slate-100 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-2 font-bold text-slate-500 uppercase tracking-wider">COMPARE</th>
                  <th className="px-4 py-2 font-bold text-slate-500 uppercase tracking-wider">Current</th>
                  <th className="px-4 py-2 font-bold text-slate-500 uppercase tracking-wider">DoD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="px-4 py-3 text-slate-600 font-mono">2152961097.87...</td>
                  <td className="px-4 py-3 text-slate-600 font-mono">1419319434.99...</td>
                  <td className="px-4 py-3 text-slate-600 font-mono">0</td>
                </tr>
              </tbody>
            </table>
         </div>
      </div>

      {/* Field Mapping */}
      <div className="space-y-4 pt-4">
        <h4 className="text-[13px] font-bold text-slate-800">Field Mapping</h4>
        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-slate-600">Value Mapping <span className="text-red-500">*</span></label>
          <div className="relative">
            <select 
              value={config.dataConfig.valueMapping}
              onChange={(e) => handleChange('valueMapping', e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="current">current</option>
              <option value="compare">compare</option>
              <option value="dod">dod</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-slate-600">Previous Value Field</label>
          <div className="relative">
            <select 
              value={config.dataConfig.previousValueField}
              onChange={(e) => handleChange('previousValueField', e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">None</option>
              <option value="compare">compare</option>
              <option value="dod">dod</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataConfigTab;
