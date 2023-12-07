import { useEffect } from "react";
import { useLastKey } from "../hooks/zustand/useLastKey";
import { useGameState } from "../hooks/zustand/useGameState";
import { useStats } from "../hooks/zustand/useStats";

function Stats() {
  const { lastKeyPressed, lastKeyUpdateFlag } = useLastKey();
  const { setPage } = useGameState();
  const { wpm, accuracy } = useStats();
  useEffect(() => {
    if (lastKeyPressed == "Enter") reset(); // TODO add transition with timeout
  }, [lastKeyUpdateFlag]);

  function reset() {
    setPage("game");
  }
  return (
    <div className={`stats-screen`}>
      <div className="card-wrapper">
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
