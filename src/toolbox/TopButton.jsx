import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { HiChevronUp } from "react-icons/hi";

function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const clickEvent = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(false);
        } else if (!entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    },
    {
      threshold: 0.4,
      root: null,
    }
  );

  useEffect(() => {
    const elements = document.querySelectorAll(".observer");
    elements.forEach((element) => {
      if (element) observer.observe(element);
    });
  }, [window.location.href]);

  return (
    <HiChevronUp
      data-visible={isVisible}
      onClick={clickEvent}
      className="w-14 h-14 select-none duration-100 hidden data-[visible=true]:block text-black rounded-full bg-[#0005] fixed bottom-7 shadow-md cursor-pointer hover:bg-[#0007] right-3 z-10 active:bg-[#0009]"
    />
  );
}

export default TopButton;
