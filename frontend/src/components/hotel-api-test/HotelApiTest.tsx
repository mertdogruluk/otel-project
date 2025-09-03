// API Test Component
// This component demonstrates how to use the API service and hooks

'use client';

import React, { useState, useEffect } from 'react';
import { useHotels, useHotel, useCreateReservation } from '@/hooks/useHotels';
import { APIHotel, APIHotelRoom, APIHotelImage } from '@/types/hotel';

const APITest: React.FC = () => {
  const [selectedHotelId, setSelectedHotelId] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
  
  // API hooks
  const { data: hotels, loading: hotelsLoading, error: hotelsError, refetch: refetchHotels } = useHotels();
  const { data: hotel, loading: hotelLoading, error: hotelError } = useHotel(selectedHotelId);
  const { mutate: createReservation, loading: reservationLoading, error: reservationError } = useCreateReservation();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Test reservation data
  const testReservation = {
    hotel_id: selectedHotelId,
    room_id: hotel?.rooms?.[0]?.room_id || 1,
    start_date: '2024-01-15',
    end_date: '2024-01-17',
    guest_count: 2,
    total_price: hotel?.rooms?.[0]?.price || 80000,
    user_id: 1
  };

  const handleCreateReservation = async () => {
    try {
      const result = await createReservation(testReservation);
      console.log('Reservation created:', result);
      alert('Rezervasyon başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Reservation failed:', error);
      alert('Rezervasyon oluşturulamadı!');
    }
  };

  // Show loading state only on client side
  if (!isClient) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hotel API Test - Backend Verileri</h1>
        <div className="p-4">Yükleniyor...</div>
      </div>
    );
  }

  if (hotelsLoading) return <div className="p-4">Hoteller yükleniyor...</div>;
  if (hotelsError) return <div className="p-4 text-red-500">Hata: {hotelsError}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hotel API Test - Backend Verileri</h1>
      
      {/* Hotels List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hoteller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels?.map((hotel: APIHotel) => (
            <div 
              key={hotel.hotel_id} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedHotelId === hotel.hotel_id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedHotelId(hotel.hotel_id)}
            >
              <h3 className="font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-600">{hotel.city}</p>
              <p className="text-sm text-gray-600">ID: {hotel.hotel_id}</p>
              {hotel.average_rating && (
                <p className="text-sm text-yellow-600">⭐ {hotel.average_rating.toFixed(1)}</p>
              )}
              <p className="text-sm text-gray-500">Oda Sayısı: {hotel._count?.rooms || 0}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={refetchHotels}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Hotelleri Yenile
        </button>
      </div>

      {/* Selected Hotel Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Seçili Otel Detayları</h2>
        {hotelLoading ? (
          <div>Otel detayları yükleniyor...</div>
        ) : hotelError ? (
          <div className="text-red-500">Hata: {hotelError}</div>
        ) : hotel ? (
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            <p><strong>Şehir:</strong> {hotel.city}</p>
            <p><strong>Adres:</strong> {hotel.address}</p>
            <p><strong>Açıklama:</strong> {hotel.description || 'Açıklama yok'}</p>
            {hotel.average_rating && (
              <p><strong>Ortalama Değerlendirme:</strong> ⭐ {hotel.average_rating.toFixed(1)}/5</p>
            )}
            <p><strong>Oda Sayısı:</strong> {hotel._count?.rooms || 0}</p>
            <p><strong>Rezervasyon Sayısı:</strong> {hotel._count?.reservations || 0}</p>
            
            {hotel.owner && (
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <h4 className="font-semibold">Otel Sahibi:</h4>
                <p><strong>Ad:</strong> {hotel.owner.name}</p>
                <p><strong>Email:</strong> {hotel.owner.email}</p>
                {hotel.owner.phone && <p><strong>Telefon:</strong> {hotel.owner.phone}</p>}
              </div>
            )}

            {hotel.rooms && hotel.rooms.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold mb-2">Odalar:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {hotel.rooms.slice(0, 4).map((room: APIHotelRoom) => (
                    <div key={room.room_id} className="p-2 bg-blue-50 rounded text-sm">
                      <p><strong>{room.name}</strong></p>
                      <p>Kapasite: {room.capacity}</p>
                      <p>Fiyat: {room.price} TL</p>
                      <p>Durum: {room.available ? 'Müsait' : 'Dolu'}</p>
                    </div>
                  ))}
                </div>
                {hotel.rooms.length > 4 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{hotel.rooms.length - 4} oda daha...
                  </p>
                )}
              </div>
            )}

            {hotel.images && hotel.images.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold mb-2">Resimler:</h4>
                <div className="flex gap-2 overflow-x-auto">
                  {hotel.images.slice(0, 3).map((image: APIHotelImage, index: number) => (
                    <div key={index} className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded">
                      <img 
                        src={image.url || image.image_url} 
                        alt={`${hotel.name} resim ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>Otel bulunamadı</div>
        )}
      </div>

      {/* Test Reservation */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Test Rezervasyon</h2>
        <div className="p-4 border rounded-lg bg-gray-50">
          <p><strong>Otel ID:</strong> {selectedHotelId}</p>
          <p><strong>Oda ID:</strong> {hotel?.rooms?.[0]?.room_id || 'Seçili oda yok'}</p>
          <p><strong>Oda Adı:</strong> {hotel?.rooms?.[0]?.name || 'Oda bilgisi yok'}</p>
          <p><strong>Check-in:</strong> 2024-01-15</p>
          <p><strong>Check-out:</strong> 2024-01-17</p>
          <p><strong>Misafir Sayısı:</strong> 2</p>
          <p><strong>Toplam Fiyat:</strong> {hotel?.rooms?.[0]?.price || 80000} TL</p>
          
          <button 
            onClick={handleCreateReservation}
            disabled={reservationLoading}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {reservationLoading ? 'Oluşturuluyor...' : 'Test Rezervasyonu Oluştur'}
          </button>
          
          {reservationError && (
            <p className="mt-2 text-red-500">Hata: {reservationError}</p>
          )}
        </div>
      </div>

      {/* API Status */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Durumu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Backend Server</h3>
            <p className="text-green-600">✅ http://localhost:3000 çalışıyor</p>
            <p className="text-sm text-gray-600">Port: 3000</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">API Endpoints</h3>
            <p className="text-sm text-gray-600">/api/hotels - Tüm oteller</p>
            <p className="text-sm text-gray-600">/api/hotels/:id - Otel detayı</p>
            <p className="text-sm text-gray-600">/api/hotels/cities/list - Şehir listesi</p>
            <p className="text-sm text-gray-600">/api/rooms - Oda listesi</p>
            <p className="text-sm text-gray-600">/api/reservations - Rezervasyonlar</p>
            <p className="text-sm text-gray-600">/api/users - Kullanıcılar</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 border rounded-lg bg-blue-50">
        <h3 className="font-semibold mb-2">Kullanım Talimatları</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Hoteller listesinden bir otel seçin</li>
          <li>• Seçili otelin detayları görüntülenecek</li>
          <li>• Test rezervasyonu oluşturabilirsiniz</li>
          <li>• &quot;Hotelleri Yenile&quot; butonu ile verileri güncelleyebilirsiniz</li>
          <li>• Console&apos;da API yanıtlarını takip edebilirsiniz</li>
        </ul>
      </div>
    </div>
  );
};

export default APITest;
