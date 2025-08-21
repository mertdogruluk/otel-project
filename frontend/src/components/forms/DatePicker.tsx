import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Search } from "lucide-react";

function DatePicker() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="grid grid-cols-5 gap-7">
          {/* Card Menu - 1 */}
          <div className="flex flex-col border-r border-gray-200 pr-7">
            <CardTitle className="font-montserrat font-bold">Şehir</CardTitle>
            <CardDescription>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-24 mt-2">
                    <p className="font-normal">Ara</p>
                    <ChevronDown className="w-5 h-5" />
                  </div>
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
            </CardDescription>
          </div>

          {/* Card Menu - 2 */}
          <div className="flex flex-col border-r border-gray-200 pr-7">
            <CardTitle className="font-montserrat font-bold">
              Giriş Tarihi
            </CardTitle>
            <CardDescription>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-5 mt-2">
                    <p className="font-normal">18 Temmuz</p>
                    <ChevronDown className="w-5 h-5" />
                  </div>
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
            </CardDescription>
          </div>

          {/* Card Menu - 3 */}
          <div className="flex flex-col border-r border-gray-200 pr-7">
            <CardTitle className="font-montserrat font-bold">
              Çıkış Tarihi
            </CardTitle>
            <CardDescription>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-5 mt-2">
                    <p className="font-normal">22 Temmuz</p>
                    <ChevronDown className="w-5 h-5" />
                  </div>
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
            </CardDescription>
          </div>

          {/* Card Menu - 4 */}
          <div className="flex flex-col">
            <CardTitle className="font-montserrat font-bold">
              Kişi Sayısı
            </CardTitle>
            <CardDescription>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-5 mt-2">
                    <p className="font-normal">Kişi Ekleyin</p>
                    <ChevronDown className="w-5 h-5" />
                  </div>
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
            </CardDescription>
          </div>

          {/* Card Menu Button */}
          <div className="flex flex-col">
            <Button variant="datepicker" size="searchbtn">
              <Search className="w-4 h-4" />
              Ara
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default DatePicker;
