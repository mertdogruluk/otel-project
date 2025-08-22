"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import OfferCard from './OfferCard';

// Sample data for special offers
const specialOffersData = [
  {
    id: 1,
    image: "/images/riad-deluxe-hotel-img-1.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 2,
    image: "/images/riad-deluxe-hotel-img-2.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: null,
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 3,
    image: "/images/riad-deluxe-hotel-img-3.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: null,
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 4,
    image: "/images/riad-deluxe-hotel-img-4.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 5,
    image: "/images/riad-deluxe-hotel-img-5.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 6,
    image: "/images/riad-deluxe-hotel-img-6.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 7,
    image: "/images/riad-deluxe-hotel-img-7.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: "%20 indirim",
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  },
  {
    id: 8,
    image: "/images/riad-deluxe-hotel-img-8.png",
    title: "Riad Deluxe Hotel",
    location: "Marakeş, Fas",
    price: "40.000 TL",
    rating: 4.7,
    reviews: 120,
    tag: null,
    amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"]
  }
];

function SpecialOffersSection() {
  const [activeFilter, setActiveFilter] = useState('Otel');

  // Filter categories
  const categories = ['Otel', 'Villa', 'Daire', 'Oda'];

  return (
    <section className="w-full mx-auto px-24 py-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        {/* Title and Filters */}
        <div className="flex-1">
          <h2 className="text-4xl font-opensans font-bold text-gray-900 mb-6">Özel Fırsatlar</h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* See All Link */}
        <div className="mt-6 lg:mt-0">
          <Link href="/special-offers" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Tümünü Gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {specialOffersData.map((offer) => (
          <OfferCard
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
  )
}

export default SpecialOffersSection;