// Centralized hotel data management
// This file contains mock data that can be easily replaced with API calls later

import { HotelData } from '@/types/hotel';

// Mock hotels data - can be replaced with API calls when backend is ready
export const mockHotels: HotelData[] = [
  {
    id: 1,
    image: "/images/riad-deluxe-hotel-img-1.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Marakeş'in kalbinde yer alan lüks Riad oteli, geleneksel Fas mimarisi ile modern konforu birleştirir.",
    address: "Medina Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 44",
    email: "info@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-1.png",
      "/images/riad-deluxe-hotel-img-2.png",
      "/images/riad-deluxe-hotel-img-3.png",
      "/images/riad-deluxe-hotel-img-4.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym"],
    roomTypes: [
      {
        id: 1,
        name: "Deluxe Oda",
        capacity: 2,
        price: 40000,
        available: true
      },
      {
        id: 2,
        name: "Suite",
        capacity: 4,
        price: 60000,
        available: true
      }
    ]
  },
  {
    id: 2,
    image: "/images/riad-deluxe-hotel-img-2.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: null,
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Geleneksel Fas mimarisinin en güzel örneklerinden biri olan bu otel, misafirlerine unutulmaz bir deneyim sunar.",
    address: "Kasbah Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 45",
    email: "reservations@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "15:00",
    checkOut: "12:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-2.png",
      "/images/riad-deluxe-hotel-img-3.png",
      "/images/riad-deluxe-hotel-img-4.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym"],
    roomTypes: [
      {
        id: 3,
        name: "Standart Oda",
        capacity: 2,
        price: 40000,
        available: true
      }
    ]
  },
  {
    id: 3,
    image: "/images/riad-deluxe-hotel-img-3.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: null,
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Marakeş'in en eski mahallelerinden birinde yer alan bu otel, tarihi atmosferi ile misafirlerini büyüler.",
    address: "Mellah Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 46",
    email: "contact@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-3.png",
      "/images/riad-deluxe-hotel-img-4.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar"],
    roomTypes: [
      {
        id: 4,
        name: "Deluxe Oda",
        capacity: 2,
        price: 40000,
        available: true
      }
    ]
  },
  {
    id: 4,
    image: "/images/riad-deluxe-hotel-img-4.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Modern lüks ile geleneksel Fas mimarisini harmanlayan bu otel, misafirlerine en üst düzey hizmet sunar.",
    address: "Gueliz Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 47",
    email: "bookings@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-4.png",
      "/images/riad-deluxe-hotel-img-5.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym", "Tennis"],
    roomTypes: [
      {
        id: 5,
        name: "Suite",
        capacity: 4,
        price: 60000,
        available: true
      }
    ]
  },
  {
    id: 5,
    image: "/images/riad-deluxe-hotel-img-5.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Atlas Dağları'nın manzarasını sunan bu otel, doğa ile lüksü bir araya getirir.",
    address: "Hivernage Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 48",
    email: "info@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-5.png",
      "/images/riad-deluxe-hotel-img-6.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym", "Golf"],
    roomTypes: [
      {
        id: 6,
        name: "Deluxe Oda",
        capacity: 2,
        price: 40000,
        available: true
      }
    ]
  },
  {
    id: 6,
    image: "/images/riad-deluxe-hotel-img-6.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Marakeş'in en prestijli mahallelerinden birinde yer alan bu otel, lüks ve konforu bir araya getirir.",
    address: "Agdal Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 49",
    email: "reservations@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-6.png",
      "/images/riad-deluxe-hotel-img-7.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym", "Squash"],
    roomTypes: [
      {
        id: 7,
        name: "Suite",
        capacity: 4,
        price: 60000,
        available: true
      }
    ]
  },
  {
    id: 7,
    image: "/images/riad-deluxe-hotel-img-7.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Geleneksel Fas bahçeleri ile çevrili bu otel, misafirlerine huzur dolu bir atmosfer sunar.",
    address: "Menara Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 50",
    email: "contact@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-7.png",
      "/images/riad-deluxe-hotel-img-8.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym", "Yoga"],
    roomTypes: [
      {
        id: 8,
        name: "Deluxe Oda",
        capacity: 2,
        price: 40000,
        available: true
      }
    ]
  },
  {
    id: 8,
    image: "/images/riad-deluxe-hotel-img-8.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: null,
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    description: "Marakeş'in en yeni ve modern mahallelerinden birinde yer alan bu otel, çağdaş lüksü temsil eder.",
    address: "Sidi Youssef Ben Ali Quarter, Marakeş, Fas",
    phone: "+212 5 24 44 44 51",
    email: "bookings@riadluxe.com",
    website: "https://riadluxe.com",
    checkIn: "14:00",
    checkOut: "11:00",
    policies: ["Sigara içilmez", "Evcil hayvan kabul edilmez", "24 saat resepsiyon"],
    images: [
      "/images/riad-deluxe-hotel-img-8.png"
    ],
    coordinates: {
      latitude: 31.6295,
      longitude: -7.9811
    },
    category: "hotel",
    stars: 5,
    facilities: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Gym", "Pilates"],
    roomTypes: [
      {
        id: 9,
        name: "Standart Oda",
        capacity: 2,
        price: 40000,
        available: true
      }
    ]
  }
];

// Helper function to get hotels by category
export const getHotelsByCategory = (category: string): HotelData[] => {
  return mockHotels.filter(hotel => hotel.category === category);
};

// Helper function to get hotels by location
export const getHotelsByLocation = (location: string): HotelData[] => {
  return mockHotels.filter(hotel => 
    hotel.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Helper function to get hotels by price range
export const getHotelsByPriceRange = (minPrice: number, maxPrice: number): HotelData[] => {
  return mockHotels.filter(hotel => {
    const price = parseInt(hotel.price.replace(/[^\d]/g, ''));
    return price >= minPrice && price <= maxPrice;
  });
};

// Helper function to get hotels by rating
export const getHotelsByRating = (minRating: number): HotelData[] => {
  return mockHotels.filter(hotel => hotel.rating >= minRating);
};

// Export the original data structure for backward compatibility
export const specialOffersData = mockHotels;
