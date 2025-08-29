import { HotelData } from "@/types/hotel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface HotelFeaturesProps {
  hotelData?: HotelData;
}

export default function HotelFeatures({ hotelData }: HotelFeaturesProps) {
  // Default data for demo purposes
  const defaultData = {
    ozellikler: [
      { id: 1, text: "Çift Kişilik Yatak", value: "2" },
      { id: 2, text: "Oturma alanı", value: "1" },
      { id: 3, text: "Banyo", value: "2" },
      { id: 4, text: "Minibar", value: "1" },
      { id: 5, text: "Wi Fi", value: "" },
      { id: 6, text: "Televizyon", value: "1" },
    ],
  };

  // Use hotel facilities if available, otherwise use default data
  const data = hotelData?.facilities
    ? {
        ozellikler: hotelData.facilities.slice(0, 6).map((facility, index) => ({
          id: index + 1,
          text: facility,
          value: "",
        })),
      }
    : defaultData;

  // Fixed six feature cards with specific icons and texts as requested
  const fixedFeatures: { id: number; icon: string; text: string }[] = [
    { id: 1, icon: "/images/bedroom-icon.png", text: "2 Çift Kişilik Yatak" },
    { id: 2, icon: "/images/sofa-icon.png", text: "1 Oturma alanı" },
    { id: 3, icon: "/images/bathub-icon.png", text: "2 Banyo" },
    { id: 4, icon: "/images/refrigerator-icon.png", text: "1 Minibar" },
    { id: 5, icon: "/images/wifi-icon.png", text: "Wi Fi" },
    { id: 6, icon: "/images/television-icon.png", text: "1 Televizyon" },
  ];

  return (
    <div className="w-full mt-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Özellikler</h3>
      <div className="grid grid-cols-3 gap-4">
        {fixedFeatures.map((feature) => (
          <Card
            key={feature.id}
            className="rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <CardContent className="p-6 h-[130px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.text}
                  width={32}
                  height={32}
                  className="mb-4 opacity-80"
                />
                <div className="text-base font-opensans font-medium text-[#666666] text-center leading-tight">
                  {feature.text}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
