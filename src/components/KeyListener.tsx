import { useEffect } from "react";
import { useLastKey } from "../hooks/zustand/useLastKey";

function KeyListener() {
  const { setLastKey } = useLastKey();

  function handleKeyDown(e: KeyboardEvent) {
    setLastKey(e.key);
  }

  useEffect(() => {
    // Add event listener
    document.addEventListener("keypress", handleKeyDown, {
      // once: true,
    });
  }, []);
  return <></>;
}
export default KeyListener;
