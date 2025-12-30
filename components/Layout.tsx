
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: { label: string; path?: string }[];
}

const Layout: React.FC<LayoutProps> = ({ children, breadcrumbs }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <i className="fa-solid fa-shapes text-white"></i>
            </div>
            <span className="text-xl font-bold text-blue-700 tracking-tight">nexus</span>
            <i className="fa-solid fa-caret-down text-slate-400 text-xs"></i>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 flex items-center space-x-2 text-sm font-medium hover:bg-slate-100">
            <i className="fa-solid fa-terminal text-blue-600"></i>
            <span>GiGi Chat</span>
          </button>
          <i className="fa-regular fa-folder-open text-slate-400 cursor-pointer hover:text-slate-600"></i>
          <i className="fa-regular fa-bell text-slate-400 cursor-pointer hover:text-slate-600"></i>
          <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
            TT
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="h-12 bg-white border-b border-slate-100 flex items-center px-6 text-[13px] text-slate-500">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-chart-line text-slate-400 mr-1"></i>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-blue-600">{crumb.label}</Link>
              ) : (
                <span className={idx === breadcrumbs.length - 1 ? 'text-slate-800 font-medium' : ''}>
                  {crumb.label}
                </span>
              )}
              {idx < breadcrumbs.length - 1 && <i className="fa-solid fa-chevron-right text-[10px] mx-1"></i>}
            </React.Fragment>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 overflow-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
};

export default Layout;
