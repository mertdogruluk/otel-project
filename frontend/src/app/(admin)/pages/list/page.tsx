'use client';

import React from 'react';
import PageListHeader from '@/components/admin/pages/PageListHeader';
import PageListTable from '@/components/admin/pages/PageListTable';
import { useRouter } from 'next/navigation';

const PageListPage: React.FC = () => {
  const router = useRouter();

  const handleNewPage = () => {
    router.push('/pages/new');
  };

  const handleEditPage = (id: string) => {
    router.push(`/pages/edit?id=${id}`);
  };

  const handleDeletePage = (id: string) => {
    // Silme işlemi için modal açılabilir
    console.log('Delete page:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Sayfa Başlığı ve New Button */}
        <PageListHeader 
          title="List Page"
          onNewClick={handleNewPage}
        />
        
        {/* Pages Tablosu */}
        <PageListTable 
          onEdit={handleEditPage}
          onDelete={handleDeletePage}
        />
      </div>
    </div>
  );
};

export default PageListPage;
