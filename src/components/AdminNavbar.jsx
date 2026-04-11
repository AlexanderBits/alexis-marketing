import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, FileText, Target, Search, LogOut, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const NAV_ITEMS = [
  { label: "Leads", path: "/admin-leads", icon: Users },
  { label: "Contratos", path: "/admin-contratos", icon: FileText },
  { label: "Briefings", path: "/admin-briefing", icon: Target },
  { label: "SEO", path: "/admin-seo", icon: Search },
  { label: "Pesquisa Sites", path: "/admin-pesquisa-sites", icon: Globe },
];

export function AdminNavbar() {
  const location = useLocation();
  const { logout } = useAdminAuth();

  return (
    <nav className="w-full bg-slate-900/50 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                <Shield className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-white font-bold tracking-tighter uppercase text-sm">Alexis Admin</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 md:hidden"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/50 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/50 bg-slate-900/80">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                isActive ? "text-indigo-500" : "text-slate-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
