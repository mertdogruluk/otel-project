'use client';

import React from 'react';
import { Plus, UserPlus, FileText, Settings } from 'lucide-react';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const quickActions = [
    {
      title: 'Add Product',
      description: 'Add new product to inventory',
      icon: Plus,
      href: '/products/add',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add User',
      description: 'Create new user account',
      icon: UserPlus,
      href: '/users/add',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: FileText,
      href: '/orders',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      href: '/settings',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts and Recent Orders */}
      <RecentOrders />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-200"
                >
                  <div className={`p-3 rounded-lg text-white ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
