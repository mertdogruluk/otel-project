'use client';

import React from 'react';
import OrderDetailHeader from '@/components/admin/orders/OrderDetailHeader';
import OrderDetailContent from '@/components/admin/orders/OrderDetailContent';

const OrderDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="p-8 space-y-8">
        {/* Sayfa Başlığı */}
        <OrderDetailHeader 
          orderId="#7712309" 
          status="confirmed" 
        />
        
        {/* Detay İçeriği */}
        <OrderDetailContent />
      </div>
    </div>
  );
};

export default OrderDetailPage;
