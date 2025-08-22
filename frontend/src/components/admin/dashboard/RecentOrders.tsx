'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  image: string;
  items: number;
  couponCode: string;
  sales: number;
  stock: number;
  price: string;
}

const topProducts: Product[] = [
  {
    id: '1',
    name: 'Patimax Fragrance Long...',
    image: '/admin/images/products/1.png',
    items: 100,
    couponCode: 'Sflat',
    sales: 1500,
    stock: 85,
    price: '$25.00'
  },
  {
    id: '2',
    name: 'Sunglasses Style',
    image: '/admin/images/products/2.png',
    items: 75,
    couponCode: 'Summer',
    sales: 1200,
    stock: 60,
    price: '$45.00'
  },
  {
    id: '3',
    name: 'Camera Lens 4K',
    image: '/admin/images/products/3.png',
    items: 50,
    couponCode: 'Tech20',
    sales: 800,
    stock: 25,
    price: '$120.00'
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    image: '/admin/images/products/4.png',
    items: 90,
    couponCode: 'Audio',
    sales: 1800,
    stock: 70,
    price: '$85.00'
  }
];

// Mock data for countries and orders
const countriesData = [
  { id: 1, name: 'Turkish Flag', flag: '🇹🇷', sales: 6972, trend: 'up', change: '1.56%' },
  { id: 2, name: 'Belgium', flag: '🇧🇪', sales: 6972, trend: 'up', change: '2.1%' },
  { id: 3, name: 'Sweden', flag: '🇸🇪', sales: 6972, trend: 'down', change: '0.8%' },
  { id: 4, name: 'Vietnamese', flag: '🇻🇳', sales: 6972, trend: 'up', change: '3.2%' },
  { id: 5, name: 'Australia', flag: '🇦🇺', sales: 6972, trend: 'down', change: '1.1%' },
  { id: 6, name: 'Saudi Arabia', flag: '🇸🇦', sales: 6972, trend: 'down', change: '0.5%' }
];

const ordersData = [
  { id: 1, product: 'Prodotti per il tuo cane...', date: '20 Nov 2023', price: '$45.00' },
  { id: 2, product: 'Wholesome Pride...', date: '20 Nov 2023', price: '$32.00' },
  { id: 3, product: 'Beneful Baked Delights...', date: '20 Nov 2023', price: '$28.00' },
  { id: 4, product: 'Taste of the Wild...', date: '20 Nov 2023', price: '$55.00' },
  { id: 5, product: 'Canagan - Britain\'s...', date: '20 Nov 2023', price: '$42.00' }
];

const earningsData = [
  { month: 'Jan', revenue: 25000, profit: 18000 },
  { month: 'Feb', revenue: 32000, profit: 24000 },
  { month: 'Mar', revenue: 28000, profit: 20000 },
  { month: 'Apr', revenue: 35000, profit: 26000 },
  { month: 'May', revenue: 42000, profit: 32000 },
  { month: 'Jun', revenue: 38000, profit: 28000 },
  { month: 'Jul', revenue: 30000, profit: 22000 },
  { month: 'Aug', revenue: 36000, profit: 27000 }
];

const productOverviewData = [
  { id: 1, name: 'Soft Fluffy Cats', productId: '#327', price: '$11.70', quantity: 28, status: 'On Sale' },
  { id: 2, name: 'Taste of the Wild Formula Finder', productId: '#380', price: '$8.99', quantity: 10, status: 'On Sale' },
  { id: 3, name: 'Wellness Natural Food', productId: '#126', price: '$5.32', quantity: 578, status: 'Low Stock' }
];

const commentsData = [
  { id: 1, name: 'Kathryn Murphy', rating: 4, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor vel est interdum' },
  { id: 2, name: 'Leslie Alexander', rating: 4, comment: 'Cras nec viverra justo, a mattis lacus. Vestibulum eleifend, leo sit amet aliquam laoreet, turpis leo vulputate orci' },
  { id: 3, name: 'Devon Lane', rating: 4, comment: 'Morbi eget commodo diam. Praesent dignissim purus ac turpis porta' }
];

const RecentOrders: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Recent Order Chart - Takes 2/3 of the width */}
      <div className="lg:col-span-2 space-y-6">
        {/* Recent Order Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Recent Order</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 0.1}} />
                  </linearGradient>
                </defs>
                <path 
                  d="M 20 150 Q 80 120 120 100 T 200 80 T 280 90 T 360 60 L 360 180 L 20 180 Z" 
                  fill="url(#areaGradient)" 
                />
                <path 
                  d="M 20 150 Q 80 120 120 100 T 200 80 T 280 90 T 360 60" 
                  stroke="#3B82F6" 
                  strokeWidth="3" 
                  fill="none"
                />
                {/* Data points */}
                <circle cx="20" cy="150" r="4" fill="#3B82F6" />
                <circle cx="120" cy="100" r="4" fill="#3B82F6" />
                <circle cx="200" cy="80" r="4" fill="#3B82F6" />
                <circle cx="280" cy="90" r="4" fill="#3B82F6" />
                <circle cx="360" cy="60" r="4" fill="#3B82F6" />
              </svg>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              {['Jan', 'Feb', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders and Earnings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Orders</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {ordersData.map((order) => (
                <div key={order.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">#{order.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{order.product}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{order.price}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Earnings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Earnings</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">$37,802</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">0.56%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Profit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">$28,305</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">0.56%</span>
                    </div>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-end justify-around p-2">
                  {earningsData.map((item, index) => (
                    <div key={item.month} className="flex flex-col items-center space-y-1">
                      <div className="bg-blue-500 rounded-sm" style={{width: '8px', height: `${(item.revenue / 50000) * 60}px`}}></div>
                      <span className="text-xs text-muted-foreground">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column - Takes 1/3 of the width */}
      <div className="space-y-6">
        {/* Top Countries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Top Countries By Sales</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold">$37,802</div>
                <div className="flex items-center justify-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  1.56% since last weekend
                </div>
              </div>
              <div className="space-y-3">
                {countriesData.map((country) => (
                  <div key={country.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium">{country.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {country.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{country.sales.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Comments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">New Comments</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {commentsData.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{comment.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{comment.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{comment.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentOrders;
