# Veri Yönetimi (Data Management)

Bu klasör, proje genelinde kullanılan mock verileri ve veri yapılarını içerir.

## Dosya Yapısı

### `hotels.ts`
- **Amaç**: Otel verilerini merkezi olarak yönetmek
- **İçerik**: Mock otel verileri ve yardımcı fonksiyonlar
- **Export**: `mockHotels`, `specialOffersData`, filtreleme fonksiyonları

## Kullanım

### Otel Verilerini İçe Aktarma
```typescript
import { mockHotels, getHotelsByCategory, getHotelsByLocation } from '@/data/hotels';
```

### Filtreleme Fonksiyonları
```typescript
// Kategoriye göre filtreleme
const hotelHotels = getHotelsByCategory('hotel');

// Konuma göre filtreleme
const marrakechHotels = getHotelsByLocation('Marakeş');

// Fiyat aralığına göre filtreleme
const affordableHotels = getHotelsByPriceRange(30000, 50000);

// Rating'e göre filtreleme
const topRatedHotels = getHotelsByRating(4.5);
```

## API Entegrasyonu

Backend API'leri hazır olduğunda, bu dosyaları kolayca güncelleyebilirsiniz:

1. **Mock veriyi kaldırın**: `mockHotels` array'ini boşaltın
2. **API çağrıları ekleyin**: Fonksiyonları async yapın ve API endpoint'lerini çağırın
3. **Error handling ekleyin**: API hatalarını yakalayın
4. **Loading states ekleyin**: Veri yüklenirken kullanıcıya bilgi verin

### Örnek API Entegrasyonu
```typescript
// Önceki mock implementasyon
export const getHotelsByCategory = (category: string): HotelData[] => {
  return mockHotels.filter(hotel => hotel.category === category);
};

// API entegrasyonu sonrası
export const getHotelsByCategory = async (category: string): Promise<HotelData[]> => {
  try {
    const response = await fetch(`/api/hotels?category=${category}`);
    const data = await response.json();
    return data.hotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};
```

## Veri Yapısı

Tüm veri yapıları `src/types/hotel.ts` dosyasında tanımlanmıştır:

- `HotelData`: Ana otel veri yapısı
- `HotelCardProps`: Bileşen prop'ları
- `Amenity`: Özellik bilgileri
- `HotelFilters`: Filtreleme seçenekleri
- `HotelSearchResult`: Arama sonuçları

## Avantajlar

1. **Merkezi Yönetim**: Tüm otel verileri tek yerden yönetilir
2. **Kolay Güncelleme**: API entegrasyonu için tek dosya güncellenir
3. **Tutarlılık**: Tüm bileşenler aynı veri yapısını kullanır
4. **Test Edilebilirlik**: Mock veriler test senaryoları için kullanılabilir
5. **Geliştirme Hızı**: Backend hazır olmadan frontend geliştirilebilir

## Notlar

- Mock veriler gerçekçi olmalıdır
- Veri yapısı backend API'si ile uyumlu olmalıdır
- Tüm bileşenler bu merkezi veri kaynağını kullanmalıdır
- Gelecekte eklenebilecek alanlar için interface'ler genişletilebilir
