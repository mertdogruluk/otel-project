import React from 'react'

function HomePage() {
  return (
    <div
      className="pt-9 bg-[url('/images/map-img.png')] bg-cover bg-center bg-no-repeat h-[500px] flex flex-col justify-center items-center"
    >
      <h1 className="font-opensans font-bold text-[44px] text-center text-white drop-shadow-lg">
        Hayalinizdeki Konaklama Bir Tık Uzağınızda
      </h1>
      <h2 className="font-opensans font-bold text-[20px] text-center text-[#E5E5E5] pt-3 drop-shadow-md">
        Sevdiğiniz destinasyonlarda, en cazip fiyatlarla konaklama seçeneklerini keşfedin.
      </h2>
    </div>
  )
}

export default HomePage;