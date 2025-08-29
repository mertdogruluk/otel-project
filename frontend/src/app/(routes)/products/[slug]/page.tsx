"use client";
import React from "react";
import ProductHeader from "@/components/product-detail-page/ProductHeader";
import ProductImageCarousel from "@/components/carousel/ProductImageCarousel";
import BookingFormCard from "@/components/product-detail-page/BookingFormCard";
import HotelFeatures from "@/components/product-detail-page/HotelFeatures";
import ProductTabs from "@/components/product-detail-page/ProductTabs";
import HotelCard from "@/components/specialoffers/HotelCard";
import { mockHotels } from "@/data/hotels";
import { HotelData } from "@/types/hotel";

// Get the first hotel from mock data for demonstration
// In a real app, this would come from the URL slug parameter
const currentHotel: HotelData = mockHotels[0];

function ProductDetailPage() {
  return (
    <div className="px-24">
      {/* Header Section */}
      <div className="my-8">
        <ProductHeader hotel={currentHotel} />
      </div>
      
      {/* Hotel Detail Section */}
      <div className="flex flex-row gap-20 mb-10 items-start">
        {/* Left: Carousel - limited width */}
        <div className="flex-1 max-w-[960px]">
          <ProductImageCarousel images={currentHotel.images} />
        </div>
        {/* Right: Booking card on top, features below - fixed width */}
        <div className="flex flex-col gap-8 w-[460px] flex-shrink-0">
          <BookingFormCard hotelData={currentHotel} />
          <HotelFeatures hotelData={currentHotel} />
        </div>
      </div>

      {/* Hotel Tabs Section */}
      <div className="my-8 max-w-[960px]">
        <ProductTabs />
      </div>
      
      {/* En Son Bakılan Hotel Section */}
      <div className="mb-8 ">
        <h3 className="text-2xl font-bold font-opensans text-gray-900 mb-6">
          Benzer Oteller
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockHotels.slice(0, 4).map((hotel) => (
            <HotelCard
              key={hotel.id}
              image={hotel.image}
              title={hotel.title}
              location={hotel.location}
              price={hotel.price}
              rating={hotel.rating}
              reviews={hotel.reviews}
              tag={hotel.tag}
              amenities={hotel.amenities}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
