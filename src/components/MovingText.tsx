import { Text } from "@react-three/drei";
import gsap from "gsap";
import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  memo,
  useEffect,
  useRef,
} from "react";
import { ShaderMaterial } from "three";

const letterWidth = 0.7;
const maxCharsToShow = 25;

const MovingText: FC<{
  typedString: string;
  setTunnelLength: Dispatch<SetStateAction<number>> | null;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ typedString, setTunnelLength, textMaterialRef }) => {
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
            <Char3dMemo
              key={index}
              letter={letter}
              index={index}
              textMaterialRef={textMaterialRef}
            />
          );
      })}
    </group>
  );
};

const Char3d: FC<{
  letter: string;
  index: number;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ letter, index, textMaterialRef }) => {
  const textRef = useRef<any>(null);
  useEffect(() => {
    gsap.to(textRef.current.position, {
      x: -0.7,
      y: 0,
      duration: 0.5,
    });

    gsap.to(textRef.current, {
      fillOpacity: 1,
      duration: 0.5,
      onComplete: function () {
        gsap.to(textRef.current, {
          fillOpacity: 0.1,
          duration: 1,
        });
      },
    });

    gsap.to(textRef.current.rotation, {
      y: Math.PI / 2,
      duration: 0.5,
    });
    gsap.to(textRef.current.rotation, {
      x: (Math.random() - 0.5) * 5,
      duration: 5.5,
    });
  });
  return (
    <Text
      ref={textRef}
      font={"fonts/Astronomic-Mono.ttf"}
      anchorX={"left"}
      position={[
        -2.5,
        (Math.random() - 0.5) * 3,
        -index * letterWidth,
      ]}
      rotation={[
        // (Math.random() - 0.5) * 3,
        0,
        Math.PI / 2 - 0.5,
        0,
      ]}
      material={textMaterialRef.current ?? undefined}
      fillOpacity={0}
    >
      {letter}
    </Text>
  );
};

const Char3dMemo = memo(Char3d);

export default MovingText;
