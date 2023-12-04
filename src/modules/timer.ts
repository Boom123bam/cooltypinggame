import { Timer } from "../types/types";

function timer(workFunc: () => void, errorFunc: () => void): Timer {
  let nextSec: number, timeout: ReturnType<typeof setTimeout>;

  function start() {
    nextSec = Date.now() + 1000;
    timeout = setTimeout(step, 1000);
  }

  function stop() {
    clearTimeout(timeout);
  }

  function step() {
    const drift = Date.now() - nextSec;
    if (drift > 1000) {
      // You could have some default stuff here too...
      if (errorFunc) errorFunc();
    }
    workFunc();
    nextSec += 1000;
    timeout = setTimeout(step, Math.max(0, 1000 - drift));
  }

  return { start, stop };
}

export default timer;
