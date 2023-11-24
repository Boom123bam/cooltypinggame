import { Text } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

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
          z: textRef.current.textRenderInfo.blockBounds[2],
        });
      });
  }, [textRef]);

  return (
    <Text
      ref={textRef}
      font={"fonts/VinaSans-Regular.ttf"}
      anchorX={"left"}
      position={[-1, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      {stringToType.slice(0, currentIndex)}
    </Text>
  );
};

export default MovingText;
