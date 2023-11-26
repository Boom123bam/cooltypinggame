import { Canvas, useThree } from "@react-three/fiber";
import TextTunnel from "./TextTunnnel";
import { FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import textMaterial from "../modules/textMaterial";
import { cameraDist, cameraMoveDuration } from "../modules/constants";

interface CameraControlsProps {
  zPos: number;
}

const CameraControls: FC<CameraControlsProps> = ({ zPos }) => {
  // Access the camera
  const { camera } = useThree();
  gsap.to(camera.position, {
    z: zPos,
    duration: cameraMoveDuration,
  });
  return null;
};

const GameCanvas: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  const [tunnelLength, setTunnelLength] = useState(0);
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const textMaterialRef = useRef(textMaterial);

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
      <Canvas ref={canvasRef}>
        <CameraControls
          zPos={cameraDist - tunnelLength}
        ></CameraControls>
        {/* <OrbitControls /> */}
        {/* <axesHelper /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight /> */}
        <TextTunnel
          typedString={stringToType.slice(0, currentIndex)}
          setTunnelLength={setTunnelLength}
          textMaterialRef={textMaterialRef}
        />
      </Canvas>
    </div>
  );
};

export default GameCanvas;
