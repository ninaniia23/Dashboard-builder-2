
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './views/DashboardHome';
import MetricEditor from './views/MetricEditor';
import { MetricConfig, DEFAULT_CONFIG } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<MetricConfig>(DEFAULT_CONFIG);

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#F8FAFC]">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/edit/:id" element={<MetricEditor config={config} setConfig={setConfig} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
