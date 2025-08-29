import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import Image from "next/image";
import Pagination from "../filters/Pagination";

function ProductTabs() {
  return (
    <>
      {/* Tab Section */}
      <Tabs defaultValue="description" className="w-full">
        <div className="border-b border-gray-200 mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-transparent border-0 p-0 h-auto">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none bg-transparent border-0 rounded-none py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Açıklama
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none bg-transparent border-0 rounded-none py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Değerlendirme
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none bg-transparent border-0 rounded-none py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Harita
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="description" className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Marakeş&apos;in kalbinde yer alan Riad Deluxe, geleneksel Fas
              mimarisinin zarif dokunuşlarıyla modern konforu buluşturan lüks
              bir konaklama deneyimi sunuyor. Medina&apos;nın tarihi sokaklarına
              sadece birkaç dakika mesafede bulunan bu büyüleyici riad, Fas
              kültürünü ve geleneklerini keşfetmek isteyen gezginler için ideal
              bir mekan. Zarif iç mekanları, geleneksel Fas dokuma halıları, el
              yapımı seramikler ve renkli cam işçilikleri ile sizi sıcak bir
              atmosferde ağırlıyor. Otelimiz, otantik bir Fas evi olan riad
              mimarisiyle, huzurlu bir kaçamak için mükemmel bir seçimdir.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Odalar ve Süitler:
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Riad Deluxe, özenle tasarlanmış geniş ve konforlu odaları ile
              misafirlerine benzersiz bir konaklama deneyimi sunuyor. Her odada
              klasik Fas tarzı dekorasyon, özel mobilyalar, yüksek kaliteli
              yataklar ve özel banyolar bulunmaktadır. Ayrıca, tüm odalarımızda
              ücretsiz Wi-Fi, klima, minibar ve LCD TV gibi modern olanaklar da
              mevcuttur.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Deluxe Süit:</strong> Geleneksel Fas tarzı ile dekore
                edilmiş, geniş oturma alanı ve jakuzili banyo sunan lüks
                süitler.
              </li>
              <li>
                <strong>Standart Oda:</strong> Modern olanaklarla donatılmış,
                konforlu ve sakin odalar.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Hizmetler:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>24 saat resepsiyon ve concierge hizmeti</li>
              <li>Geleneksel Fas mutfağından lezzetler sunan restoran</li>
              <li>
                Spa ve wellness merkezi: Geleneksel Fas masajları, sauna ve Türk
                hamamı
              </li>
              <li>Balkonlu ve teraslı odalar</li>
              <li>Özel havaalanı transferi (ücretli)</li>
              <li>Günlük tur ve keşif aktiviteleri</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Tesis İçi Olanaklar:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Şehir Turları:</strong> Marakeş&apos;in en ünlü
                mekanlarına turlar düzenlenir.
              </li>
              <li>
                <strong>Havuz:</strong> Geleneksel bir iç avluda yer alan şık
                yüzme havuzu.
              </li>
              <li>
                <strong>Yoga ve Meditasyon Alanı:</strong> Rahatlatıcı bir
                atmosferde yoga dersleri.
              </li>
              <li>
                <strong>Bahçe ve Teras:</strong> Marakeş&apos;in sıcak havasını
                hissedebileceğiniz huzurlu bir bahçe ve teras.
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="prose max-w-none">
            {/* Description Cards */}
            <div className="space-y-6">
              {/* John Doe Review */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        J
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">John Doe</h4>
                      <p className="text-gray-600 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">5.0</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-gray-500 text-sm">Published 2 weeks ago</p>
              </div>

              {/* Jane Smith Review */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        J
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Jane Smith</h4>
                      <p className="text-gray-600 text-sm">Canada</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">5.0</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                {/* Review Images */}
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

            {/* Pagination */}
            <div className="flex justify-end mt-8">
              <Pagination
                totalPages={8}
                currentPage={1}
                onPageChange={(page) => console.log(`Page changed to: ${page}`)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Harita</h3>
            <p className="text-gray-700 leading-relaxed">
              Bu bölümde otel konumu ve harita bilgileri yer alacaktır.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ProductTabs;
