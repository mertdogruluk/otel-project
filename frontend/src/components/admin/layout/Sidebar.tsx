'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  MapPin, 
  Settings, 
  Database,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    children: [
      { id: 'home-1', title: 'Home 01', icon: LayoutDashboard, href: '/dashboard' },
      { id: 'home-2', title: 'Home 02', icon: LayoutDashboard, href: '/dashboard/home-2' },
    ]
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    icon: ShoppingCart,
    children: [
      { id: 'add-product', title: 'Add Product', icon: ShoppingCart, href: '/products/add' },
      { id: 'product-list', title: 'Product List', icon: ShoppingCart, href: '/products' },
      { id: 'orders', title: 'Order List', icon: ShoppingCart, href: '/orders' },
    ]
  },
  {
    id: 'users',
    title: 'User',
    icon: Users,
    children: [
      { id: 'all-users', title: 'All User', icon: Users, href: '/users' },
      { id: 'add-user', title: 'Add New User', icon: Users, href: '/users/add' },
      { id: 'user-roles', title: 'All Roles', icon: Users, href: '/users/roles' },
    ]
  },
  {
    id: 'location',
    title: 'Location',
    icon: MapPin,
    children: [
      { id: 'countries', title: 'Countries', icon: MapPin, href: '/location/countries' },
      { id: 'states', title: 'States', icon: MapPin, href: '/location/states' },
      { id: 'cities', title: 'Cities', icon: MapPin, href: '/location/cities' },
    ]
  },
  {
    id: 'settings',
    title: 'Setting',
    icon: Settings,
    href: '/settings'
  },
  {
    id: 'components',
    title: 'Components',
    icon: Database,
    href: '/components'
  }
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  const toggleMenu = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? '' : menuId);
  };

  const MenuSection = ({ title, items }: { title: string; items: MenuItem[] }) => (
    <div className="mb-8">
      <h3 className="mb-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <div key={item.id}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={cn(
                    "flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-gray-100 hover:text-gray-900",
                    activeMenu === item.id ? "bg-gray-100 text-gray-900" : "text-gray-600"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeMenu === item.id ? "rotate-180" : ""
                    )}
                  />
                </button>
                {activeMenu === item.id && (
                  <div className="mt-1 ml-8 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href || '#'}
                        className="block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href || '#'}
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-gray-100 hover:text-gray-900 text-gray-600"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => onToggle?.()}
        />
      )}
      
      <div className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Otel Admin</span>
          </Link>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Menu Sections */}
        <div className="flex-1 overflow-y-auto p-4">
          <MenuSection title="Main Home" items={menuItems.slice(0, 1)} />
          <MenuSection title="Ecommerce" items={menuItems.slice(1, 3)} />
          <MenuSection title="Other" items={menuItems.slice(3, -2)} />
          
          {/* Support Section */}
          <div className="mb-8">
            <h3 className="mb-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Support
            </h3>
            <nav className="space-y-1">
              <Link
                href="#"
                className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help center
              </Link>
              <Link
                href="#"
                className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                FAQs
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;