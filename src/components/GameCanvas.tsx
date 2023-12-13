import { Canvas, useThree } from "@react-three/fiber";
import TextTunnel from "./TextTunnnel";
import { FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import textMaterial from "../utils/textMaterial";
import {
  baseFov,
  cameraDist,
  cameraMoveDuration,
  fovFactor,
  maxFov,
} from "../constants";
import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera as PerspectiveCameraClass } from "three";

interface CameraControlsProps {
  stringToType: string;
  currentIndex: number;
}

const Scene: FC<CameraControlsProps> = ({
  stringToType,
  currentIndex,
}) => {
  const [tunnelLength, setTunnelLength] = useState(0);
  const textMaterialRef = useRef(textMaterial);
  const timeRef = useRef(0);
  const camRef = useRef<PerspectiveCameraClass>(null);
  const prevZPosRef = useRef(0);

  // Access the camera
  const { camera } = useThree();
  gsap.to(camera.position, {
    z: cameraDist - tunnelLength,
    duration: cameraMoveDuration,
  });

  useEffect(() => {
    // Start the animation loop when the component mounts
    const animate = () => {
      const newPos = camRef.current?.position.z ?? 0;
      if (timeRef.current % 10 == 0) {
        // update speed and fov every 10 ticks

        const speed = prevZPosRef.current - newPos;
        prevZPosRef.current = newPos;

        if (camRef.current?.fov)
          gsap.to(camRef.current, {
            fov: Math.min(baseFov + speed * fovFactor, maxFov),
            duration: cameraMoveDuration,
            onUpdate: () => camRef.current?.updateProjectionMatrix(),
          });
      }

      timeRef.current += 1;
      textMaterialRef.current.uniforms.u_time.value = timeRef.current;
      textMaterialRef.current.uniforms.distance.value = newPos;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault fov={120} ref={camRef} />
      <TextTunnel
        typedString={stringToType.slice(0, currentIndex)}
        setTunnelLength={setTunnelLength}
        textMaterialRef={textMaterialRef}
      />
    </>
  );
};

const GameCanvas: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  return (
    <div
      className="canvas-container"
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: -100,
      }}
    >
      <Canvas>
        <Scene
          stringToType={stringToType}
          currentIndex={currentIndex}
        />
      </Canvas>
    </div>
  );
};

export default GameCanvas;
