import HomePageCarousel from "@/components/carousel/HomePageCarousel";
import CategoriesInput from "@/components/forms/CategoriesInput";
import DatePicker from "@/components/forms/DatePicker";
import React from "react";

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[250px] flex items-center justify-center mb-10">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/images/map-img-2.png')] bg-cover bg-center bg-no-repeat z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="font-opensans font-bold text-[44px] text-black drop-shadow-lg">
            Hayalinizdeki Konaklama Bir Tık Uzağınızda
          </h1>
          <h2 className="font-opensans font-bold text-[20px] text-gray-400 pt-1 drop-shadow-md">
            Sevdiğiniz destinasyonlarda, en cazip fiyatlarla konaklama
            seçeneklerini keşfedin.
          </h2>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="-mt-20 mb-10 relative z-10">
        <HomePageCarousel />
      </div>

      {/* Date Picker Form Section */}
      <div className="flex justify-center -mt-22 mb-10 relative z-10">
        <DatePicker />
      </div>

      {/* Popular Categories Section */}
      <div className="flex justify-start pl-24 pt-5 pb-12">
        <h3 className="font-opensans font-bold text-4xl">
          Popüler Kategoriler
        </h3>
      </div>

      {/* Popular Categories Links */}
      <div className="flex justify-center mb-10">
       <CategoriesInput />
      </div>
    </>
  );
}

export default HomePage;
