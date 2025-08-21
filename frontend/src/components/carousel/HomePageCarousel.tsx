import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

function HomePageCarousel() {
  return (
    <div className="flex justify-center -mt-14">
      <div className="w-full mx-16 mt-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
        >
          <CarouselContent>
            {[1, 2, 3, 4].map((i) => (
              <CarouselItem key={i} className="basis-full">
                <div className="relative w-full h-[520px]">
                  <Image
                    src={`/images/carousel-img-${i}.jpg`}
                    alt={`Carousel image ${i}`}
                    fill
                    className="rounded-4xl object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default HomePageCarousel;
