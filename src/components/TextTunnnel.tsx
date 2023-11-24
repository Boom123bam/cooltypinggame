import MovingText from "./MovingText";

const TextTunnel: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  const edges = 8; // Adjust the number of instances as needed

  return (
    <>
      {Array.from({ length: edges }).map((_, index) => (
        <group
          key={index}
          rotation={[0, 0, ((Math.PI * 2) / edges) * index]}
        >
          <MovingText
            stringToType={stringToType}
            currentIndex={currentIndex}
          />
        </group>
      ))}
    </>
  );
};

export default TextTunnel;
