import Image from 'next/image';
import { Card, CardCover, Button, Stack, CardContent, AspectRatio } from '@mui/joy';
import { useState } from 'react';

export default function Carousel({images}) {
  const [selected, setSelected] = useState(0);
  const [decAllow, updateDec] = useState(false);
  const [incAllow, updateInc] = useState(true);

  const alter = (min, max, inc) => {
    if(!incAllow && selected <= max) { updateInc(true); }
    if(!decAllow && selected >= min) { updateDec(true); }
    
    if(decAllow && !inc) {
      const temp = selected;
      setSelected(selected-1);
      if(temp-1 === min) { updateDec(false); }
    }

    if(incAllow && inc) {
      const temp = selected;
      setSelected(selected+1);
      if(temp+1 === max) { updateInc(false); }
    }
  }
  if(images.length > 1) {
    return (
      <Card sx={{height: 300, width: 400}}>
        <CardContent>
          <Stack direction="row" justifyContent={"space-between"} zIndex={1}>
            <Button disabled={!decAllow} onClick={() => alter(0, images.length-1, false)}>Prev</Button>
            <Button disabled={!incAllow} onClick={() => alter(0, images.length-1, true)}>Next</Button>
          </Stack>
        </CardContent>
          {images.map((image, index) => {
            return <CardCover key={image.src} hidden={index !== selected}><Image hidden={index !== selected} src={image.src} alt={image.alt} fill /></CardCover>
          })}
      </Card>
    );
  }
  else {
    return (
      <Card sx={{height: 300, width: 400}}>
        <CardCover>
          <Image src={images[0].src} alt={images[0].alt} fill />
        </CardCover>
      </Card>
    );
  }
}