import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import '@/app/globals.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutProps) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
