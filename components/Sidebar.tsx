import { BarChart3, LayoutDashboard, Package, Settings, User } from "lucide-react";
import { Theme } from "./theme";

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-black/5 hidden md:flex flex-col bg-white h-dvh sticky top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-black/5">
        <div 
          className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm mr-3 shadow-sm" 
          style={{ backgroundColor: Theme.brandColor }}
        >
          iT
        </div>
        <span className="font-extrabold text-lg tracking-tight">InvenTrack</span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-[#F1EFEC]/60" style={{ color: Theme.brandColor }}>
          <LayoutDashboard size={18} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
          <Package size={18} /> Inventory
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
          <BarChart3 size={18} /> Reports
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
          <Settings size={18} /> Settings
        </a>
      </nav>
      
      <div className="p-4 border-t border-black/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <User size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Alex Morgan</p>
            <p className="text-[10px] text-gray-500 truncate">Store Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}