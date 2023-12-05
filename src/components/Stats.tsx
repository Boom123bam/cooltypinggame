import { StatsProps } from "../types/types";

function Stats({ show }: StatsProps) {
  return (
    <div className={`stats ${show ? "show" : "hide"}`}>
      <div className="glow-card animated-gradient">
        <div className="inner">
          <div className="wpm">
            <div className="number">60</div>
            <small>wpm</small>
          </div>
          <hr />

          <div className="restart">
            <button>
              <img src="icons/restart.svg" alt="restart" />
            </button>
            <small className="enter">enter</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
