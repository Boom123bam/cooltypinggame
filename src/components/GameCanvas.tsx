import { Canvas, useThree } from "@react-three/fiber";
import TextTunnel from "./TextTunnnel";
import { FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import textMaterial from "../modules/textMaterial";
import { cameraDist, cameraMoveDuration } from "../modules/constants";

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

  // Access the camera
  const { camera } = useThree();
  gsap.to(camera.position, {
    z: cameraDist - tunnelLength,
    duration: cameraMoveDuration,
  });

  useEffect(() => {
    // Start the animation loop when the component mounts
    const animate = () => {
      timeRef.current += 0.01;

      textMaterialRef.current.uniforms.u_time.value = timeRef.current;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <TextTunnel
      typedString={stringToType.slice(0, currentIndex)}
      setTunnelLength={setTunnelLength}
      textMaterialRef={textMaterialRef}
    />
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
        zIndex: -1,
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
