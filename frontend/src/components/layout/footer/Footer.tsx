import { Line } from "@/components/icons";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-[#1E4EAE] px-24">
      <div className="flex flex-col gap-8 mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer mt-7">
            <Image
              src="/images/hotel-img.png"
              width={35}
              height={25}
              alt="hotel"
            />
            <p className="text-2xl text-white font-bold pt-2">StayEase</p>
          </div>
        </Link>

        {/* Footer Line */}
        <Line className="h-[1px] text-[#8CA2C0]" />

        {/* Footer Text */}
        <div className="grid grid-cols-4 gap-14 my-7">
          {/* Categories Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Kategoriler
            </h4>
            {["Otel", "Villa", "Kiralık Daire", "Bungalov", "Pansiyon", "Kamp"].map(
              (item, i) => (
                <Link href="/" key={i}>
                  <p className="font-opensans font-normal text-sm text-white">
                    {item}
                  </p>
                </Link>
              )
            )}
          </div>

          {/* Support Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Destek
            </h4>
            {["Sıkça Sorulan Sorular", "Canlı Destek", "İptal ve Değişim"].map(
              (item, i) => (
                <Link href="/" key={i}>
                  <p className="font-opensans font-normal text-sm text-white">
                    {item}
                  </p>
                </Link>
              )
            )}
          </div>

          {/* Discover Us Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Bizi Keşfet
            </h4>
            {["Hakkımızda", "Gizlilik", "Şartlar ve Koşullar"].map(
              (item, i) => (
                <Link href="/" key={i}>
                  <p className="font-opensans font-normal text-sm text-white">
                    {item}
                  </p>
                </Link>
              )
            )}
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Bizi Takip Et
            </h4>
            <div className="flex flex-row gap-8">
              <Link href="/">
                <Facebook className="w-4 h-4 text-white fill-white" />
              </Link>
              <Link href="/">
                <Twitter className="w-4 h-4 text-white fill-white" />
              </Link>
              <Link href="/">
                <Instagram className="w-4 h-4 text-white" />
              </Link>
              <Link href="/">
                <Linkedin className="w-4 h-4 text-white fill-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Line */}
        <Line className="h-[1px] text-[#8CA2C0]" />

        {/* Copyright */}
        <div className="pb-5">
          <p className="text-sm text-white">© All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
