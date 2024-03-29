import { memo, ReactNode } from "react";

interface CarouselSliderProps {
  children: ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

function CardCarousel({ children, onScroll }: CarouselSliderProps) {
  return <div
    onScroll={onScroll}
    className="grid auto-cols-mobile grid-flow-col items-center gap-3
  overflow-x-auto scroll-smooth p-2 xs:auto-cols-[45%] md:auto-cols-[35%]
  lg:auto-cols-[24%] xl:auto-cols-[21%] [@media(max-width:830px)]:scrollbar-hide">
    {children}
  </div>
}

export default memo(CardCarousel);
