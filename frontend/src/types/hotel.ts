// Hotel data interfaces for centralized data management

// Amenity interface with icon information
export interface Amenity {
  id: string;
  name: string;
  icon: string; // Icon name or path
  description?: string;
}

// Hotel data interface based on HotelCardProps
export interface HotelData {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  tag: string | null;
  amenities: string[];
  // Additional fields for future API integration
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  checkIn?: string;
  checkOut?: string;
  policies?: string[];
  images?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  category?: 'hotel' | 'villa' | 'apartment' | 'room';
  stars?: number;
  facilities?: string[];
  roomTypes?: {
    id: number;
    name: string;
    capacity: number;
    price: number;
    available: boolean;
  }[];
}

// Hotel card props interface (for component usage)
export interface HotelCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  tag: string | null;
  amenities: string[];
}

// Hotel filter interface for search and filtering
export interface HotelFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  amenities?: string[];
  category?: string[];
}

// Hotel search result interface
export interface HotelSearchResult {
  hotels: HotelData[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: HotelFilters;
}
