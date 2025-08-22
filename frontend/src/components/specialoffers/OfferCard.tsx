import React from 'react'
import Image from 'next/image'
import { Star, MapPin, Heart, Eye, Coffee, Car } from 'lucide-react'

// Props interface for OfferCard
interface OfferCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  tag: string | null;
  amenities: string[];
}

function OfferCard({ image, title, location, price, rating, reviews, tag, amenities }: OfferCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        
        {/* Discount Tag */}
        {tag && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
            <span>✨</span>
            {tag}
          </div>
        )}
        
        {/* Favorite Icon */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        
        {/* Location and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900">{rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">({reviews})</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                index === 0
                  ? 'bg-red-100 text-red-700'
                  : index === 1
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              <div className="flex items-center gap-1">
                {index === 0 && <Eye className="w-3 h-3" />}
                {index === 1 && <Coffee className="w-3 h-3" />}
                {index === 2 && <Car className="w-3 h-3" />}
                {amenity}
              </div>
            </div>
          ))}
        </div>

        {/* Price and Action Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">4 gece için</p>
            <p className="text-xl font-bold text-blue-600">{price}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            Detaylı İncele
          </button>
        </div>
      </div>
    </div>
  )
}

export default OfferCard;