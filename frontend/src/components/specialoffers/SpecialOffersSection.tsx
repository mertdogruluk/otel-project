"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HotelCard from "./HotelCard";
import { mockHotels } from "@/data/hotels";

// Use centralized hotel data
const specialOffersData = mockHotels;

function SpecialOffersSection() {
  const [activeFilter, setActiveFilter] = useState("Otel");

  // Filter categories
  const categories = ["Otel", "Villa", "Daire", "Oda"];

  return (
    <section className="w-full mx-auto px-24 py-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        {/* Title and Filters */}
        <div className="flex-1">
          <h2 className="text-4xl font-opensans font-bold text-gray-900 mb-12">
            Özel Fırsatlar
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-xl text-sm font-opensans font-semibold transition-colors cursor-pointer ${
                  activeFilter === category
                    ? "bg-[#2F6FED] text-white"
                    : "bg-white text-[#2F6FED] hover:bg-[#2F6FED] hover:text-white border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* See All Link */}
        <div className="mt-6 lg:mt-0">
          <Link
            href="./products"
            className="flex items-center gap-2 text-lg text-[#2F6FED] font-opensans font-semibold mt-22"
          >
            Tümünü Gör
            <ArrowUpRight className="w-6 h-6 text-[#2F6FED]" />
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {specialOffersData.map((offer) => (
          <HotelCard
            key={offer.id}
            image={offer.image}
            title={offer.title}
            location={offer.location}
            price={offer.price}
            rating={offer.rating}
            reviews={offer.reviews}
            tag={offer.tag}
            amenities={offer.amenities}
          />
        ))}
      </div>
    </section>
  );
}

export default SpecialOffersSection;
