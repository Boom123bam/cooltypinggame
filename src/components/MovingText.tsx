import { Text } from "@react-three/drei";
import gsap from "gsap";
import {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useEffect,
  useRef,
} from "react";

const letterWidth = 0.75;
const maxCharsToShow = 25;

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
      {typedString.split("").map((letter, index) => {
        if (index > typedString.length - maxCharsToShow - 1)
          return (
            <Char3dMemo key={index} letter={letter} index={index} />
          );
      })}
    </group>
  );
};

const Char3d: FC<{
  letter: string;
  index: number;
}> = ({ letter, index }) => {
  const textRef = useRef<any>(null);
  useEffect(() => {
    gsap.to(textRef.current.position, {
      x: -1.2,
      duration: 0.2,
    });
    gsap.to(textRef.current, {
      fillOpacity: 0.1,
      duration: 1,
    });
  });
  return (
    <Text
      ref={textRef}
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
