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
  Menu,
  X,
  ChevronRight
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
      { id: 'product-list', title: 'Product List', icon: ShoppingCart, href: '/products/list' },
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
    <div className="mb-6">
      <h3 className={cn(
        "mb-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-all duration-200",
        isCollapsed ? "opacity-0" : "opacity-100"
      )}>
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
                    "flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-gray-100 hover:text-gray-900",
                    activeMenu === item.id ? "bg-gray-100 text-gray-900" : "text-gray-600",
                    isCollapsed ? "justify-center px-2" : "justify-between"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className="flex items-center">
                    <item.icon className={cn(
                      "h-5 w-5",
                      isCollapsed ? "mr-0" : "mr-3"
                    )} />
                    {!isCollapsed && (
                      <span className="flex-1 text-left">{item.title}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeMenu === item.id ? "rotate-180" : ""
                      )}
                    />
                  )}
                </button>
                {!isCollapsed && activeMenu === item.id && (
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
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
                  isCollapsed ? "justify-center px-2" : ""
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isCollapsed ? "mr-0" : "mr-3"
                )} />
                {!isCollapsed && item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => onToggle?.()}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        "shadow-lg",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center border-b border-gray-200 transition-all duration-200",
          isCollapsed ? "justify-center p-3" : "justify-between p-4"
        )}>
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Otel Admin</span>
            </Link>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className={cn(
              "p-2 rounded-lg hover:bg-gray-100 transition-colors",
              isCollapsed ? "absolute -right-3 top-6 bg-white border border-gray-200 shadow-md" : ""
            )}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <X className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <MenuSection title="Main Home" items={menuItems.slice(0, 1)} />
          <MenuSection title="Ecommerce" items={menuItems.slice(1, 3)} />
          <MenuSection title="Other" items={menuItems.slice(3, -2)} />
          
          {/* Support Section */}
          <div className={cn(
            "mb-6 transition-all duration-200",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}>
            <h3 className="mb-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Support
            </h3>
            <nav className="space-y-1">
              <Link
                href="#"
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors",
                  isCollapsed ? "justify-center px-2" : ""
                )}
                title={isCollapsed ? "Help center" : undefined}
              >
                <HelpCircle className={cn(
                  "h-5 w-5",
                  isCollapsed ? "mr-0" : "mr-3"
                )} />
                {!isCollapsed && "Help center"}
              </Link>
              <Link
                href="#"
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors",
                  isCollapsed ? "justify-center px-2" : ""
                )}
                title={isCollapsed ? "FAQs" : undefined}
              >
                <MessageCircle className={cn(
                  "h-5 w-5",
                  isCollapsed ? "mr-0" : "mr-3"
                )} />
                {!isCollapsed && "FAQs"}
              </Link>
            </nav>
          </div>
        </div>

        {/* Collapsed State Toggle Button (Bottom) */}
        {isCollapsed && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <button
              onClick={onToggle}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
              title="Expand Sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;