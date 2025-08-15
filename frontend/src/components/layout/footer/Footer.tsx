import { Line } from "@/components/icons";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full py-7 bg-[#1E4EAE]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 flex-wrap">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
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
        <div className="pt-8 pb-20">
          <Line className="w-full h-[1px] text-[#8CA2C0]" />
        </div>

        {/* Footer Text */}
        <div className="grid grid-cols-4 gap-40 ">
          {/* Categories Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Kategoriler
            </h4>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Otel
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Villa
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Kiralık Daire
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Bungalov
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Pansiyon
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Kamp
              </p>
            </Link>
          </div>

          {/* Support Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Destek
            </h4>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Sıkça Sorulan Sorular
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Canlı Destek
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                İptal ve Değişim
              </p>
            </Link>
          </div>

          {/* Discover Us Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-opensans font-bold text-base text-white mb-2">
              Bizi Keşfet
            </h4>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Hakkımızda
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Gizlilik
              </p>
            </Link>
            <Link href="/">
              <p className="font-opensans font-normal text-sm text-white">
                Şartlar ve Koşullar
              </p>
            </Link>
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
        <div className="pt-10 pb-5">
          <Line className="w-full h-[1px] text-[#8CA2C0]" />
        </div>

        <div className="">
          <p className="text-sm text-white">© All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
