import { Dispatch, MutableRefObject, SetStateAction } from "react";
import MovingText from "./MovingText";
import { ShaderMaterial } from "three";

const TextTunnel: React.FC<{
  typedString: string;
  setTunnelLength: Dispatch<SetStateAction<number>>;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ typedString, setTunnelLength, textMaterialRef }) => {
  const edges = 8; // Adjust the number of instances as needed

  return (
    <>
      {/* only one instance of movingtext sets tunnel length */}
      <group rotation={[0, 0, 0]}>
        <MovingText
          typedString={typedString}
          setTunnelLength={setTunnelLength}
          textMaterialRef={textMaterialRef}
        />
      </group>

      {Array.from({ length: edges - 1 }).map((_, index) => (
        <group
          key={index}
          rotation={[0, 0, ((Math.PI * 2) / edges) * (index + 1)]}
        >
          <MovingText
            typedString={typedString}
            setTunnelLength={null}
            textMaterialRef={textMaterialRef}
          />
        </group>
      ))}
    </>
  );
};

export default TextTunnel;
