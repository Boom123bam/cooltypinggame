import { ModeOptions } from "./types/types";

const cameraDist = 1;
const cameraMoveDuration = 2.5;
const numTunnelEdges = 8;
const tunnelSize = 0.7;
const letterWidth = 0.7;
const maxCharsToShow = 25;
const options: ModeOptions = {
  time: [15, 30, 60],
  words: [10, 25, 50],
  infinite: null,
};

export {
  cameraDist,
  cameraMoveDuration,
  numTunnelEdges,
  tunnelSize,
  letterWidth,
  maxCharsToShow,
  options,
};