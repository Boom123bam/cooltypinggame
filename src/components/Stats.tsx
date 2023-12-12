import { useEffect, useRef } from "react";
import { useGameState } from "../hooks/zustand/useGameState";
import { useStats } from "../hooks/zustand/useStats";
import gsap from "gsap";

function Stats() {
  const { setIsFinished } = useGameState();
  const { wpm, accuracy } = useStats();
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardWrapperRef.current) return;
    const bounds = cardWrapperRef.current.getBoundingClientRect();

    function handleMouseMove(e: MouseEvent) {
      if (!cardWrapperRef.current) return;

      const leftX = e.clientX - bounds.x;
      const topY = e.clientY - bounds.y;
      const mouseX = leftX - bounds.width / 2;
      const mouseY = topY - bounds.height / 2;

      gsap.to(cardWrapperRef.current, {
        ["--mouse-x"]: mouseX,
        ["--mouse-y"]: mouseY,
        duration: 0.2,
      });
    }

    function handleMouseLeave() {
      gsap.to(cardWrapperRef.current, {
        ["--mouse-x"]: 0,
        ["--mouse-y"]: 0,
        duration: 0.2,
      });
    }

    cardWrapperRef.current.addEventListener(
      "mousemove",
      handleMouseMove
    );

    cardWrapperRef.current.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      cardWrapperRef.current?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      cardWrapperRef.current?.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  function reset() {
    cardWrapperRef.current?.classList.add("out");
    setTimeout(() => {
      setIsFinished(false);
      cardWrapperRef.current?.classList.remove("out");
    }, 400);
  }
  return (
    <div className={`stats-screen`} id="result" tabIndex={-1}>
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
              <small className="keys gray">
                <span>tab</span> + <span>enter</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
