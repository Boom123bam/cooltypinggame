import MovingText from "./MovingText";

const TextTunnel: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  return (
    <MovingText
      stringToType={stringToType}
      currentIndex={currentIndex}
    />
  );
};

export default TextTunnel;
