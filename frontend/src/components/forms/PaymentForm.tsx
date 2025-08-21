import React from "react";

const PaymentForm: React.FC = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Son Kullanma Tarihi
          </label>
          <input
            type="text"
            className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="text"
            className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kart Numarası</label>
        <input
          type="text"
          className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Adres</label>
        <input
          type="text"
          className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ülke/Bölge</label>
        <input
          type="text"
          className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Telefon Numarası
        </label>
        <input
          type="text"
          className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Özel İstek</label>
        <input
          type="text"
          className="w-full border border-[rgba(0,0,0,0.2)] rounded p-2 h-24"
        />
      </div>

      <button
        type="button"
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
      >
        İptal
      </button>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded "
      >
        Ödeme İşlemini Tamamla
      </button>
    </form>
  );
};

export default PaymentForm;
