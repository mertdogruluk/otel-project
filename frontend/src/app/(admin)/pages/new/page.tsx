'use client';

import React from 'react';
import NewPageForm from '@/components/admin/pages/NewPageForm';
import { useRouter } from 'next/navigation';

const NewPagePage: React.FC = () => {
  const router = useRouter();

  const handleSave = (data: any) => {
    // Burada API çağrısı yapılabilir
    console.log('Saving page:', data);
    
    // Başarılı kayıt sonrası liste sayfasına yönlendir
    router.push('/pages/list');
  };

  const handleCancel = () => {
    router.push('/pages/list');
  };

  return (
    <NewPageForm 
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default NewPagePage;
