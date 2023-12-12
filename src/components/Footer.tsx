import { useGameState } from "../hooks/zustand/useGameState";

function Footer() {
  const { isTyping } = useGameState();
  return (
    <>
      <footer className={isTyping ? "hide" : ""}>
        <a
          href="https://cooltypinggame.com"
          tabIndex={isTyping ? -1 : 1}
        >
          cooltypinggame.com
        </a>
        <a
          href="https://github.com/Boom123bam/cooltypinggame"
          target="blank"
          className="github"
          tabIndex={isTyping ? -1 : 1}
        >
          <img src="github.svg" alt="" />
        </a>
      </footer>
    </>
  );
}

export default Footer;
