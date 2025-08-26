"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterState {
  categories: string[];
  locations: string[];
  ratings: number[];
  priceRange: [number, number];
  amenities: string[];
}

function HotelFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    locations: [],
    ratings: [],
    priceRange: [250, 10000],
    amenities: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    location: true,
    rating: true,
    price: true,
    amenities: true,
  });

  // Category options with counts
  const categoryOptions = [
    { label: "Otel", value: "hotel", count: 128 },
    { label: "Kiralık daire", value: "apartment", count: 18 },
    { label: "Villa", value: "villa", count: 65 },
    { label: "Bungalov", value: "bungalow", count: 12 },
    { label: "Hostel", value: "hostel", count: 19 },
    { label: "Pansiyon", value: "pension", count: 7 },
  ];

  // Location & View options
  const locationOptions = [
    { label: "Şehir merkezi", value: "city_center" },
    { label: "Sahil kenarı", value: "beachfront" },
    { label: "Denize sıfır", value: "seafront" },
    { label: "Orman içinde", value: "forest" },
    { label: "Dağ manzarası", value: "mountain_view" },
    { label: "Turistik bölge", value: "tourist_area" },
    { label: "Havaalanına yakın", value: "near_airport" },
    { label: "Toplu taşımaya yakın", value: "near_transport" },
  ];

  // Rating options with counts
  const ratingOptions = [
    { stars: 5, count: 128 },
    { stars: 4, count: 18 },
    { stars: 3, count: 65 },
    { stars: 2, count: 12 },
    { stars: 1, count: 19 },
  ];

  // Amenity options
  const amenityOptions = [
    { label: "Klima", value: "ac" },
    { label: "Mutfak ekipmanları", value: "kitchen" },
    { label: "Güvenlik", value: "security" },
    { label: "Otopark", value: "parking" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "Asansör", value: "elevator" },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      locations: checked
        ? [...prev.locations, location]
        : prev.locations.filter((l) => l !== location),
    }));
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      ratings: checked
        ? [...prev.ratings, rating]
        : prev.ratings.filter((r) => r !== rating),
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      locations: [],
      ratings: [],
      priceRange: [250, 10000],
      amenities: [],
    });
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < count ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={{ width: "345px" }}>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold font-opensans text-gray-900 ml-7">
          Filtreler
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-[#2F6FED] hover:text-[#2F6FED] text-sm rounded-full border-1 border-gray-200 cursor-pointer"
        >
          Temizle
        </Button>
      </div>

      {/* Filter Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col space-y-[30px] [&>*:not(:last-child)]:relative [&>*:not(:last-child)]:after:content-[''] [&>*:not(:last-child)]:after:absolute [&>*:not(:last-child)]:after:left-0 [&>*:not(:last-child)]:after:right-0 [&>*:not(:last-child)]:after:top-[calc(100%+15px)] [&>*:not(:last-child)]:after:h-px [&>*:not(:last-child)]:after:bg-gray-200">
          {/* Category Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-bold font-opensans text-gray-900">
                Kategori
              </h3>
              {expandedSections.category ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedSections.category && (
              <div className="space-y-3">
                {categoryOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="border-blue-500"
                        id={option.value}
                        checked={filters.categories.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(option.value, !!checked)
                        }
                      />
                      <label
                        htmlFor={option.value}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({option.count})
                    </span>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-white text-sm p-0 h-auto cursor-pointer underline"
                >
                  Daha fazla
                </Button>
              </div>
            )}
          </div>

          {/* Location & View Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection("location")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-bold font-opensans text-gray-900">
                Konum & Manzara
              </h3>
              {expandedSections.location ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedSections.location && (
              <div className="space-y-3">
                {locationOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      className="border-blue-500"
                      id={option.value}
                      checked={filters.locations.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleLocationChange(option.value, !!checked)
                      }
                    />
                    <label
                      htmlFor={option.value}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection("rating")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-bold font-opensans text-gray-900">
                Değerlendirme
              </h3>
              {expandedSections.rating ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedSections.rating && (
              <div className="space-y-3">
                {ratingOptions.map((option) => (
                  <div
                    key={option.stars}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="border-blue-500"
                        id={`rating-${option.stars}`}
                        checked={filters.ratings.includes(option.stars)}
                        onCheckedChange={(checked) =>
                          handleRatingChange(option.stars, !!checked)
                        }
                      />
                      <label
                        htmlFor={`rating-${option.stars}`}
                        className="flex items-center space-x-1 cursor-pointer"
                      >
                        <span className="text-sm text-gray-700 font-bold">
                          {option.stars}
                        </span>
                        <div className="flex">{renderStars(option.stars)}</div>
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({option.count})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-bold font-opensans text-gray-900">
                Fiyat
              </h3>
              {expandedSections.price ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-700 font-semibold">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: value as [number, number],
                    }))
                  }
                  max={10000}
                  min={250}
                  step={50}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Amenities Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection("amenities")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-bold font-opensans text-gray-900">
                Diğer
              </h3>
              {expandedSections.amenities ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedSections.amenities && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {amenityOptions.map((amenity) => (
                    <Badge
                      key={amenity.value}
                      variant={
                        filters.amenities.includes(amenity.value)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer px-3 py-2 rounded-full transition-colors ${
                        filters.amenities.includes(amenity.value)
                          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        handleAmenityChange(
                          amenity.value,
                          !filters.amenities.includes(amenity.value)
                        )
                      }
                    >
                      {amenity.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelFilters;
