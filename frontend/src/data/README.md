# API Service Documentation

Bu klasör, backend server'dan veri çekmek için gerekli API servislerini içerir.

## Dosyalar

### 1. `apiService.ts`
Backend server'a HTTP istekleri gönderen ana API servis dosyası.

**Özellikler:**
- Generic API request fonksiyonu
- Tüm endpoint'ler için ayrı API modülleri
- Error handling
- TypeScript desteği

**API Modülleri:**
- `hotelAPI` - Otel işlemleri
- `roomAPI` - Oda işlemleri  
- `reservationAPI` - Rezervasyon işlemleri
- `userAPI` - Kullanıcı işlemleri
- `ratingAPI` - Değerlendirme işlemleri
- `chatAPI` - Sohbet işlemleri
- `messageAPI` - Mesaj işlemleri
- `imageAPI` - Resim işlemleri

### 2. `useAPI.ts`
React hook'ları ile API çağrılarını yöneten custom hook dosyası.

**Query Hook'ları:**
- `useHotels()` - Tüm hotelleri getir
- `useHotel(id)` - Belirli bir oteli getir
- `useRooms()` - Tüm odaları getir
- `useReservations()` - Tüm rezervasyonları getir

**Mutation Hook'ları:**
- `useCreateReservation()` - Yeni rezervasyon oluştur
- `useUpdateReservation()` - Rezervasyon güncelle
- `useCreateRating()` - Yeni değerlendirme oluştur

### 3. `API-Test.tsx`
API servislerini test etmek için örnek component.

**Özellikler:**
- Hoteller listesi
- Otel detayları
- Test rezervasyon oluşturma
- API durumu gösterimi

## Kullanım

### Temel API Çağrısı

```typescript
import { hotelAPI } from '@/data/apiService';

// Tüm hotelleri getir
const hotels = await hotelAPI.getAll();

// Belirli bir oteli getir
const hotel = await hotelAPI.getById(1);
```

### Hook Kullanımı

```typescript
import { useHotels, useHotel } from '@/hooks/useAPI';

function MyComponent() {
  const { data: hotels, loading, error } = useHotels();
  const { data: hotel } = useHotel(1);
  
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  
  return <div>{/* Component içeriği */}</div>;
}
```

### Mutation Hook Kullanımı

```typescript
import { useCreateReservation } from '@/hooks/useAPI';

function ReservationForm() {
  const { mutate: createReservation, loading } = useCreateReservation();
  
  const handleSubmit = async (data) => {
    try {
      const result = await createReservation(data);
      console.log('Rezervasyon oluşturuldu:', result);
    } catch (error) {
      console.error('Hata:', error);
    }
  };
  
  return (
    <button onClick={() => handleSubmit(reservationData)} disabled={loading}>
      {loading ? 'Oluşturuluyor...' : 'Rezervasyon Oluştur'}
    </button>
  );
}
```

## Backend Endpoints

Backend server'ınız şu endpoint'leri desteklemelidir:

- `GET /api/hotels` - Tüm hotelleri getir
- `GET /api/hotels/:id` - Belirli bir oteli getir
- `GET /api/rooms` - Tüm odaları getir
- `GET /api/rooms?hotelId=:id` - Belirli bir otelin odalarını getir
- `POST /api/reservations` - Yeni rezervasyon oluştur
- `GET /api/reservations` - Tüm rezervasyonları getir
- `GET /api/users/:id` - Belirli bir kullanıcıyı getir

## Test Etme

1. Backend server'ınızın çalıştığından emin olun (http://localhost:3000)
2. `API-Test.tsx` component'ini bir sayfada render edin
3. Console'da API yanıtlarını takip edin
4. Network sekmesinde HTTP isteklerini inceleyin

## Hata Ayıklama

### Yaygın Hatalar

1. **CORS Hatası**: Backend'de CORS ayarlarının doğru yapılandırıldığından emin olun
2. **Port Hatası**: Backend server'ın 3000 portunda çalıştığından emin olun
3. **Endpoint Hatası**: Backend route'larının doğru tanımlandığından emin olun

### Debug İpuçları

- Browser console'da hata mesajlarını kontrol edin
- Network sekmesinde HTTP isteklerini inceleyin
- Backend server log'larını takip edin
- API endpoint'lerini Postman veya benzeri araçlarla test edin

## Geliştirme

### Yeni Endpoint Ekleme

1. `apiService.ts` dosyasına yeni API fonksiyonu ekleyin
2. `useAPI.ts` dosyasına yeni hook ekleyin
3. Gerekirse yeni type'lar tanımlayın
4. Test component'inde yeni fonksiyonaliteyi test edin

### Error Handling

Tüm API çağrıları için uygun error handling ekleyin:

```typescript
try {
  const result = await apiCall();
  // Başarılı işlem
} catch (error) {
  // Hata işleme
  console.error('API Error:', error);
  // Kullanıcıya hata mesajı göster
}
```
