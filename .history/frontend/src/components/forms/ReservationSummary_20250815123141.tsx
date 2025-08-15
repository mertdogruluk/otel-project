import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { XCircle, Coffee, Car } from "lucide-react"
import Rating from "@/components/forms/Rating"



const ReservationSummary: React.FC = () => {
  return (
    <div>
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <Image 
        src="/Placeholder image.png"
        alt=""
        width={128}
        height={128}
        className="rounded-lg w-full h-96 object-cover"
      /> <h2 className="text-lg font-bold">Riad Deluxe</h2>
         <p className="text-sm text-gray-600">Marakeş,Fas</p>

       export default function App() 
     return (
    <div className="p-4">
      <h2 className="mb-2 font-bold">Otel Puanı:</h2>
      <Rating value={4.7} size={20} />
    </div>
  )






        <Badge className="mr-2 bg-red-100 text-red-800">
         <XCircle size={14} className="mr-1" /> Ücretsiz iptal
        </Badge>

        <Badge className="mr-2 bg-green-100 text-green-800">
            <Coffee size={14} className="mr-1" /> Kahvaltı dahil
       </Badge>

        <Badge className="bg-blue-100 text-blue-800">
         <Car size={14} className="mr-1" /> Otopark
        </Badge>
        </div>

        

      <div>
        
        <p className="text-sm text-gray-600">
          Deluxe Room / 4 gece, 2 misafir
        </p>
        </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>4 Gece</span>
          <span>30.000 TL</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Vergiler ve Hizmet Bedeli</span>
          <span>10.500 TL</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Toplam</span>
          <span className="text-blue-600">40.500 TL</span>
        </div>
      </div>
    
    </div>
  );
};

export default ReservationSummary;
