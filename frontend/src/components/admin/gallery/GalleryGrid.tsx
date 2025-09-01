'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Grid, 
  List, 
  Upload, 
  Download, 
  FolderPlus, 
  Filter,
  Eye,
  Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  name: string;
  src: string;
  uploadedAt: string;
  modifiedAt: string;
  fullUrl: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  selectedImage?: GalleryImage | null;
  onImageSelect: (image: GalleryImage) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  selectedImage, 
  onImageSelect 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">All Gallery</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">Gallery</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <FolderPlus className="h-4 w-4" />
            <span>Create folder</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>View in</span>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex items-center space-x-1 border border-gray-200 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Images Grid/List */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <span className="text-sm text-gray-600">File</span>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={cn(
                    "cursor-pointer group bg-gray-50 rounded-lg p-4 transition-all duration-200",
                    "hover:shadow-md hover:bg-gray-100",
                    selectedImage?.id === image.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  )}
                  onClick={() => onImageSelect(image)}
                >
                  <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-white">
                    <Image
                      src={image.src}
                      alt={image.name}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm text-gray-700 text-center truncate">
                    {image.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={cn(
                    "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200",
                    "hover:bg-gray-50",
                    selectedImage?.id === image.id ? "bg-blue-50 border border-blue-200" : "border border-transparent"
                  )}
                  onClick={() => onImageSelect(image)}
                >
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white mr-4">
                    <Image
                      src={image.src}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{image.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded: {image.uploadedAt} • Modified: {image.modifiedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Details Sidebar */}
        {selectedImage && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {selectedImage.name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Uploaded at
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedImage.uploadedAt}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modified at
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedImage.modifiedAt}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value=""
                      readOnly
                      className="flex-1 text-xs"
                      placeholder=""
                    />
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryGrid;
