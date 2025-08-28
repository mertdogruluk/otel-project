import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart, Home, Upload } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { HotelData } from "@/types/hotel";

interface ProductHeaderProps {
  hotel?: HotelData;
}

function ProductHeader({ hotel }: ProductHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      {/* Breadcrumbs and Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <div className="flex flex-row items-center gap-2">
                  <Home className="w-4 h-4" />
                  Ana Sayfa
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Otel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-blue-600">
                {hotel?.title || "Otel Detayı"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Favorites and Share Buttons */}
        <div className="flex items-center space-x-6">
          {/* Favorite Button */}
          <Button
            onClick={toggleFavorite}
            className="w-10 h-10 bg-white hover:bg-white flex items-center justify-center cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-current" : "text-gray-500"
              }`}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>

          {/* Share Button */}
          <Button className="w-10 h-10 bg-white hover:bg-white flex items-center justify-center cursor-pointer">
            <Upload className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductHeader;
