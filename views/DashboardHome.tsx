
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    'Gross Booking', 'Install', 'NRU', 'CVR%', 'DAU',
    'Ingame Revenue', 'PU', 'RR1%', 'NPU', 'CCU'
  ];

  const categories = ['Billing Payment', 'Acquisition', 'Engagement', 'Ingame Monetization'];

  return (
    <Layout breadcrumbs={[
      { label: 'Dashboard Setting' },
      { label: 'Kiếm Thế Origin' },
      { label: 'Create new Dashboard' }
    ]}>
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-800">Create new dashboard</h1>
            <i className="fa-solid fa-pen text-slate-300 text-sm cursor-pointer hover:text-blue-500"></i>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-slate-200 rounded text-slate-600 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
            <button className="px-4 py-2 border border-slate-200 rounded text-slate-300 font-medium cursor-not-allowed">Save draft</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-400 rounded font-medium cursor-not-allowed">Save & Publish</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-600">GDS Code <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Input GDS Code here" 
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-600">Game Tag <span className="text-red-500">*</span></label>
            <div className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-400 flex justify-between items-center cursor-pointer hover:bg-slate-50">
              <span>Select multiple game tags</span>
              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8 border-b border-slate-100 mb-8">
          <button className="pb-3 text-sm font-medium text-slate-400 flex items-center space-x-2">
            <i className="fa-solid fa-sliders text-xs"></i>
            <span>Filter management</span>
          </button>
          <button className="pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600 flex items-center space-x-2">
            <i className="fa-solid fa-gauge-high text-xs"></i>
            <span>Dashboard configuration</span>
          </button>
        </div>

        {/* Global Metric Slots */}
        <div className="grid grid-cols-5 gap-4 mb-10">
          {metrics.map((m, idx) => (
            <div 
              key={idx}
              onClick={() => m === 'Gross Booking' && navigate('/edit/gross-booking')}
              className={`h-[110px] border border-dashed border-slate-200 rounded-lg flex items-center justify-center space-x-2 cursor-pointer transition-all hover:bg-blue-50 group ${m === 'Gross Booking' ? 'hover:border-blue-400' : ''}`}
            >
              <i className="fa-regular fa-circle-plus text-slate-300 group-hover:text-blue-500"></i>
              <span className="text-sm text-slate-400 font-medium group-hover:text-blue-600">{m}</span>
            </div>
          ))}
        </div>

        {/* Category Specific Section */}
        <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
          <div className="flex space-x-2 mb-6">
            {categories.map((c, idx) => (
              <button 
                key={idx} 
                className={`px-4 py-2 rounded-md text-[13px] font-medium transition-colors ${idx === 0 ? 'bg-white border border-blue-600 text-blue-600 shadow-sm' : 'border border-slate-200 text-slate-600 hover:bg-white'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 mb-6">
             <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
               <i className="fa-solid fa-credit-card text-white text-[10px]"></i>
             </div>
             <h3 className="font-bold text-slate-800">Billing Payment</h3>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-[13px] font-bold text-slate-800">Section filters:</span>
            {['Shop', 'Partner', 'Method', 'Payment country', 'Server', 'Product ID'].map((f, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-400 text-xs cursor-pointer hover:bg-slate-50">
                <span>{f}</span>
                <i className="fa-solid fa-chevron-down text-[8px]"></i>
              </div>
            ))}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800 text-xs cursor-pointer hover:bg-slate-50 ml-auto">
              <span className="text-slate-400 mr-2">Compare date</span>
              <span>2025-10-23</span>
              <i className="fa-regular fa-calendar text-slate-300 ml-1"></i>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/3 grid grid-cols-2 gap-4">
              {['Gross Booking', 'AOV', 'PU', 'ARPPU'].map((m, idx) => (
                <div key={idx} className="h-[90px] border border-dashed border-slate-200 bg-white rounded-lg flex items-center justify-center space-x-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <i className="fa-regular fa-circle-plus text-slate-300 group-hover:text-blue-500"></i>
                  <span className="text-xs text-slate-400 font-medium group-hover:text-blue-600">{m}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 ml-6 bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center min-h-[200px] border-dashed">
                <div className="relative w-24 h-24 mb-4">
                   <div className="absolute bottom-0 left-0 w-6 h-12 bg-slate-100 rounded-sm"></div>
                   <div className="absolute bottom-0 left-8 w-6 h-16 bg-slate-200 rounded-sm"></div>
                   <div className="absolute bottom-0 left-16 w-6 h-14 bg-slate-100 rounded-sm"></div>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-[13px]">
                   <i className="fa-regular fa-circle-plus"></i>
                   <span>Accumulated By</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
