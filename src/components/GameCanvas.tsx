import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import TextTunnel from "./TextTunnnel";

// "node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json"

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
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* <OrbitControls /> */}
        {/* <axesHelper /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight /> */}
        <TextTunnel
          stringToType={stringToType}
          currentIndex={currentIndex}
        />
      </Canvas>
    </div>
  );
};

export default GameCanvas;
