import React from "react";
import { Button } from "../ui/button";
import {
  BungalowIcon,
  HomeIcon,
  HotelIcon,
  RoomIcon,
  VillaIcon,
} from "../icons";
import Link from "next/link";
import { BedSingle, Tent, TentTree } from "lucide-react";

function PopularCategories() {
  return (
    <div className="flex flex-row gap-4">
      {/* Button - 1 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <HomeIcon className="w-6 h-6" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Daire</span>
        </Button>
      </Link>

      {/* Button - 2 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <HotelIcon className="w-6 h-6" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Hotel</span>
        </Button>
      </Link>

      {/* Button - 3 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <VillaIcon className="w-6 h-6" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Villa</span>
        </Button>
      </Link>

      {/* Button - 4 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <BungalowIcon className="w-6 h-6" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Bungalow</span>
        </Button>
      </Link>

      {/* Button - 5 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <RoomIcon className="w-6 h-6" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Oda</span>
        </Button>
      </Link>

      {/* Button - 6 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
          <TentTree className="w-6 h-6 text-black" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Tatil Köyü</span>
        </Button>
      </Link>

      {/* Button - 7 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <BedSingle className="w-6 h-6 text-black" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Pansiyon</span>
        </Button>
      </Link>

      {/* Button - 8 Section */}
      <Link href="/">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-full px-5 py-8 flex items-center gap-2 cursor-pointer">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <Tent className="w-6 h-6 text-black" />
          </span>
          <span className="text-base font-opensans font-semibold text-black">Kamp</span>
        </Button>
      </Link>
    </div>
  );
}

export default PopularCategories;
