import { Text } from "@react-three/drei";
import { Dispatch, FC, SetStateAction, memo, useEffect } from "react";

const letterWidth = 1;

const MovingText: FC<{
  typedString: string;
  setTunnelLength: Dispatch<SetStateAction<number>> | null;
}> = ({ typedString, setTunnelLength }) => {
  useEffect(() => {
    if (setTunnelLength) {
      setTunnelLength(letterWidth * typedString.length);
    }
  }, [typedString]);

  return (
    <group>
      {typedString.split("").map((letter, index) => (
        <Char3dMemo key={index} letter={letter} index={index} />
      ))}
    </group>
  );
};

const Char3d: FC<{
  letter: string;
  index: number;
}> = ({ letter, index }) => {
  return (
    <Text
      font={"fonts/Astronomic-Mono.ttf"}
      anchorX={"left"}
      position={[-1, 0, -index * letterWidth]}
      rotation={[0, Math.PI / 2, 0]}
    >
      {letter}
    </Text>
  );
};

const Char3dMemo = memo(Char3d);

export default MovingText;
