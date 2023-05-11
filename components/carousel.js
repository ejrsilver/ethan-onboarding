import { useState, PropsWithChildren } from "react";
import useEmblaCarousel from "embla-carousel-react/components/useEmblaCarousel";

export default function Carousel({children, ...options}) {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
}