'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Settings, 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Bell, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  FileText,
  User
} from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import AddItemModal, { StockItem, NewStockItem } from '@/components/Additemmodal';

// Theme Configuration
const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
} as const;

// Mock Data for Upload Simulation
const mockImportData: StockItem[] = [
  { id: 101, name: "Bluetooth Speaker", sku: "BS-990", category: "Electronics", quantity: 85, price: 59.99, location: "Warehouse C", status: "In Stock" },
  { id: 102, name: "Desk Mat Large", sku: "DML-112", category: "Accessories", quantity: 200, price: 19.99, location: "Warehouse B", status: "In Stock" },
  { id: 103, name: "Monitor Arm Dual", sku: "MAD-334", category: "Furniture", quantity: 5, price: 79.50, location: "Storefront", status: "Low Stock" },
];

export default function InvenTrackApp() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch items from the "stockitems" collection and keep them in sync
  useEffect(() => {
    const q = query(collection(db, "stockitems"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: StockItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as NewStockItem),
        }));
        setItems(fetched);
        setLoadError(null);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching stock items:", err);
        setLoadError(`Could not load inventory: ${err.message}`);
        setIsLoading(false);
      }
    );

    // Stop listening when the page unmounts
    return () => unsubscribe();
  }, []);

  // Derived Summary Metrics
  const totalItems = items.reduce((acc, item) => acc + Number(item.quantity), 0);
  const lowStockCount = items.filter(item => item.quantity > 0 && item.quantity <= 15).length;
  const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  // Filtered Items for Table
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Show Temporary Toast
  const showToast = (message: string): void => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Export CSV Functionality
  const handleExportCSV = (): void => {
    const headers = ["ID,Name,SKU,Category,Quantity,Price,Location,Status"];
    const rows = items.map(item => 
      `${item.id},"${item.name}","${item.sku}","${item.category}",${item.quantity},${item.price},"${item.location}","${item.status}"`
    );
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inventrack_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Inventory exported to CSV successfully.");
  };

  // 2. Upload Data Simulation
  const triggerUpload = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate file reading delay
    showToast(`Reading ${file.name}...`);
    setTimeout(() => {
      setItems(prev => [...mockImportData, ...prev]);
      showToast(`Successfully imported ${mockImportData.length} items from ${file.name}`);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1500);
  };

  // 3. Called by AddItemModal after the item is saved to Firestore.
  // The snapshot listener above adds the new item to the table, so only show the toast here.
  const handleItemAdded = (savedItem: StockItem): void => {
    showToast(`${savedItem.name} added successfully.`);
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ backgroundColor: Theme.backgroundColor, color: Theme.primaryColor }}>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">     
        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl text-[#123458]" style={{ backgroundColor: `${Theme.brandColor}15` }}>
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Units</p>
                  <h3 className="text-3xl font-extrabold">{totalItems.toLocaleString()}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl text-emerald-700 bg-emerald-50">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Value</p>
                  <h3 className="text-3xl font-extrabold">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl text-rose-700 bg-rose-50">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Low Stock Alerts</p>
                  <h3 className="text-3xl font-extrabold text-rose-600">{lowStockCount}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-bold">Current Inventory</h2>
            <div className="flex flex-wrap items-center gap-3">
              <input 
                type="file" 
                accept=".csv" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <button 
                onClick={triggerUpload}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Upload size={14} /> Import Data
              </button>
              
              <button 
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={14} /> Export CSV
              </button>

              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: Theme.brandColor }}
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                    <th className="p-4 pl-6">Product Name</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Qty</th>
                    <th className="p-4">Location</th>
                    <th className="p-4 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500 text-xs">
                        Loading inventory...
                      </td>
                    </tr>
                  ) : loadError ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-rose-600 text-xs">
                        {loadError}
                      </td>
                    </tr>
                  ) : filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500 text-xs">
                        No inventory items found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 pl-6 font-semibold">{item.name}</td>
                        <td className="p-4 text-xs text-gray-500">{item.sku}</td>
                        <td className="p-4 text-xs text-gray-600">{item.category}</td>
                        <td className="p-4 text-right font-semibold">{item.quantity}</td>
                        <td className="p-4 text-xs text-gray-600">{item.location}</td>
                        <td className="p-4 pr-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                            item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            item.status === 'Low Stock' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ADD ITEM MODAL */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={handleItemAdded}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}

    </div>
  );
}
