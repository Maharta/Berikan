import { cva } from "cva";
import React, { useRef, useState } from "react";

interface Image {
  name: string;
  url: string;
}

interface ImageCarouselProps {
  images: Image[];
  className: string;
}

const containerStyles = cva("relative");
const arrowStyles = cva(
  `absolute top-[50%] translate-y-[-50%] text-5xl font-bold z-10 text-white text-center bg-slate-500/30
   hover:bg-slate-500 active:bg-slate-500  w-9 h-9 leading-9 rounded-[50%]`,
  {
    variants: {
      mode: {
        left: "left-3",
        right: "right-3",
      },
    },
  }
);

const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);

  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const goToNext = () => {
    if (index === images.length - 1) {
      setIndex(0);
      return;
    }
    setIndex((index) => index + 1);
  };

  const goToPrev = () => {
    if (index === 0) {
      setIndex(images.length - 1);
      return;
    } else {
      setIndex((index) => index - 1);
    }
  };

  const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const touchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;
    if (touchStart - touchEnd > 100) {
      // do your stuff here for left swipe
      goToNext();
    }

    if (touchStart - touchEnd < -100) {
      goToPrev();
      // do your stuff here for right swipe
    }
  };

  return (
    <div className={containerStyles({ class: className })}>
      <div
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
        style={{
          backgroundImage: `url(${images[index].url})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      <button onClick={goToPrev} className={arrowStyles({ mode: "left" })}>
        &lsaquo;
      </button>
      <button onClick={goToNext} className={arrowStyles({ mode: "right" })}>
        &rsaquo;
      </button>
      <div className="absolute bottom-2 left-[50%] flex h-6 w-[40%] translate-x-[-50%] cursor-pointer items-center justify-center gap-2 rounded-full bg-white/25">
        {images.map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: idx === index ? "black" : "gray",
            }}
            className="h-4 w-4 rounded-[50%]"></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
