import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  memo,
  useEffect,
} from "react";
import { ShaderMaterial } from "three";
import TextRing from "./TextRing";
import { letterWidth, maxCharsToShow } from "../constants";

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
              <MemoTextRing
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

const MemoTextRing = memo(TextRing);
export default TextTunnel;
