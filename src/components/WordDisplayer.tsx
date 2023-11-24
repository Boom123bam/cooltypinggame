const WordDisplayer: React.FC<{
  stringToType: string;
  currentIndex: number;
}> = ({ stringToType, currentIndex }) => {
  return (
    <>
      <div className="2d-words" style={{ color: "red" }}>
        <span
          style={{
            color: "gray",
          }}
        >
          {stringToType.slice(0, currentIndex)}
        </span>
        <span>{stringToType.slice(currentIndex)}</span>
      </div>
    </>
  );
};

export default WordDisplayer;
