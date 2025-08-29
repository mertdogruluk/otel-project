"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { infoFormSchema, InfoFormData } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import Link from "next/link";

function PersonalInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoFormData>({
    resolver: zodResolver(infoFormSchema),
  });

  const onSubmit = async (data: InfoFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Form verileri:", data);
      // Form data will be processed here
      router.push("/booking/checkout");
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <h4 className="text-base font-bold font-opensans">Kişisel Bilgiler</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-2xl"
      >
        {/* Name and Surname */}
        <div className="flex flex-row gap-6">
          <div className="flex-1">
            <p className="font-bold font-opensans text-gray-800 mb-2">Ad</p>
            <Input
              type="text"
              placeholder="Ad Giriniz"
              {...register("ad")}
              className={`p-6 h-12 ${errors.ad ? "border-red-500" : ""}`}
            />
            {errors.ad && (
              <p className="text-sm text-red-500 mt-1">{errors.ad.message}</p>
            )}
          </div>
          <div className="flex-1">
            <p className="font-bold font-opensans text-gray-800 mb-2">Soyad</p>
            <Input
              type="text"
              placeholder="Soyad Giriniz"
              {...register("soyad")}
              className={`p-6 h-12 ${errors.soyad ? "border-red-500" : ""}`}
            />
            {errors.soyad && (
              <p className="text-sm text-red-500 mt-1">
                {errors.soyad.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="font-bold font-opensans text-gray-800 mb-2">
            E-posta adresi
          </p>
          <Input
            type="email"
            placeholder="ornek@gmail.com"
            {...register("email")}
            className={`p-6 h-12 ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Country/Region */}
        <div>
          <p className="font-bold font-opensans text-gray-800 mb-2">
            Ülke/Bölge
          </p>
          <Input
            type="text"
            placeholder="Ülke veya bölge seçiniz"
            {...register("ulkeBolge")}
            className={`p-6 h-12 ${errors.ulkeBolge ? "border-red-500" : ""}`}
          />
          {errors.ulkeBolge && (
            <p className="text-sm text-red-500 mt-1">
              {errors.ulkeBolge.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <p className="font-bold font-opensans text-gray-800 mb-2">
            Telefon Numarası
          </p>
          <Input
            type="text"
            placeholder="+90 5XX XXX XX XX"
            {...register("telefon")}
            className={`p-6 h-12 ${errors.telefon ? "border-red-500" : ""}`}
          />
          {errors.telefon && (
            <p className="text-sm text-red-500 mt-1">
              {errors.telefon.message}
            </p>
          )}
        </div>

        {/* Special Request */}
        <div>
          <p className="font-bold font-opensans text-gray-800 mb-2">
            Özel İstek
          </p>
          <Textarea
            placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
            {...register("ozelIstek")}
            className="p-6 h-36"
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-row gap-5 justify-end">
          <Link href="/products">
            <Button className="bg-white border border-[#2F6FED] hover:bg-[#2F6FED] hover:text-white text-[#2F6FED] font-opensans font-bold p-5 rounded-lg cursor-pointer">
              Geri
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#2F6FED] hover:bg-[white] hover:text-[#2F6FED] hover:border-[#2F6FED] border-1 text-white font-opensans font-bold p-5 rounded-lg cursor-pointer"
          >
            {isSubmitting ? "Gönderiliyor..." : "Ödeme adımına ilerle"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfoForm;
