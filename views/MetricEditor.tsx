
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';
import DataConfigTab from '../components/editor/DataConfigTab';
import DisplayConfigTab from '../components/editor/DisplayConfigTab';
import { MetricConfig } from '../types';

interface MetricEditorProps {
  config: MetricConfig;
  setConfig: React.Dispatch<React.SetStateAction<MetricConfig>>;
}

const MetricEditor: React.FC<MetricEditorProps> = ({ config, setConfig }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'data' | 'display'>('display');
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true);

  const handleSave = () => {
    navigate('/');
  };

  return (
    <Layout breadcrumbs={[
      { label: 'Dashboard Setting', path: '/' },
      { label: 'Kiếm Thế Origin' },
      { label: 'Create Real-time Dashboard' },
      { label: config.name }
    ]}>
      <div className="h-full flex flex-col">
        {/* Sub Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-800">{config.name}</h1>
            <i className="fa-solid fa-pen text-slate-300 text-sm cursor-pointer hover:text-blue-500"></i>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
              <i className="fa-solid fa-ellipsis-vertical text-slate-400"></i>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-1.5 border border-slate-200 rounded text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button className="px-4 py-1.5 border border-slate-200 rounded text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm">
              Preview
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-1.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* Global Selects */}
        <div className="bg-white px-6 py-4 flex space-x-6 border-b border-slate-100">
           <div className="flex-1 space-y-1.5">
             <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Data visualization type <span className="text-red-500">*</span></label>
             <div className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 flex justify-between items-center cursor-pointer hover:bg-slate-50">
               <span className="flex items-center">
                 <i className="fa-solid fa-chart-simple mr-2 text-blue-500"></i>
                 Metric cards
               </span>
               <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
             </div>
           </div>
           <div className="flex-1 space-y-1.5">
             <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
               Linked filters
               <i className="fa-solid fa-circle-info ml-1.5 text-slate-300 text-[10px]"></i>
             </label>
             <div className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-400 flex justify-between items-center cursor-pointer hover:bg-slate-50">
               <span>Select multiple filters</span>
               <i className="fa-solid fa-chevron-down text-[10px]"></i>
             </div>
           </div>
        </div>

        {/* Content Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Sidebar */}
          <div className="w-1/2 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
            <div className="flex border-b border-slate-100 px-6 pt-2">
              <button 
                onClick={() => setActiveTab('data')}
                className={`pb-3 px-2 text-[13px] font-medium transition-colors border-b-2 mr-6 ${activeTab === 'data' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                Data Configuration
              </button>
              <button 
                onClick={() => setActiveTab('display')}
                className={`pb-3 px-2 text-[13px] font-medium transition-colors border-b-2 ${activeTab === 'display' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                Display Customization
              </button>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar p-6">
              {activeTab === 'data' ? (
                <DataConfigTab config={config} setConfig={setConfig} />
              ) : (
                <DisplayConfigTab config={config} setConfig={setConfig} />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1 bg-slate-50/50 p-8 flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-slate-800">Preview</h2>
              <div className="flex items-center space-x-4">
                 <button className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded hover:bg-slate-50 flex items-center">
                    Refresh preview
                 </button>
                 <i className="fa-solid fa-xmark text-slate-400 cursor-pointer hover:text-slate-600"></i>
              </div>
            </div>

            <div className="flex-1 flex items-start justify-center pt-12">
              <div className="w-[340px]">
                <MetricCard config={config} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MetricEditor;
