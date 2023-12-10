import { GameModeOptions } from "./types/types";

const cameraDist = 1;
const cameraMoveDuration = 1.5;
const numTunnelEdges = 8;
const tunnelSize = 0.7;
const twistFactor = 0.075;
const letterWidth = 1;
const maxCharsToShow = 25;
const options: GameModeOptions = {
  time: [15, 30, 60],
  words: [10, 25, 50],
  infinite: null,
};
const allowAutoType = false;

export {
  cameraDist,
  cameraMoveDuration,
  numTunnelEdges,
  tunnelSize,
  letterWidth,
  maxCharsToShow,
  options,
  allowAutoType,
  twistFactor,
};
