'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

const Theme = {
  brandColor: "#123458",
} as const;

export const CATEGORIES = ["Electronics", "Furniture", "Accessories", "Apparel"] as const;
export const LOCATIONS = ["Warehouse A", "Warehouse B", "Warehouse C", "Storefront"] as const;

export type Category = (typeof CATEGORIES)[number];
export type StockLocation = (typeof LOCATIONS)[number];
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

// Shape of an item as saved in the "stockitems" collection (without the document id)
export interface NewStockItem {
  name: string;
  sku: string;
  category: Category;
  quantity: number;
  price: number;
  location: StockLocation;
  status: StockStatus;
}

// An item as used in the UI. Seed data uses numeric ids, Firestore uses string ids.
export interface StockItem extends NewStockItem {
  id: string | number;
}

// Number inputs hold strings while the user is typing
interface ItemFormState {
  name: string;
  sku: string;
  category: Category;
  quantity: string;
  price: string;
  location: StockLocation;
}

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (item: StockItem) => void;
}

const emptyItem: ItemFormState = {
  name: "",
  sku: "",
  category: "Electronics",
  quantity: "0",
  price: "0",
  location: "Warehouse A",
};

const getStatus = (qty: number): StockStatus => {
  if (qty === 0) return "Out of Stock";
  if (qty <= 15) return "Low Stock";
  return "In Stock";
};

export default function AddItemModal({ isOpen, onClose, onItemAdded }: AddItemModalProps) {
  const [newItem, setNewItem] = useState<ItemFormState>(emptyItem);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = (): void => {
    if (isSaving) return;
    setError(null);
    setNewItem(emptyItem);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const qty = Number(newItem.quantity);
    const itemData: NewStockItem = {
      name: newItem.name.trim(),
      sku: newItem.sku.trim(),
      category: newItem.category,
      quantity: qty,
      price: Number(newItem.price),
      location: newItem.location,
      status: getStatus(qty),
    };

    try {
      const docRef = await addDoc(collection(db, "stockitems"), {
        ...itemData,
        createdAt: serverTimestamp(),
      });

      // Hand the saved item (with its Firestore id) back to the parent
      onItemAdded({ id: docRef.id, ...itemData });

      setNewItem(emptyItem);
      onClose();
    } catch (err) {
      console.error("Error saving item to Firestore:", err);
      setError("Could not save the item. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-black/10 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold">Add New Item</h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1.5 text-gray-700">
              Product Name <span className="text-rose-500">*</span>
            </label>
            <input
              required
              type="text"
              value={newItem.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
              className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 bg-[#F1EFEC]/30"
              placeholder="e.g. Wireless Mouse"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-gray-700">
                SKU <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="text"
                value={newItem.sku}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewItem({ ...newItem, sku: e.target.value })
                }
                className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 bg-[#F1EFEC]/30"
                placeholder="e.g. WM-001"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5 text-gray-700">Category</label>
              <select
                value={newItem.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewItem({ ...newItem, category: e.target.value as Category })
                }
                className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 bg-[#F1EFEC]/30 appearance-none"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-gray-700">
                Quantity <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="number"
                min="0"
                value={newItem.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
                className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 bg-[#F1EFEC]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5 text-gray-700">Unit Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={newItem.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 bg-[#F1EFEC]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 text-gray-700">Location</label>
            <select
              value={newItem.location}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setNewItem({ ...newItem, location: e.target.value as StockLocation })
              }
              className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 bg-[#F1EFEC]/30 appearance-none"
            >
              {LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
              {error}
            </p>
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-60"
              style={{ backgroundColor: Theme.brandColor }}
            >
              {isSaving ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}