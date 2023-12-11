import { Text } from "@react-three/drei";
import gsap from "gsap";
import { FC, MutableRefObject, memo, useEffect, useRef } from "react";
import { Group, ShaderMaterial } from "three";
import {
  letterWidth,
  numTunnelEdges,
  tunnelSize,
  twistFactor,
} from "../constants";

const TextRing: FC<{
  letter: string;
  index: number;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ letter, textMaterialRef, index }) => {
  const groupRef = useRef<Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = index * twistFactor;
      gsap.fromTo(
        groupRef.current.rotation,
        {
          z: index * twistFactor,
        },
        {
          z: index * twistFactor + 0.5,
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
    const delay = Math.random() * 0.25;
    const inDuration = 0.25;

    gsap.to(textRef.current, {
      duration: inDuration,
      fontSize: 1.3,
      ease: "power3.out",
      delay,
      fillOpacity: 1,

      onComplete: function () {
        gsap.to(textRef.current, {
          fillOpacity: 0.1,
          duration: 0.25,
          fontSize: 1,
          ease: "power2.in",
        });
      },
    });

    gsap.to(textRef.current.rotation, {
      y: Math.PI / 2,
      duration: inDuration,
      ease: "power3.out",
      delay,
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
      position={[-tunnelSize, 0, 0]}
      rotation={[0, Math.PI / 2 - 0.5, 0]}
      material={textMaterialRef.current ?? undefined}
      fontSize={0}
      fillOpacity={0}
    >
      {letter}
    </Text>
  );
};

const Char3dMemo = memo(Char3d);

export default TextRing;
