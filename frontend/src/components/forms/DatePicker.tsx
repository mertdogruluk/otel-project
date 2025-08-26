"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Search,
  MapPin,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Types for the component
interface PersonCount {
  adults: number;
  children: number;
}

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

// Dropdown states for animation and styling
interface DropdownStates {
  city: boolean;
  checkIn: boolean;
  checkOut: boolean;
  personCount: boolean;
}

function DatePicker() {
  // State management
  const [personCount, setPersonCount] = useState<PersonCount>({
    adults: 1,
    children: 0,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    checkIn: null,
    checkOut: null,
  });
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Dropdown states for animations and styling
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    city: false,
    checkIn: false,
    checkOut: false,
    personCount: false,
  });

  // Popular cities data
  const popularCities = [
    { name: "Istanbul", region: "Istanbul, Türkiye", icon: MapPin },
    { name: "Paris", region: "Île de France, France", icon: MapPin },
    {
      name: "Marseille",
      region: "Provence-Alpes-Côte d'Azur, France",
      icon: MapPin,
    },
    { name: "Rabat", region: "Rabat-Salé, Fas", icon: MapPin },
  ];

  // Person count handlers
  const updatePersonCount = (
    type: "adults" | "children",
    operation: "increment" | "decrement"
  ) => {
    setPersonCount((prev) => {
      const newValue =
        operation === "increment" ? prev[type] + 1 : prev[type] - 1;
      if (type === "adults" && newValue < 1) return prev; // Adults cannot be less than 1
      if (type === "children" && newValue < 0) return prev; // Children cannot be less than 0
      return { ...prev, [type]: newValue };
    });
  };

  // Calendar navigation
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  // Generate calendar days
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    // const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }
    return days;
  };

  // Check if date is in range
  const isDateInRange = (date: Date) => {
    if (!dateRange.checkIn || !dateRange.checkOut) return false;
    return date >= dateRange.checkIn && date <= dateRange.checkOut;
  };

  // Check if date is start/end date
  const isDateStartOrEnd = (date: Date) => {
    if (!dateRange.checkIn || !dateRange.checkOut) return false;
    return (
      date.getTime() === dateRange.checkIn.getTime() ||
      date.getTime() === dateRange.checkOut.getTime()
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (!dateRange.checkIn || (dateRange.checkIn && dateRange.checkOut)) {
      // First selection or new selection
      setDateRange({ checkIn: date, checkOut: null });
    } else {
      // Second selection
      if (date > dateRange.checkIn!) {
        setDateRange({ checkIn: dateRange.checkIn, checkOut: date });
      } else {
        setDateRange({ checkIn: date, checkOut: dateRange.checkIn });
      }
    }
  };

  // Handle dropdown state changes
  const handleDropdownChange = (
    dropdownName: keyof DropdownStates,
    isOpen: boolean
  ) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdownName]: isOpen,
    }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="grid-cols-5 flex items-center justify-center gap-8">
          {/* City Search */}
          <div className="flex flex-col border-r border-gray-200 pr-8">
            <CardTitle
              className={`font-montserrat font-bold transition-colors duration-200 ${
                dropdownStates.city ? "text-blue-600" : "text-gray-900"
              }`}
            >
              Şehir
            </CardTitle>
            <CardDescription>
              <DropdownMenu
                onOpenChange={(open) => handleDropdownChange("city", open)}
              >
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-24 mt-2 cursor-pointer">
                    <p className="font-normal">{selectedCity || "Ara"}</p>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        dropdownStates.city ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Popüler aramalar
                    </h3>
                    <div className="space-y-3">
                      {popularCities.map((city, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedCity(city.name)}
                        >
                          <city.icon className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">
                              {city.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {city.region}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardDescription>
          </div>

          {/* Check-in Date */}
          <div className="flex flex-col border-r border-gray-200 pr-8">
            <CardTitle
              className={`font-montserrat font-bold transition-colors duration-200 ${
                dropdownStates.checkIn ? "text-blue-600" : "text-gray-900"
              }`}
            >
              Giriş Tarihi
            </CardTitle>
            <CardDescription>
              <DropdownMenu
                onOpenChange={(open) => handleDropdownChange("checkIn", open)}
              >
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-5 mt-2 cursor-pointer">
                    <p className="font-normal">
                      {dateRange.checkIn
                        ? dateRange.checkIn.toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                          })
                        : "Tarih Seçin"}
                    </p>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        dropdownStates.checkIn ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[600px] p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">
                        Giriş tarihi seçin
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateMonth("prev")}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateMonth("next")}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {/* Current Month */}
                      <div>
                        <h4 className="text-center font-medium text-gray-700 mb-3">
                          {currentMonth.toLocaleDateString("tr-TR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h4>
                        <div className="grid grid-cols-7 gap-1">
                          {["Su", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map(
                            (day) => (
                              <div
                                key={day}
                                className="text-center text-sm text-gray-500 py-2"
                              >
                                {day}
                              </div>
                            )
                          )}
                          {generateCalendarDays(currentMonth).map(
                            (date, index) => {
                              const isCurrentMonth =
                                date.getMonth() === currentMonth.getMonth();
                              const isInRange = isDateInRange(date);
                              const isStartOrEnd = isDateStartOrEnd(date);

                              return (
                                <button
                                  key={index}
                                  onClick={() => handleDateSelect(date)}
                                  className={`
                                  w-8 h-8 rounded-full text-sm transition-colors
                                  ${!isCurrentMonth ? "text-gray-300" : ""}
                                  ${
                                    isStartOrEnd ? "bg-blue-600 text-white" : ""
                                  }
                                  ${
                                    isInRange && !isStartOrEnd
                                      ? "bg-blue-100 text-blue-600"
                                      : ""
                                  }
                                  ${
                                    isCurrentMonth && !isInRange
                                      ? "hover:bg-gray-100 text-gray-700"
                                      : ""
                                  }
                                `}
                                >
                                  {date.getDate()}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Next Month */}
                      <div>
                        <h4 className="text-center font-medium text-gray-700 mb-3">
                          {new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          ).toLocaleDateString("tr-TR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h4>
                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1
                            )
                          ).map((date, index) => {
                            const isCurrentMonth =
                              date.getMonth() ===
                              (currentMonth.getMonth() + 1) % 12;
                            const isInRange = isDateInRange(date);
                            const isStartOrEnd = isDateStartOrEnd(date);

                            return (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(date)}
                                className={`
                                  w-8 h-8 rounded-full text-sm transition-colors
                                  ${!isCurrentMonth ? "text-gray-300" : ""}
                                  ${
                                    isStartOrEnd ? "bg-blue-600 text-white" : ""
                                  }
                                  ${
                                    isInRange && !isStartOrEnd
                                      ? "bg-blue-100 text-blue-600"
                                      : ""
                                  }
                                  ${
                                    isCurrentMonth && !isInRange
                                      ? "hover:bg-gray-100 text-gray-700"
                                      : ""
                                  }
                                `}
                              >
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardDescription>
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col border-r border-gray-200 pr-8">
            <CardTitle
              className={`font-montserrat font-bold transition-colors duration-200 ${
                dropdownStates.checkOut ? "text-blue-600" : "text-gray-900"
              }`}
            >
              Çıkış Tarihi
            </CardTitle>
            <CardDescription>
              <DropdownMenu
                onOpenChange={(open) => handleDropdownChange("checkOut", open)}
              >
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-5 mt-2 cursor-pointer">
                    <p className="font-normal">
                      {dateRange.checkOut
                        ? dateRange.checkOut.toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                          })
                        : "Tarih Seçin"}
                    </p>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        dropdownStates.checkOut ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[600px] p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">
                        Çıkış tarihi seçin
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateMonth("prev")}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateMonth("next")}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {/* Current Month */}
                      <div>
                        <h4 className="text-center font-medium text-gray-700 mb-3">
                          {currentMonth.toLocaleDateString("tr-TR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h4>
                        <div className="grid grid-cols-7 gap-1">
                          {["Su", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map(
                            (day) => (
                              <div
                                key={day}
                                className="text-center text-sm text-gray-500 py-2"
                              >
                                {day}
                              </div>
                            )
                          )}
                          {generateCalendarDays(currentMonth).map(
                            (date, index) => {
                              const isCurrentMonth =
                                date.getMonth() === currentMonth.getMonth();
                              const isInRange = isDateInRange(date);
                              const isStartOrEnd = isDateStartOrEnd(date);

                              return (
                                <button
                                  key={index}
                                  onClick={() => handleDateSelect(date)}
                                  className={`
                                  w-8 h-8 rounded-full text-sm transition-colors
                                  ${!isCurrentMonth ? "text-gray-300" : ""}
                                  ${
                                    isStartOrEnd ? "bg-blue-600 text-white" : ""
                                  }
                                  ${
                                    isInRange && !isStartOrEnd
                                      ? "bg-blue-100 text-blue-600"
                                      : ""
                                  }
                                  ${
                                    isCurrentMonth && !isInRange
                                      ? "hover:bg-gray-100 text-gray-700"
                                      : ""
                                  }
                                `}
                                >
                                  {date.getDate()}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Next Month */}
                      <div>
                        <h4 className="text-center font-medium text-gray-700 mb-3">
                          {new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          ).toLocaleDateString("tr-TR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h4>
                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1
                            )
                          ).map((date, index) => {
                            const isCurrentMonth =
                              date.getMonth() ===
                              (currentMonth.getMonth() + 1) % 12;
                            const isInRange = isDateInRange(date);
                            const isStartOrEnd = isDateStartOrEnd(date);

                            return (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(date)}
                                className={`
                                  w-8 h-8 rounded-full text-sm transition-colors
                                  ${!isCurrentMonth ? "text-gray-300" : ""}
                                  ${
                                    isStartOrEnd ? "bg-blue-600 text-white" : ""
                                  }
                                  ${
                                    isInRange && !isStartOrEnd
                                      ? "bg-blue-100 text-blue-600"
                                      : ""
                                  }
                                  ${
                                    isCurrentMonth && !isInRange
                                      ? "hover:bg-gray-100 text-gray-700"
                                      : ""
                                  }
                                `}
                              >
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardDescription>
          </div>

          {/* Person Count */}
          <div className="flex flex-col pr-8">
            <CardTitle
              className={`font-montserrat font-bold transition-colors duration-200 ${
                dropdownStates.personCount ? "text-blue-600" : "text-gray-900"
              }`}
            >
              Kişi Sayısı
            </CardTitle>
            <CardDescription>
              <DropdownMenu
                onOpenChange={(open) =>
                  handleDropdownChange("personCount", open)
                }
              >
                <DropdownMenuTrigger>
                  <div className="flex flex-row gap-5 mt-2 cursor-pointer">
                    <p className="font-normal">
                      {personCount.adults + personCount.children} Kişi
                    </p>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        dropdownStates.personCount ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Popüler aramalar
                    </h3>

                    {/* Adults Counter */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          Yetişkin 16+ yaş
                        </p>
                      </div>
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updatePersonCount("adults", "decrement")
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center border-x border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {personCount.adults}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            updatePersonCount("adults", "increment")
                          }
                          className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-gray-50 rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Children Counter */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          Çocuk 0-16 yaş
                        </p>
                      </div>
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updatePersonCount("children", "decrement")
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center border-x border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {personCount.children}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            updatePersonCount("children", "increment")
                          }
                          className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-gray-50 rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardDescription>
          </div>

          {/* Search Button */}
          <Button className="bg-[#2F6FED] hover:bg-[#2F6FED]/80 text-white rounded-xl flex items-center justify-center gap-2 w-26 h-13 cursor-pointer">
            <Search className="w-8 h-8" />
            <span className="font-semibold">Ara</span>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default DatePicker;
