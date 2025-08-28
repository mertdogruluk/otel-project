// Test file for hotels data and filtering functions
import { 
  mockHotels, 
  getHotelsByCategory, 
  getHotelsByLocation, 
  getHotelsByPriceRange, 
  getHotelsByRating 
} from './hotels';

describe('Hotels Data Management', () => {
  test('mockHotels should contain 8 hotels', () => {
    expect(mockHotels).toHaveLength(8);
  });

  test('all hotels should have required properties', () => {
    mockHotels.forEach(hotel => {
      expect(hotel).toHaveProperty('id');
      expect(hotel).toHaveProperty('title');
      expect(hotel).toHaveProperty('location');
      expect(hotel).toHaveProperty('price');
      expect(hotel).toHaveProperty('rating');
      expect(hotel).toHaveProperty('reviews');
      expect(hotel).toHaveProperty('amenities');
    });
  });

  test('all hotels should be in Marakeş, Fas', () => {
    mockHotels.forEach(hotel => {
      expect(hotel.location).toBe('Marakeş, Fas');
    });
  });

  test('all hotels should have rating >= 4.0', () => {
    mockHotels.forEach(hotel => {
      expect(hotel.rating).toBeGreaterThanOrEqual(4.0);
    });
  });

  test('getHotelsByCategory should return hotels with correct category', () => {
    const hotelHotels = getHotelsByCategory('hotel');
    expect(hotelHotels).toHaveLength(8);
    hotelHotels.forEach(hotel => {
      expect(hotel.category).toBe('hotel');
    });
  });

  test('getHotelsByLocation should return hotels in Marakeş', () => {
    const marrakechHotels = getHotelsByLocation('Marakeş');
    expect(marrakechHotels).toHaveLength(8);
  });

  test('getHotelsByLocation should return hotels in Fas', () => {
    const fasHotels = getHotelsByLocation('Fas');
    expect(fasHotels).toHaveLength(8);
  });

  test('getHotelsByPriceRange should filter by price correctly', () => {
    const affordableHotels = getHotelsByPriceRange(35000, 45000);
    expect(affordableHotels.length).toBeGreaterThan(0);
    affordableHotels.forEach(hotel => {
      const price = parseInt(hotel.price.replace(/[^\d]/g, ''));
      expect(price).toBeGreaterThanOrEqual(35000);
      expect(price).toBeLessThanOrEqual(45000);
    });
  });

  test('getHotelsByRating should return hotels with minimum rating', () => {
    const topRatedHotels = getHotelsByRating(4.5);
    expect(topRatedHotels.length).toBeGreaterThan(0);
    topRatedHotels.forEach(hotel => {
      expect(hotel.rating).toBeGreaterThanOrEqual(4.5);
    });
  });

  test('hotels should have unique IDs', () => {
    const ids = mockHotels.map(hotel => hotel.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockHotels.length);
  });

  test('hotels should have valid image paths', () => {
    mockHotels.forEach(hotel => {
      expect(hotel.image).toMatch(/^\/images\/.*\.png$/);
    });
  });

  test('hotels should have amenities array', () => {
    mockHotels.forEach(hotel => {
      expect(Array.isArray(hotel.amenities)).toBe(true);
      expect(hotel.amenities.length).toBeGreaterThan(0);
    });
  });

  test('hotels should have valid coordinates', () => {
    mockHotels.forEach(hotel => {
      if (hotel.coordinates) {
        expect(hotel.coordinates.latitude).toBe(31.6295);
        expect(hotel.coordinates.longitude).toBe(-7.9811);
      }
    });
  });

  test('hotels should have room types when available', () => {
    mockHotels.forEach(hotel => {
      if (hotel.roomTypes) {
        expect(Array.isArray(hotel.roomTypes)).toBe(true);
        hotel.roomTypes.forEach(room => {
          expect(room).toHaveProperty('id');
          expect(room).toHaveProperty('name');
          expect(room).toHaveProperty('capacity');
          expect(room).toHaveProperty('price');
          expect(room).toHaveProperty('available');
        });
      }
    });
  });
});
