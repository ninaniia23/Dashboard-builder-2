
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Billing Payment');

  const metrics = [
    { name: 'Gross Booking', configured: true },
    { name: 'Install', configured: false },
    { name: 'NRU', configured: false },
    { name: 'CVR%', configured: false },
    { name: 'DAU', configured: false },
  ];

  const categories = ['Billing Payment', 'Acquisition', 'Engagement', 'Ingame Monetization'];

  return (
    <Layout breadcrumbs={[
      { label: 'Dashboard Setting' },
      { label: 'Kiếm Thế Origin' },
      { label: 'Real-time Monitoring' }
    ]}>
      <div className="p-6 max-w-[1400px] mx-auto animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center">
              Real-time Monitoring Dashboard
              <span className="ml-3 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] uppercase font-bold rounded">Draft</span>
            </h1>
            <p className="text-[13px] text-slate-400">Manage and configure metrics for the product dashboard.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-5 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50">Cancel</button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">Publish Dashboard</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
           <div className="col-span-1 p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Product Code</label>
              <div className="flex items-center space-x-2 text-slate-800 font-bold">
                 <i className="fa-solid fa-gamepad text-blue-500"></i>
                 <span>KTO_VN_2024</span>
              </div>
           </div>
           <div className="col-span-3 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                 <label className="text-[11px] font-bold text-slate-400 uppercase">Global Filters</label>
                 <div className="flex space-x-2">
                    {['Server ID', 'Country', 'Version'].map(f => (
                      <span key={f} className="px-2 py-1 bg-slate-100 text-slate-600 text-[11px] rounded flex items-center">
                        {f} <i className="fa-solid fa-xmark ml-2 cursor-pointer hover:text-red-500"></i>
                      </span>
                    ))}
                    <button className="text-[11px] text-blue-600 font-bold flex items-center hover:underline">
                      <i className="fa-solid fa-plus mr-1"></i> Add filter
                    </button>
                 </div>
              </div>
              <div className="h-10 w-px bg-slate-100 mx-6"></div>
              <button className="text-sm font-bold text-slate-600 hover:text-blue-600 flex items-center">
                <i className="fa-solid fa-sliders mr-2"></i>
                Filter Management
              </button>
           </div>
        </div>

        <div className="flex items-center space-x-2 mb-6 bg-slate-100 p-1.5 rounded-xl w-fit">
          {categories.map(c => (
            <button 
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === c ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-chart-line"></i>
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">{activeCategory}</h3>
                    <p className="text-[12px] text-slate-400">Configure core business metrics for this section.</p>
                 </div>
              </div>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                 Reset Section
              </button>
           </div>

           <div className="grid grid-cols-5 gap-6">
              {metrics.map((m, idx) => (
                <div 
                  key={idx}
                  onClick={() => m.configured && navigate('/edit/gross-booking')}
                  className={`group relative h-36 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all hover:scale-[1.02] ${m.configured ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                >
                  {m.configured ? (
                    <>
                      <div className="text-blue-600 font-bold text-sm">{m.name}</div>
                      <div className="text-[11px] text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full font-bold">Active</div>
                      <i className="fa-solid fa-arrow-right absolute bottom-4 right-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
                        <i className="fa-solid fa-plus"></i>
                      </div>
                      <span className="text-sm font-medium text-slate-400 group-hover:text-slate-600">{m.name}</span>
                    </>
                  )}
                </div>
              ))}
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
