import { Text } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect } from "react";

const MovingText: React.FC<{
  typedString: string;
  setTunnelLength: Dispatch<SetStateAction<number>> | null;
}> = ({ typedString, setTunnelLength }) => {
  const letterWidth = 0.75;

  useEffect(() => {
    if (setTunnelLength) {
      setTunnelLength(letterWidth * typedString.length);
    }
  }, [typedString]);

  return (
    <group>
      {typedString.split("").map((letter, i) => (
        <Text
          key={i}
          font={"fonts/Astronomic-Mono.ttf"}
          anchorX={"left"}
          position={[-1, 0, -i * letterWidth]}
          rotation={[0, Math.PI / 2, 0]}
        >
          {letter}
        </Text>
      ))}
    </group>
  );
};

export default MovingText;
