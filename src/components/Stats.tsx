import { useEffect, useRef } from "react";
import { useLastKey } from "../hooks/zustand/useLastKey";
import { useGameState } from "../hooks/zustand/useGameState";
import { useStats } from "../hooks/zustand/useStats";

function Stats() {
  const { lastKeyPressed, lastKeyUpdateFlag } = useLastKey();
  const { setIsFinished } = useGameState();
  const { wpm, accuracy } = useStats();
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastKeyPressed == "Enter") reset();
  }, [lastKeyUpdateFlag]);

  function reset() {
    cardWrapperRef.current?.classList.add("out");
    setTimeout(() => {
      setIsFinished(false);
      cardWrapperRef.current?.classList.remove("out");
    }, 400);
  }
  return (
    <div className={`stats-screen`}>
      <div className="card-wrapper" ref={cardWrapperRef}>
        <div className="glow-card animated-gradient glow-shadow">
          <div className="inner">
            <div className="stats">
              <div className="wpm">
                <b className="big">{wpm}</b>
                <small className="small gray">wpm</small>
              </div>
              <hr />
              <div className="accuracy">
                <b className="big">{accuracy}%</b>
                <small className="small gray">accuacy</small>
              </div>
            </div>
            <div className="restart">
              <button onClick={reset}>
                <img src="icons/restart.svg" alt="restart" />
              </button>
              <small className="enter gray">enter</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
