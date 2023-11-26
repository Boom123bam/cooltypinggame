import { Text } from "@react-three/drei";
import gsap from "gsap";
import { FC, MutableRefObject, memo, useEffect, useRef } from "react";
import { Group, ShaderMaterial } from "three";
import {
  letterWidth,
  numTunnelEdges,
  tunnelSize,
} from "../modules/constants";

const TextRing: FC<{
  letter: string;
  index: number;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ letter, textMaterialRef, index }) => {
  const groupRef = useRef<Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = index * 0.15;
      gsap.fromTo(
        groupRef.current.rotation,
        {
          z: index * 0.15,
        },
        {
          z: index * 0.15 + 1.5,
          duration: 5,
        }
      );
    }
  });
  return (
    <>
      <group position={[0, 0, -index * letterWidth]} ref={groupRef}>
        {Array.from({ length: numTunnelEdges }).map((_, index) => (
          <group
            key={index}
            rotation={[
              0,
              0,
              ((Math.PI * 2) / numTunnelEdges) * index,
            ]}
          >
            <Char3dMemo
              letter={letter}
              textMaterialRef={textMaterialRef}
            />
          </group>
        ))}
      </group>
    </>
  );
};

const Char3d: FC<{
  letter: string;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ letter, textMaterialRef }) => {
  const textRef = useRef<any>(null);
  useEffect(() => {
    gsap.to(textRef.current.position, {
      x: -tunnelSize,
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
      position={[-1.8 - tunnelSize, (Math.random() - 0.5) * 3, 0]}
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

export default TextRing;
