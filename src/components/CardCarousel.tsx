import { memo, ReactNode } from "react";

interface CarouselSliderProps {
  children: ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

const CardCarousel = ({ children, onScroll }: CarouselSliderProps) => {
  return (
    <div
      onScroll={onScroll}
      className="grid snap-x snap-mandatory scroll-p-1 auto-cols-[65%] grid-flow-col gap-3
  overflow-x-auto scroll-smooth p-1 xs:auto-cols-[45%] md:auto-cols-[35%] lg:auto-cols-[21%]
  [@media(max-width:830px)]:scrollbar-hide">
      {children}
    </div>
  );
};

export default memo(CardCarousel);
