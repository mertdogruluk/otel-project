'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface PermissionSectionProps {
  permissions: {
    addProduct: boolean;
    updateProduct: boolean;
    deleteProduct: boolean;
    applyDiscount: boolean;
    createCoupon: boolean;
  };
  onPermissionChange: (permission: string, checked: boolean) => void;
}

interface PermissionItemProps {
  title: string;
  permissionKey: string;
  isChecked: boolean;
  onPermissionChange: (permission: string, checked: boolean) => void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({ 
  title, 
  permissionKey, 
  isChecked, 
  onPermissionChange 
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`${permissionKey}Allow`}
            checked={isChecked}
            onCheckedChange={(checked: boolean) => onPermissionChange(permissionKey, checked)}
          />
          <Label htmlFor={`${permissionKey}Allow`} className="text-sm text-gray-700">Allow</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`${permissionKey}Deny`}
            checked={!isChecked}
            onCheckedChange={(checked: boolean) => onPermissionChange(permissionKey, !checked)}
          />
          <Label htmlFor={`${permissionKey}Deny`} className="text-sm text-gray-700">Deny</Label>
        </div>
      </div>
    </div>
  );
};

export default function PermissionSection({ permissions, onPermissionChange }: PermissionSectionProps) {
  const permissionItems = [
    { title: 'Add product', key: 'addProduct' },
    { title: 'Update product', key: 'updateProduct' },
    { title: 'Delete product', key: 'deleteProduct' },
    { title: 'Apply discount', key: 'applyDiscount' },
    { title: 'Create coupon', key: 'createCoupon' },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Permission</CardTitle>
        <CardDescription className="text-gray-500">
          Items that the account is allowed to edit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {permissionItems.map((item) => (
          <PermissionItem
            key={item.key}
            title={item.title}
            permissionKey={item.key}
            isChecked={permissions[item.key as keyof typeof permissions]}
            onPermissionChange={onPermissionChange}
          />
        ))}
      </CardContent>
    </Card>
  );
}
