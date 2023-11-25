import { Text } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const MovingText: React.FC<{
  stringToType: string;
  currentIndex: number;
  setTunnelLength: Dispatch<SetStateAction<number>> | null;
}> = ({ stringToType, currentIndex, setTunnelLength }) => {
  const textRef = useRef<any>();

  useEffect(() => {
    if (setTunnelLength) {
      if (textRef.current)
        textRef.current.addEventListener("synccomplete", () => {
          setTunnelLength(
            textRef.current.textRenderInfo.blockBounds[2]
          );
        });
    }
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
