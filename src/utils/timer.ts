class timer {
  timeLeft: number = 0;
  private nextSec: number = 0;
  private timeout?: ReturnType<typeof setTimeout>;
  private onChange: (timeLeft: number) => void;
  private onEnd: () => void;

  constructor(args: {
    onChange: (timeLeft: number) => void;
    onEnd: () => void;
  }) {
    this.onChange = args.onChange;
    this.onEnd = args.onEnd;
  }

  start(timeLeft: number) {
    this.timeLeft = timeLeft;
    this.nextSec = Date.now() + 1000;
    this.timeout = setTimeout(this.step.bind(this), 1000);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  step() {
    const drift = Date.now() - this.nextSec;
    if (drift > 1000) {
      console.log("error");
    }

    this.timeLeft--;

    if (this.timeLeft <= 0) {
      this.onEnd();
      return;
    }
    this.onChange(this.timeLeft);

    this.nextSec += 1000;
    this.timeout = setTimeout(
      this.step.bind(this),
      Math.max(0, 1000 - drift)
    );
  }
}

export default timer;
