import { Canvas, useThree } from "@react-three/fiber";
import TextTunnel from "./TextTunnnel";
import { FC, useRef, useState } from "react";
import gsap from "gsap";

interface CameraControlsProps {
  zPos: number;
}

const CameraControls: FC<CameraControlsProps> = ({ zPos }) => {
  // Access the camera
  const { camera } = useThree();
  gsap.to(camera.position, {
    z: zPos,
    duration: 3,
  });

  return null;
};

const GameCanvas: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  const [tunnelLength, setTunnelLength] = useState(0);
  const canvasRef = useRef(null);
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
        <CameraControls zPos={3 - tunnelLength}></CameraControls>
        {/* <OrbitControls /> */}
        {/* <axesHelper /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight /> */}
        <TextTunnel
          typedString={stringToType.slice(0, currentIndex)}
          setTunnelLength={setTunnelLength}
        />
      </Canvas>
    </div>
  );
};

export default GameCanvas;
