import React, { useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

function CarouselPage() {
  const images = [
    "/banners/img-1.png",
    "/banners/img-2.png",
    "/banners/img-3.png",
    "/banners/img-4.png",
  ];

  return (
    <div className="w-full h-[calc(100vh-5rem)] relative z-[2]">
      <Splide
        tag="section"
        aria-label="Select a slide to show"
        options={{
          autoplay: true,
          arrows: false,
          interval: 5000,
          rewind: true,
          lazyLoad: "sequential",
          pagination: true,
        }}
        hasTrack={false}
      >
        <ul
          className="splide__pagination splide__pagination--ltr flex absolute -translate-y-[5.5rem]"
          role="tablist"
          aria-label="Select a slide to show"
        >
          {images.map((data, i) => (
            <li key={i} role="presentation">
              <button
                className="splide__pagination--custom"
                type="button"
                role="tab"
                aria-controls="splide01-slide01"
                aria-label="Go to slide 1"
                aria-selected="true"
              />
            </li>
          ))}
        </ul>
        <SplideTrack className="">
          {images.map((image, i) => (
            <SplideSlide key={i}>
              <img
                className="h-[calc(100vh-5rem)] relative z-[1] w-full object-cover"
                src={image}
                alt="Image 1"
              />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
}

export default CarouselPage;
