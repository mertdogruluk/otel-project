import { OtelData } from "@/types/hotel";
import { BedDouble, Sofa, Bath, Refrigerator, Wifi, Tv } from "lucide-react";

interface OzelliklerGridProps {
  otelData?: OtelData;
}

export default function OzelliklerGrid({ otelData }: OzelliklerGridProps) {
  if (!otelData) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Özellikler</h3>
      <div className="grid grid-cols-3 gap-3">
        {otelData.ozellikler.map((ozellik) => {
          let IconComponent = null;
          switch (ozellik.text) {
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
              key={ozellik.id}
              className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors h-full min-h-[110px]"
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                {IconComponent && <IconComponent className="w-7 h-7 text-blue-600 mb-3" />}
                <div className="text-sm font-semibold text-gray-800 text-center leading-tight">
                  {ozellik.value && <span className="font-bold text-blue-600 mr-1">{ozellik.value}</span>}
                  {ozellik.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}