# JWT Middleware - Basit Açıklama

## 🎯 JWT Nedir ve Neden Kullanırız?

**JWT (JSON Web Token)**, kullanıcıların kimlik doğrulamasını sağlayan bir sistemdir. 

**Basit Örnek:**
- Kullanıcı giriş yapar (email + şifre)
- Sunucu "giriş başarılı" der ve bir JWT token verir
- Bu token, kullanıcının kimlik kartı gibidir
- Kullanıcı her istekte bu token'ı gösterir
- Sunucu token'ı kontrol eder ve "evet, bu kullanıcı gerçekten giriş yapmış" der

**Gerçek Hayat Benzetmesi:**
- Otel girişinde kimlik kartı alırsınız
- Bu kartla otel içinde istediğiniz yere gidebilirsiniz
- Kart olmadan otel içinde dolaşamazsınız
- JWT token = Otel kimlik kartı

## 🚀 Kurulum (Basit Adımlar)

### 1. .env Dosyası Oluşturun

Backend klasöründe `.env` adında bir dosya oluşturun ve içine şunları yazın:

```env
JWT_SECRET=gizli_anahtar_buraya_yazin
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/otel_db"
PORT=3001
```

**Önemli:** `JWT_SECRET` kısmına gerçek bir gizli anahtar yazın (örnek: `abc123xyz789`)

### 2. Paketler Zaten Yüklü ✅

Gerekli paketler zaten yüklü, ekstra bir şey yapmanıza gerek yok.

## 🔐 Middleware Fonksiyonları (Ne İşe Yarar?)

### 1. `authenticateToken` - Kimlik Kartı Kontrolü

Bu fonksiyon, gelen istekte JWT token'ını kontrol eder.

**Ne Yapar?**
- Gelen istekte "Authorization" başlığında token var mı bakar
- Token varsa, bu token'ın geçerli olup olmadığını kontrol eder
- Token geçerliyse, kullanıcı bilgilerini `req.user`'a ekler
- Token yoksa veya geçersizse, "giriş yapın" hatası verir

**Basit Kullanım:**
```javascript
import { authenticateToken } from '../middlewares/authMiddleware.js';

// Bu route'a sadece giriş yapmış kullanıcılar erişebilir
router.get('/profilim', authenticateToken, (req, res) => {
  // req.user kullanıcı bilgilerini içerir
  res.json({ 
    mesaj: 'Hoş geldiniz!', 
    kullanici: req.user 
  });
});
```

### 2. `authorizeRoles` - Yetki Kontrolü

Bu fonksiyon, kullanıcının hangi role sahip olduğunu kontrol eder.

**Ne Yapar?**
- Kullanıcının rolünü kontrol eder (ADMIN, HOTEL_OWNER, USER gibi)
- Sadece belirtilen rollere sahip kullanıcıların erişimine izin verir
- Yetkisiz kullanıcılar için "yetkiniz yok" hatası verir

**Basit Kullanım:**
```javascript
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';

// Sadece ADMIN rolündeki kullanıcılar erişebilir
router.get('/admin-panel', authenticateToken, authorizeRoles(['ADMIN']), (req, res) => {
  res.json({ mesaj: 'Admin paneline hoş geldiniz!' });
});

// ADMIN veya HOTEL_OWNER rolündeki kullanıcılar erişebilir
router.get('/otel-yonetimi', authenticateToken, authorizeRoles(['ADMIN', 'HOTEL_OWNER']), (req, res) => {
  res.json({ mesaj: 'Otel yönetim paneline hoş geldiniz!' });
});
```

### 3. `authorizeOwnResource` - Kendi Verilerine Erişim

Bu fonksiyon, kullanıcıların sadece kendi verilerine erişmesini sağlar.

**Ne Yapar?**
- Kullanıcının sadece kendi verilerine erişmesine izin verir
- Başka kullanıcıların verilerine erişimi engeller
- Admin kullanıcılar herkese erişebilir

**Basit Kullanım:**
```javascript
import { authenticateToken, authorizeOwnResource } from '../middlewares/authMiddleware.js';

// Kullanıcı sadece kendi profilini güncelleyebilir
router.put('/profilim/:userId', authenticateToken, authorizeOwnResource(req.params.userId), (req, res) => {
  // Profil güncelleme işlemi
  res.json({ mesaj: 'Profil güncellendi!' });
});
```

## 📝 Pratik Örnekler

### Örnek 1: Kullanıcı Profili

```javascript
// Kullanıcı kendi profilini görüntüleyebilir
router.get('/profilim', authenticateToken, (req, res) => {
  res.json({ 
    mesaj: 'Profil bilgileriniz', 
    kullanici: req.user 
  });
});

// Admin tüm kullanıcıları görebilir
router.get('/tum-kullanicilar', authenticateToken, authorizeRoles(['ADMIN']), async (req, res) => {
  const kullanicilar = await prisma.user.findMany();
  res.json({ kullanicilar });
});
```

### Örnek 2: Otel Yönetimi

```javascript
// Otel sahibi otel oluşturabilir
router.post('/otel-ekle', authenticateToken, authorizeRoles(['HOTEL_OWNER']), async (req, res) => {
  // Otel oluşturma işlemi
  res.json({ mesaj: 'Otel başarıyla eklendi!' });
});

// Kullanıcı sadece kendi rezervasyonlarını görebilir
router.get('/rezervasyonlarim/:userId', authenticateToken, authorizeOwnResource(req.params.userId), async (req, res) => {
  // Kendi rezervasyonlarını listele
  res.json({ mesaj: 'Rezervasyonlarınız' });
});
```

## ❌ Hata Mesajları

Middleware şu hataları Türkçe olarak döndürür:

- **401 Unauthorized**: "Erişim token'ı bulunamadı. Lütfen giriş yapın."
- **403 Forbidden**: "Bu işlem için yetkiniz bulunmamaktadır."
- **500 Internal Server Error**: "Sunucu hatası. Lütfen daha sonra tekrar deneyin."

## 🔒 Güvenlik Önerileri

1. **JWT_SECRET**: Güçlü ve benzersiz bir secret key kullanın
2. **HTTPS**: Production ortamında mutlaka HTTPS kullanın
3. **Token Süresi**: Token'ların süresini makul tutun (örn: 24 saat)

## 🧪 Test Etme

### Postman ile Test

1. **Login endpoint'inden token alın**
2. **Authorization header'ına "Bearer TOKEN" ekleyin**
3. **Protected route'ları test edin**

### cURL ile Test

```bash
# Token ile istek gönderme
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3001/api/users/profile/123
```

## ❓ Sık Sorulan Sorular

**Q: Middleware'i nasıl kullanırım?**
A: Route'larınızda import edip, route tanımından önce yazın.

**Q: Birden fazla middleware kullanabilir miyim?**
A: Evet! Sırayla yazabilirsiniz: `authenticateToken, authorizeRoles(['ADMIN'])`

**Q: Hata alıyorum, ne yapmalıyım?**
A: `.env` dosyasında `JWT_SECRET` tanımladığınızdan emin olun.

## 📚 Özet

JWT middleware 3 ana işlevi yerine getirir:

1. **authenticateToken** → Kullanıcı giriş yapmış mı?
2. **authorizeRoles** → Kullanıcının yetkisi var mı?
3. **authorizeOwnResource** → Kullanıcı kendi verisine mi erişiyor?

Bu 3 fonksiyonu kullanarak güvenli API'ler oluşturabilirsiniz! 🎉
