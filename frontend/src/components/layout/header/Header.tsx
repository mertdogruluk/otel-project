import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellDot, Globe, Heart, Mic, Moon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  return (
    <header className="bg-white shadow-md px-24 py-5">
      <div className="flex justify-between items-center mx-auto flex-wrap">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/images/hotel-img.png"
              width={35}
              height={25}
              alt="hotel"
            />
            <p className="text-2xl font-bold pt-2">StayEase</p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-[388px] h-[50px] mx-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
            size={20}
          />
          <Input
            type="text"
            placeholder="Otel, Pansiyon, Kiralık daire Ara"
            className="w-full h-full pl-10 pr-10"
          />
          <Mic
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer"
            size={20}
          />
        </div>

        {/* Navbar Links */}
        <nav>
          <div className="flex flex-row gap-1">
            <Link href="/">
              <Button variant="ghost" className="cursor-pointer">
                <Heart className="w-6 h-6 text-[#486284]" />
              </Button>
            </Link>

            <Link href="/">
              <Button variant="ghost" className="cursor-pointer">
                <BellDot className="w-6 h-6 text-[#486284]" />
              </Button>
            </Link>

            <Link href="/">
              <Button variant="ghost" className="cursor-pointer">
                <Moon className="w-6 h-6 text-[#486284]" />
              </Button>
            </Link>

            <Link href="/">
              <div className="flex items-center">
                <Button variant="ghost" className="cursor-pointer">
                  <Globe className="w-6 h-6 text-[#486284]" />
                  <span className="text-[#486284]">EN</span>
                </Button>
              </div>
            </Link>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src="/images/user-image.png"
                  width={35}
                  height={35}
                  alt="user"
                  className="cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
