import "./App.css";
import ModeSelector from "./components/ModeSelector";
import Stats from "./components/Stats";
import TypingGame from "./components/TypingGame";
import { useGameState } from "./stores/gameState";

function App() {
  const { page } = useGameState();
  return (
    <>
      <ModeSelector show={page == "game"} />
      <TypingGame show={page == "game"} />
      <Stats show={page == "results"} />
    </>
  );
}

export default App;
