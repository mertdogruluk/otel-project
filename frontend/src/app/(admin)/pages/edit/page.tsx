'use client';

import React from 'react';
import EditPageForm from '@/components/admin/pages/EditPageForm';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPagePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('id');

  const handleSave = (data: any) => {
    // Burada API çağrısı yapılabilir
    console.log('Updating page:', data);
    
    // Başarılı güncelleme sonrası liste sayfasına yönlendir
    router.push('/pages/list');
  };

  const handleCancel = () => {
    router.push('/pages/list');
  };

  const handleDelete = (id: string) => {
    // Burada API çağrısı yapılabilir
    console.log('Deleting page:', id);
    
    // Başarılı silme sonrası liste sayfasına yönlendir
    router.push('/pages/list');
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="p-6">
        <EditPageForm 
          pageId={pageId || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default EditPagePage;
