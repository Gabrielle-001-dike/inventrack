"use client";

import { Bell, Search } from "lucide-react";
import { useState } from "react";


export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <main>
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-black/5 flex-shrink-0 sticky top-0 z-10">
                <h1 className="text-xl font-extrabold hidden sm:block">Inventory Dashboard</h1>
                <div className="flex items-center gap-4 ml-auto">
                    <div className="relative hidden sm:flex items-center">
                        <Search size={16} className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search items, SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-[#F1EFEC]/50 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-[#123458]/20 transition-all w-64"
                        />
                    </div>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors relative">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                    </button>
                </div>
            </header>
        </main>
    )
}