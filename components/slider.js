import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";

export default function Slider({images, alts}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image) => (
        <Carousel.Item key={image} interval={4000}>
          <Image src={image} width={400} height={400} alt="slides" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}