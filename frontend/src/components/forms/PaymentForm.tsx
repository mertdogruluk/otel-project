"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { paymentFormSchema, PaymentFormData } from "@/lib/schemas";
import { useRouter } from "next/navigation";

function PaymentForm() {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Payment form verileri:", data);
      // Form data will be processed here
      router.push("/booking/confirmation");
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* Payment Method Section */}
        <div className="flex flex-col gap-7">
          <h4 className="text-base font-bold font-opensans">Ödeme Yöntemi</h4>
          {/* Credit Card Section */}
          <div className="flex flex-1">
            <div className="flex flex-row items-center gap-5 w-full">
              {/* Visa Card Option */}
              <div
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors w-56 h-24 ${
                  selectedPayment === "visa"
                    ? "border-[#2F6FED] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("visa")}
              >
                <Input
                  type="radio"
                  name="payment"
                  value="visa"
                  checked={selectedPayment === "visa"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-5 h-5 text-[#2F6FED] mr-3"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">**** 8304</span>
                  <span className="text-sm text-gray-500">Visa • Düzenle</span>
                </div>
                <div className="ml-5">
                  <span className="text-[#2F6FED] font-bold text-lg">VISA</span>
                </div>
              </div>
              {/* Add Credit Card Section */}
              <div className="w-16 h-16">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#2F6FED]" />
                  <span className="text-sm font-semibold text-[#2F6FED]">
                    Ekle
                  </span>
                </Button>
              </div>
            </div>
          </div>
          {/* Credit Card Details Section */}
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Card No Section */}
            <div>
              <p className="font-bold font-opensans text-gray-800 mb-2">
                Kart No
              </p>
              <Input
                type="text"
                placeholder="**** **** **** ****"
                {...register("cardNumber")}
                className={`p-6 h-12 ${
                  errors.cardNumber ? "border-red-500" : ""
                }`}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            {/* Expiration Date and CVV Section */}
            <div className="flex flex-row gap-6">
              {/* Expiration Date Section */}
              <div className="flex-1">
                <p className="font-bold font-opensans text-gray-800 mb-2">
                  Son Kullanma Tarihi
                </p>
                <Input
                  type="text"
                  placeholder="aa/yy"
                  {...register("expiryDate")}
                  className={`p-6 h-12 ${
                    errors.expiryDate ? "border-red-500" : ""
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
              {/* CVV Section */}
              <div className="flex-1">
                <p className="font-bold font-opensans text-gray-800 mb-2">
                  CVV
                </p>
                <Input
                  type="password"
                  placeholder="***"
                  {...register("cvv")}
                  className={`p-6 h-12 ${errors.cvv ? "border-red-500" : ""}`}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
            {/* Address Section */}
            <div>
              <p className="font-bold font-opensans text-gray-800 mb-2">
                Adres
              </p>
              <Input
                type="text"
                placeholder="Adresinizi giriniz"
                {...register("address")}
                className={`p-6 h-12 ${errors.address ? "border-red-500" : ""}`}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            {/* Country/Region Section */}
            <div>
              <p className="font-bold font-opensans text-gray-800 mb-2">
                Ülke/Bölge
              </p>
              <Input
                type="text"
                placeholder="Ülke/Bölge"
                {...register("country")}
                className={`p-6 h-12 ${errors.country ? "border-red-500" : ""}`}
              />
              {errors.country && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            {/* Phone Number Section */}
            <div>
              <p className="font-bold font-opensans text-gray-800 mb-2">
                Telefon Numarası
              </p>
              <Input
                type="text"
                placeholder="+90 5XX XXX XX XX"
                {...register("phone")}
                className={`p-6 h-12 ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* Special Request Section */}
            <div>
              <p className="font-bold font-opensans text-gray-800 mb-2">
                Özel İstek
              </p>
              <Textarea
                placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                {...register("specialRequest")}
                className="p-6 h-36"
              />
              {errors.specialRequest && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.specialRequest.message}
                </p>
              )}
            </div>
            {/* Button Section */}
            <div className="flex flex-row gap-5 justify-end">
              <Link href="/booking/info">
                <Button className="bg-white border border-[#2F6FED] hover:bg-[#2F6FED] hover:text-white text-[#2F6FED] font-opensans font-bold p-5 rounded-lg cursor-pointer">
                  Geri
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2F6FED] hover:bg-[white] hover:text-[#2F6FED] hover:border-[#2F6FED] border-1 text-white font-opensans font-bold p-5 rounded-lg cursor-pointer"
              >
                {isSubmitting ? "İşleniyor..." : "Ödeme İşlemini Tamamla"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PaymentForm;
