import { rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

function Caro() {
  return (
    <Carousel
      height={180}
      nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
      previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

export default Caro