"use client";

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-md border border-gray-200 flex flex-col mb-4">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Canlı Destek</span>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-sm">
            {/* Mesajlar burada listelenir */}
            <p className="text-gray-500 text-center">Henüz mesaj yok</p>
          </div>
          <div className="p-4 border-t">
            <input 
              type="text" 
              placeholder="Mesajınızı yazın..." 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
      {!open && (
        <button
          className="rounded-full p-4 shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
