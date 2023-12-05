import { StatsProps } from "../types/types";

function Stats({ show }: StatsProps) {
  return (
    <div className={`stats ${show ? "show" : "hide"}`}>stats</div>
  );
}

export default Stats;
