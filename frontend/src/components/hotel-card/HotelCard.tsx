import Image from "next/image";
import Link from "next/link";

interface OtelKartiProps {
  id: string;
  isim: string;
  konum: string;
  puan: number;
  yorumSayisi: number;
  fiyat: number;
  paraBirimi: string;
  geceSayisi: number;
  imageSrc: string;
  width?: string;
  height?: string;
}

export default function OtelKarti({
  id,
  isim,
  konum,
  puan,
  yorumSayisi,
  fiyat,
  paraBirimi,
  geceSayisi,
  imageSrc,
  width = "w-full",
  height = "h-auto"
}: OtelKartiProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${width} ${height}`}>
      {/* Görsel */}
      <div className="relative h-56 w-full">
        <Image
          src={imageSrc}
          alt={isim}
          fill
          className="object-cover"
        />
        {/* İndirim Badge */}
        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          %20 indirim
        </div>
        {/* Favori Butonu */}
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* İçerik */}
      <div className="p-5">
        {/* Otel Adı ve Konum */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{isim}</h3>
        <p className="text-sm text-gray-600 mb-4">{konum}</p>

        {/* Puanlama */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(puan) ? 'fill-current' : 'fill-gray-300'}`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm font-semibold text-gray-700">{puan}</span>
          <span className="ml-1 text-sm text-gray-500">({yorumSayisi})</span>
        </div>

        {/* Özellik Etiketleri */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
            Ücretsiz iptal
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
            Kahvaltı dahil
          </span>
          <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
            Otopark
          </span>
        </div>

        {/* Fiyat ve Buton */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {fiyat.toLocaleString('tr-TR')} {paraBirimi}
            </span>
            <span className="text-sm text-gray-600 ml-1">
              /{geceSayisi} gece
            </span>
          </div>
          <Link href={`/otel/${id}`} className="block">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
              Detaylı İncele
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
