import HotelFilters from "@/components/filters/HotelFilters";
import Pagination from "@/components/filters/Pagination";
import DatePicker from "@/components/forms/DatePicker";
import HotelsList from "@/components/products-page/HotelsList";
import Image from "next/image";
import React from "react";

function ProductPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex justify-center items-center my-36">
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <Image
              src="/images/mappa-product.png"
              alt="World Map Background"
              width={802}
              height={355}
              className="object-contain"
            />
          </div>

          {/* DatePicker Component */}
          <DatePicker />
        </div>
      </div>

      {/* Hotel Filters and Hotels List Section */}
      <div className="px-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Hotel Filters */}
          <HotelFilters />
          {/* Hotels List and Pagination - Flexible width on right */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-6">
              <HotelsList />
              <div className="flex justify-end mb-10">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
