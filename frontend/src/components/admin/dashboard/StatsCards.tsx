'use client';

import React from 'react';
import { ShoppingBag, DollarSign, FileText, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCard {
  id: string;
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

const statsData: StatCard[] = [
  {
    id: 'total-sales',
    title: 'Total Sales',
    value: '34,945',
    icon: ShoppingBag,
    bgColor: 'bg-green-500',
    trend: 'up',
    trendValue: '1.56%'
  },
  {
    id: 'total-income',
    title: 'Total Income',
    value: '$37,802',
    icon: DollarSign,
    bgColor: 'bg-orange-500',
    trend: 'down',
    trendValue: '1.56%'
  },
  {
    id: 'orders-paid',
    title: 'Orders Paid',
    value: '34,945',
    icon: FileText,
    bgColor: 'bg-slate-400',
    trend: 'neutral',
    trendValue: '0.00%'
  },
  {
    id: 'total-visitor',
    title: 'Total Visitor',
    value: '34,945',
    icon: Users,
    bgColor: 'bg-blue-500',
    trend: 'up',
    trendValue: '1.56%'
  }
];

const StatsCards: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {statsData.map((stat) => (
        <Card key={stat.id} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-lg text-white",
                stat.bgColor
              )}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold">
                  {stat.value}
                </h3>
              </div>
            </div>
            <div className={cn(
              "flex items-center space-x-1 text-sm",
              stat.trend === 'up' ? "text-green-600" : 
              stat.trend === 'down' ? "text-red-600" : "text-gray-600"
            )}>
              {stat.trend === 'up' && <TrendingUp className="h-4 w-4" />}
              {stat.trend === 'down' && <TrendingDown className="h-4 w-4" />}
              <span className="font-medium">{stat.trendValue}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              {/* Mini chart placeholder */}
              <div className="h-16 bg-gradient-to-r from-transparent via-gray-100 to-transparent rounded opacity-50">
                <div className={cn(
                  "h-full rounded",
                  stat.trend === 'up' ? "bg-gradient-to-r from-green-100 to-green-200" :
                  stat.trend === 'down' ? "bg-gradient-to-r from-red-100 to-red-200" :
                  "bg-gradient-to-r from-gray-100 to-gray-200"
                )}>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
