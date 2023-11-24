import { Text } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const MovingText: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  const textRef = useRef();

  useEffect(() => {
    if (textRef.current)
      textRef.current.addEventListener("synccomplete", () => {
        gsap.to(textRef.current.position, {
          duration: 5,
          x: -textRef.current.textRenderInfo.blockBounds[2],
        });
      });
  }, [textRef]);

  return (
    <Text
      ref={textRef}
      font={"fonts/VinaSans-Regular.ttf"}
      anchorX={"left"}
    >
      {stringToType.slice(0, currentIndex)}
    </Text>
  );
};

export default MovingText;
