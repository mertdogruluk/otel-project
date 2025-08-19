"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bilgilerFormSchema, BilgilerFormData } from "@/lib/schemas";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/forms/ProgressBar";

export default function BilgilerSayfasi() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BilgilerFormData>({
    resolver: zodResolver(bilgilerFormSchema),
  });

  const onSubmit = async (data: BilgilerFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Form verileri:", data);
      // Burada form verilerini işleyebilirsiniz
      // Örneğin: API'ye gönderme, sonraki sayfaya yönlendirme vb.
      router.push("/booking/confirmation");
    } catch (error) {
      console.error("Form gönderimi hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-xl mx-auto pt-8 flex justify-center">
        <ProgressBar currentStep={1} />
      </div>
      <main className="py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sol Taraf - Form */}
            <div className="w-full lg:flex-1 mb-8 lg:mb-0">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Kişisel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Ad ve Soyad */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ad" className="text-sm font-medium text-gray-700">
                          Ad
                        </Label>
                        <Input
                          id="ad"
                          placeholder="Ad Giriniz"
                          {...register("ad")}
                          className={`w-full ${errors.ad ? "border-red-500" : ""}`}
                        />
                        {errors.ad && (
                          <p className="text-sm text-red-500">{errors.ad.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="soyad" className="text-sm font-medium text-gray-700">
                          Soyad
                        </Label>
                        <Input
                          id="soyad"
                          placeholder="Soyad Giriniz"
                          {...register("soyad")}
                          className={`w-full ${errors.soyad ? "border-red-500" : ""}`}
                        />
                        {errors.soyad && (
                          <p className="text-sm text-red-500">{errors.soyad.message}</p>
                        )}
                      </div>
                    </div>

                    {/* E-posta */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        E-posta adresi
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@gmail.com"
                        {...register("email")}
                        className={`w-full ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Ülke/Bölge */}
                    <div className="space-y-2">
                      <Label htmlFor="ulkeBolge" className="text-sm font-medium text-gray-700">
                        Ülke/Bölge
                      </Label>
                      <Input
                        id="ulkeBolge"
                        placeholder="Ülke veya bölge seçiniz"
                        {...register("ulkeBolge")}
                        className={`w-full ${errors.ulkeBolge ? "border-red-500" : ""}`}
                      />
                      {errors.ulkeBolge && (
                        <p className="text-sm text-red-500">{errors.ulkeBolge.message}</p>
                      )}
                    </div>

                    {/* Telefon */}
                    <div className="space-y-2">
                      <Label htmlFor="telefon" className="text-sm font-medium text-gray-700">
                        Telefon Numarası
                      </Label>
                      <Input
                        id="telefon"
                        placeholder="+90 5XX XXX XX XX"
                        {...register("telefon")}
                        className={`w-full ${errors.telefon ? "border-red-500" : ""}`}
                      />
                      {errors.telefon && (
                        <p className="text-sm text-red-500">{errors.telefon.message}</p>
                      )}
                    </div>

                    {/* Özel İstek */}
                    <div className="space-y-2">
                      <Label htmlFor="ozelIstek" className="text-sm font-medium text-gray-700">
                        Özel İstek
                      </Label>
                      <Textarea
                        id="ozelIstek"
                        placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                        {...register("ozelIstek")}
                        className="w-full min-h-[100px] resize-none"
                      />
                    </div>

                    {/* Gönder Butonu */}
                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        {isSubmitting ? "Gönderiliyor..." : "Ödeme adımına ilerle"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Taraf - Rezervasyon Özeti */}
            <div className="w-full lg:w-96">
              <Card className="shadow-lg sticky top-0 overflow-hidden py-0">
                {/* Otel Görseli - Card'ın en üstünde */}
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/hotel-page-1.jpg"
                    alt="Riad Deluxe"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <CardContent className="p-0">
                  {/* Otel Bilgileri */}
                  <div className="p-6 pt-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Riad Deluxe</h2>
                    <p className="text-gray-600 mb-3">Marakeş, Fas</p>
                    
                    {/* Puanlama */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-semibold text-gray-700">4.7</span>
                      <span className="text-gray-500">(120)</span>
                    </div>

                    {/* Etiketler */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                        Ücretsiz iptal
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                        Kahvaltı dahil
                      </span>
                      <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                        Otopark
                      </span>
                    </div>

                    {/* Rezervasyon Bilgileri */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Rezervasyon Bilgileri</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Giriş</p>
                          <p className="font-semibold text-gray-800">18 Temmuz 2025</p>
                          <p className="text-xs text-gray-500">14:00&apos;dan itibaren</p>
                        </div>
                        <div className="w-px h-12 bg-gray-300"></div>
                        <div>
                          <p className="text-sm text-gray-600">Çıkış</p>
                          <p className="font-semibold text-gray-800">22 Temmuz 2025</p>
                          <p className="text-xs text-gray-500">12:00&apos;a kadar</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">Deluxe Room / 4 gece, 2 misafir</p>
                    </div>

                    {/* Ödeme Özeti */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Ödeme Özeti</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-700">4 gece</span>
                          <span className="font-semibold">30.000 TL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Vergiler ve Hizmet Bedeli</span>
                          <span className="font-semibold">10.500 TL</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-bold text-gray-800">Toplam</span>
                            <span className="text-lg font-bold text-blue-600">40.500 TL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}