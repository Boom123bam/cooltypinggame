import { ChangeEvent, useEffect, useRef } from "react";
import { useLastKey } from "../hooks/zustand/useLastKey";
import { useGameState } from "../hooks/zustand/useGameState";

function KeyListener() {
  const { isFinished } = useGameState();
  const { setLastKey } = useLastKey();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val) setLastKey(val);
    e.target.value = "";
  }

  function handleUnfocus() {
    // refocus on key press
    if (isFinished) return;
    document.addEventListener(
      "keypress",
      () => inputRef.current?.focus(),
      {
        once: true,
      }
    );
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isFinished) {
      document.getElementById("result")?.focus();
    } else inputRef.current?.focus();
  }, [isFinished]);
  return (
    <>
      <input
        id="input"
        onChange={handleInputChange}
        ref={inputRef}
        onBlur={handleUnfocus}
        tabIndex={isFinished ? -1 : 1}
      ></input>
    </>
  );
}
export default KeyListener;
