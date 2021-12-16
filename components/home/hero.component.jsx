import React from "react";
import { Image, Square } from "@chakra-ui/react";
const HeroComponent = () => {
  return (
    <div className="">
      <Square my="8">
        <Image
          w="120px"
          // objectFit="cover"
          src="/logo/ipredict.png"
          alt="I-Pedict"
        />
      </Square>
    </div>
  );
};

export default HeroComponent;
