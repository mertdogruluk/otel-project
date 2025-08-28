import { HotelData } from "@/types/hotel";
import { BedDouble, Sofa, Bath, Refrigerator, Wifi, Tv } from "lucide-react";

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
      { id: 6, text: "Televizyon", value: "1" }
    ]
  };

  // Use hotel facilities if available, otherwise use default data
  const data = hotelData?.facilities ? {
    ozellikler: hotelData.facilities.slice(0, 6).map((facility, index) => ({
      id: index + 1,
      text: facility,
      value: ""
    }))
  } : defaultData;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Özellikler</h3>
      <div className="grid grid-cols-3 gap-4">
        {data.ozellikler.map((feature) => {
          let IconComponent = null;
          switch (feature.text) {
            case "Çift Kişilik Yatak":
              IconComponent = BedDouble;
              break;
            case "Oturma alanı":
              IconComponent = Sofa;
              break;
            case "Banyo":
              IconComponent = Bath;
              break;
            case "Minibar":
              IconComponent = Refrigerator;
              break;
            case "Wi Fi":
              IconComponent = Wifi;
              break;
            case "Televizyon":
              IconComponent = Tv;
              break;
            default:
              IconComponent = null;
          }
          return (
            <div
              key={feature.id}
              className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors h-full min-h-[130px]"
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                {IconComponent && <IconComponent className="w-8 h-8 text-blue-600 mb-4" />}
                <div className="text-base font-semibold text-gray-800 text-center leading-tight">
                  {feature.value && <span className="font-bold text-blue-600 mr-1">{feature.value}</span>}
                  {feature.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}