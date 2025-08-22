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
      href: 'javascript:void(0)',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: FileText,
      href: 'javascript:void(0)',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      href: 'javascript:void(0)',
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

      {/* Bottom Section - Best Shop Sellers and Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Shop Sellers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Best Shop Sellers</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Robert', purchases: '73 Purchases', categories: 'Kitchen, Pets', total: '$1,000' },
                { name: 'Calvin', purchases: '66 Purchases', categories: 'Health, Grocery', total: '$4,000' },
                { name: 'Dwight', purchases: '15,800 Purchases', categories: 'Electronics', total: '$2,700' }
              ].map((seller, index) => (
                <div key={seller.name} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{seller.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{seller.name}</p>
                    <p className="text-xs text-muted-foreground">{seller.purchases}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Categories</p>
                    <p className="text-xs text-muted-foreground">{seller.categories}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-sm font-bold">{seller.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Product overview</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Product ID</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3">Sale</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {[
                    { name: 'Soft Fluffy Cats', id: '#327', price: '$11.70', quantity: '28', status: 'On Sale' },
                    { name: 'Taste of the Wild Formula Finder', id: '#380', price: '$8.99', quantity: '10', status: 'On Sale' },
                    { name: 'Wellness Natural Food', id: '#126', price: '$5.32', quantity: '578', status: 'Low Stock' }
                  ].map((product, index) => (
                    <tr key={product.id} className="border-t">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs">📦</span>
                          </div>
                          <span className="text-sm font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{product.id}</td>
                      <td className="py-3 text-sm font-medium">{product.price}</td>
                      <td className="py-3 text-sm">{product.quantity}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'On Sale' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

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
