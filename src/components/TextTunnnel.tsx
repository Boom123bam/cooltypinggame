import { Dispatch, SetStateAction } from "react";
import MovingText from "./MovingText";

const TextTunnel: React.FC<{
  typedString: string;
  setTunnelLength: Dispatch<SetStateAction<number>>;
}> = ({ typedString, setTunnelLength }) => {
  const edges = 8; // Adjust the number of instances as needed

  return (
    <>
      {/* only one instance of movingtext sets tunnel length */}
      <group rotation={[0, 0, 0]}>
        <MovingText
          typedString={typedString}
          setTunnelLength={setTunnelLength}
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
          />
        </group>
      ))}
    </>
  );
};

export default TextTunnel;
