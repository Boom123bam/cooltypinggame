import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
} from "react";
import { ShaderMaterial } from "three";
import TextRing from "./TextRing";

const letterWidth = 0.7;
const maxCharsToShow = 25;

const TextTunnel: React.FC<{
  typedString: string;
  setTunnelLength: Dispatch<SetStateAction<number>>;
  textMaterialRef: MutableRefObject<ShaderMaterial>;
}> = ({ typedString, setTunnelLength, textMaterialRef }) => {
  useEffect(() => {
    if (setTunnelLength) {
      setTunnelLength(letterWidth * typedString.length);
    }
  }, [typedString]);

  return (
    <>
      {typedString
        .split("")
        .map(
          (letter, index) =>
            index > typedString.length - maxCharsToShow - 1 && (
              <TextRing
                key={index}
                index={index}
                letter={letter}
                textMaterialRef={textMaterialRef}
              />
            )
        )}
    </>
  );
};

export default TextTunnel;
