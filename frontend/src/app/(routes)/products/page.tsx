import HotelFilters from "@/components/filters/HotelFilters";
import Pagination from "@/components/filters/Pagination";
import DatePicker from "@/components/forms/DatePicker";
import HotelsList from "@/components/hotels/HotelsList";
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
      <div className="flex flex-row justify-between gap-4">
        {/* Hotel Filters */}
        <div className="mb-10 px-16">
          <HotelFilters />
        </div>

        {/* Hotels List and Pagination */}
        <div className="flex flex-col gap-4">
          <HotelsList />
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
