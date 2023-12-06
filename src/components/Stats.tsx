import { useEffect } from "react";
import { useGameState, useLastKey } from "../stores/gameState";

function Stats() {
  const { lastKeyPressed, lastKeyUpdateFlag } = useLastKey();
  const { setPage } = useGameState();
  useEffect(() => {
    if (lastKeyPressed == "Enter") reset(); // TODO add transition with timeout
  }, [lastKeyUpdateFlag]);

  function reset() {
    setPage("game");
  }
  return (
    <div className={`stats`}>
      <div className="card-wrapper">
        <div className="glow-card animated-gradient glow-shadow">
          <div className="inner">
            <div className="wpm">
              <div className="number">60</div>
              <small>wpm</small>
            </div>
            <hr />

            <div className="restart">
              <button onClick={reset}>
                <img src="icons/restart.svg" alt="restart" />
              </button>
              <small className="enter">enter</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
