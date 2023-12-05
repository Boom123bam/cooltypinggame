import { StatsProps } from "../types/types";

function Stats({ show }: StatsProps) {
  return (
    <div className={`stats ${show ? "show" : "hide"}`}>
      <div className="glow-card animated-gradient">
        <div className="wpm">
          <div className="big">60</div>
          <div className="small">wpm</div>
        </div>

        <hr />

        <div className="restart">
          <button>restart</button>
          <div className="enter">enter</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
