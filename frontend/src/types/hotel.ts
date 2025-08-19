export interface OtelOzellik {
  id: number;
  icon: string;
  text: string;
  value?: string;
}

export interface OtelData {
  id: string;
  isim: string;
  konum: string;
  puan: number;
  yorumSayisi: number;
  fiyat: number;
  paraBirimi: string;
  geceSayisi: number;
  girisTarihi: string;
  cikisTarihi: string;
  kisiSayisi: number;
  ozellikler: OtelOzellik[];
}

export const otelVerisi: OtelData = {
  id: "1",
  isim: "Riad Deluxe Hotel",
  konum: "Marakeş, Fas",
  puan: 4.7,
  yorumSayisi: 120,
  fiyat: 40500,
  paraBirimi: "TL",
  geceSayisi: 4,
  girisTarihi: "18/07/2025",
  cikisTarihi: "22/07/2025",
  kisiSayisi: 1,
  ozellikler: [
    {
      id: 1,
      icon: "🛏️",
      text: "Çift Kişilik Yatak",
      value: "2"
    },
    {
      id: 2,
      icon: "🛋️",
      text: "Oturma alanı",
      value: "1"
    },
    {
      id: 3,
      icon: "🛁",
      text: "Banyo",
      value: "2"
    },
    {
      id: 4,
      icon: "🧊",
      text: "Minibar",
      value: "1"
    },
    {
      id: 5,
      icon: "📶",
      text: "Wi Fi"
    },
    {
      id: 6,
      icon: "📺",
      text: "Televizyon",
      value: "1"
    }
  ]
};
