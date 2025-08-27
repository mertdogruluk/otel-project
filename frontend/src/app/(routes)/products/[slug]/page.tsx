"use client";

import Image from "next/image";
import { Heart, Home, Share2, Upload } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import RezervasyonKarti from "@/components/booking/BookingSummary";
import OzelliklerGrid from "@/components/hotel-card/FeaturesGrid";
import OtelKarti from "@/components/hotel-card/HotelCard";
import { otelVerisi } from "@/types/hotel";
import { Button } from "@/components/ui/button";

const otelGorselleri = [
  {
    id: 1,
    src: "/images/hotel-page-1.jpg",
    alt: "Lüks otel havuzu ve mimari"
  },
  {
    id: 2,
    src: "/images/hotel-page-2.jpg",
    alt: "Otel iç avlu ve havuz"
  },
  {
    id: 3,
    src: "/images/hotel-page-3.jpg",
    alt: "Otel duvar dekorasyonu"
  },
  {
    id: 4,
    src: "/images/hotel-page-4.jpg",
    alt: "Otel havuz detayı"
  },
  {
    id: 5,
    src: "/images/hotel-page-5.jpg",
    alt: "Otel genel görünüm"
  }
];

export default function OtelSayfasi() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % otelGorselleri.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? otelGorselleri.length - 1 : prev - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Share functionality will be implemented here
    console.log("Share button clicked");
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4 md:px-8 xl:px-[90px]">
          {/* Breadcrumbs ve Butonlar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                 <div className="flex flex-row items-center gap-2">
                 <Home className="w-4 h-4" />
                 Ana Sayfa
                 </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Otel</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-blue-600">{otelVerisi.isim}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Favorites and Share Buttons */}
            <div className="flex items-center space-x-6">
              {/* Favorite Button */}
              <Button
                onClick={toggleFavorite}
                className="w-10 h-10 bg-white hover:bg-white flex items-center justify-center cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} fill={isFavorite ? 'currentColor' : 'none'} />
                </Button>

              {/* Share Button */}
              <Button
                onClick={toggleFavorite}
                className="w-10 h-10 bg-white hover:bg-white flex items-center justify-center cursor-pointer"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sol Taraf - Görsel Grid Yapısı */}
            <div className="w-full lg:flex-1 mb-8 lg:mb-0">
              <div className="max-w-[1000px]">
                {/* Büyük Ana Görsel */}
                <div className="mb-8 relative">
                  <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={otelGorselleri[currentImageIndex].src}
                      alt={otelGorselleri[currentImageIndex].alt}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Sol Ok Butonu */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                  >
                    <svg 
                      className="w-6 h-6 text-gray-700" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 19l-7-7 7-7" 
                      />
                    </svg>
                  </button>

                  {/* Sağ Ok Butonu */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                  >
                    <svg 
                      className="w-6 h-6 text-gray-700" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>

                {/* Küçük Görseller Grid */}
                <div className="grid grid-cols-4 gap-4 w-full max-w-[800px] mb-8">
                  {otelGorselleri.slice(1, 5).map((gorsel) => (
                    <div key={gorsel.id} className="relative w-full h-[150px] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={gorsel.src}
                        alt={gorsel.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Tab Yapısı */}
                <Tabs defaultValue="aciklama" className="w-full">
                  <div className="border-b border-gray-200 mb-6">
                    <TabsList className="grid w-full grid-cols-3 bg-transparent border-0 p-0 h-auto">
                      <TabsTrigger 
                        value="aciklama" 
                        className="data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none bg-transparent border-0 rounded-none py-3 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Açıklama
                      </TabsTrigger>
                      <TabsTrigger 
                        value="degerlendirme" 
                        className="data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none bg-transparent border-0 rounded-none py-3 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Değerlendirme
                      </TabsTrigger>
                      <TabsTrigger 
                        value="harita" 
                        className="data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none bg-transparent border-0 rounded-none py-3 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Harita
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="aciklama" className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Riad Deluxe, geleneksel Fas mimarisini modern konforla birleştiren lüks bir konaklama seçeneğidir. 
                        Fas kültürünü ve geleneklerini keşfetmek isteyen gezginler için ideal olan bu otel, 
                        Medina&apos;nın tarihi sokaklarından dakikalar uzaklıkta yer almaktadır.
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Zarif iç mekanlar, geleneksel Fas dokuma halıları, el yapımı seramikler ve renkli cam işçiliği 
                        ile dekore edilmiş odalar, sıcak bir atmosfer yaratır. Otantik riad mimarisi ile 
                        huzurlu bir kaçamak için mükemmel bir seçimdir.
                      </p>

                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Odalar ve Süitler:</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Odalarımız geniş, konforlu ve benzersiz tasarıma sahiptir. Klasik Fas dekoru, 
                        özel mobilyalar, yüksek kaliteli yataklar ve özel banyolar sunuyoruz. 
                        Modern olanaklar arasında ücretsiz Wi-Fi, klima, minibar ve LCD TV bulunmaktadır.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                        <li><strong>Deluxe Süit:</strong> Geleneksel Fas tarzı ile dekore edilmiş, geniş oturma alanı ve jakuzili banyo sunan lüks süitler.</li>
                        <li><strong>Standart Oda:</strong> Modern olanaklarla donatılmış, konforlu ve sakin odalar.</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Hizmetler:</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                        <li>24 saat resepsiyon ve concierge hizmeti</li>
                        <li>Geleneksel Fas mutfağından lezzetler sunan restoran</li>
                        <li>Spa ve wellness merkezi: Geleneksel Fas masajları, sauna ve Türk hamamı</li>
                        <li>Balkonlu ve teraslı odalar</li>
                        <li>Özel havaalanı transferi (ücretli)</li>
                        <li>Günlük tur ve keşif aktiviteleri</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Tesis İçi Olanaklar:</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li><strong>Şehir Turları:</strong> Marakeş&apos;in en ünlü mekanlarına turlar düzenlenir.</li>
                        <li><strong>Havuz:</strong> Geleneksel bir iç avluda yer alan şık yüzme havuzu.</li>
                        <li><strong>Yoga ve Meditasyon Alanı:</strong> Rahatlatıcı bir atmosferde yoga dersleri.</li>
                        <li><strong>Bahçe ve Teras:</strong> Marakeş&apos;in sıcak havasını hissedebileceğiniz huzurlu bir bahçe ve teras.</li>
                      </ul>
                    </div>

                    {/* En Son Baktıklarınız Bölümü */}
                    <div className="mt-12">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-gray-800">En son baktıklarınız</h3>
                      </div>
                      <div className="flex gap-6" style={{ width: 'fit-content' }}>
                        <OtelKarti
                          id="1"
                          isim="Riad Deluxe Hotel"
                          konum="Marakeş, Fas"
                          puan={4.7}
                          yorumSayisi={120}
                          fiyat={40500}
                          paraBirimi="TL"
                          geceSayisi={4}
                          imageSrc={otelGorselleri[0].src}
                          width="w-[292.5px]"
                          height="h-[493.5px]"
                        />
                        <OtelKarti
                          id="2"
                          isim="Riad Deluxe Hotel"
                          konum="Marakeş, Fas"
                          puan={4.7}
                          yorumSayisi={120}
                          fiyat={40500}
                          paraBirimi="TL"
                          geceSayisi={4}
                          imageSrc={otelGorselleri[1].src}
                          width="w-[292.5px]"
                          height="h-[493.5px]"
                        />
                        <OtelKarti
                          id="3"
                          isim="Riad Deluxe Hotel"
                          konum="Marakeş, Fas"
                          puan={4.7}
                          yorumSayisi={120}
                          fiyat={40500}
                          paraBirimi="TL"
                          geceSayisi={4}
                          imageSrc={otelGorselleri[2].src}
                          width="w-[292.5px]"
                          height="h-[493.5px]"
                        />
                        <div className="relative">
                          <Link href="/tumunu-gor" className="absolute -top-8 right-0 text-blue-600 hover:text-blue-700 font-semibold transition-colors z-10">
                            Tümünü gör
                          </Link>
                          <OtelKarti
                            id="4"
                            isim="Riad Deluxe Hotel"
                            konum="Marakeş, Fas"
                            puan={4.7}
                            yorumSayisi={120}
                            fiyat={40500}
                            paraBirimi="TL"
                            geceSayisi={4}
                            imageSrc={otelGorselleri[3].src}
                            width="w-[292.5px]"
                            height="h-[493.5px]"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="degerlendirme" className="space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Misafir Değerlendirmeleri</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Misafirlerimizin deneyimleri ve değerlendirmeleri aşağıda yer almaktadır.
                      </p>
                      
                      {/* Yorum Kartları */}
                      <div className="space-y-6">
                        {/* John Doe Yorumu */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">J</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">John Doe</h4>
                                <p className="text-gray-600 text-sm">United States</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="font-semibold text-gray-900">5.0</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <p className="text-gray-500 text-sm">Published 2 weeks ago</p>
                        </div>

                        {/* Jane Smith Yorumu */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">J</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">Jane Smith</h4>
                                <p className="text-gray-600 text-sm">Canada</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="font-semibold text-gray-900">5.0</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                          
                          {/* Yorum Görselleri */}
                          <div className="flex gap-3 mb-4">
                            <div className="w-32 h-24 rounded-lg overflow-hidden">
                              <Image
                                src="/images/hotel-page-1.jpg"
                                alt="Otel odası görseli"
                                width={128}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-32 h-24 rounded-lg overflow-hidden">
                              <Image
                                src="/images/hotel-page-2.jpg"
                                alt="Otel odası görseli"
                                width={128}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          <p className="text-gray-500 text-sm">Published 1 month ago</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="harita" className="space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Harita</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Bu bölümde otel konumu ve harita bilgileri yer alacaktır.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sağ Taraf - Kartlar */}
            <div className="w-full lg:w-96 space-y-8">
              <RezervasyonKarti otelData={otelVerisi} />
              <OzelliklerGrid otelData={otelVerisi} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
