import { audioPath, numNotes } from "../constants";

function playAudioBuffer(audioBuffer: AudioBuffer) {
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.start();
}

const context = new window.AudioContext();

async function loadBuffer(url: string): Promise<AudioBuffer | null> {
  try {
    const response = await window.fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const resultBuffer = await context.decodeAudioData(arrayBuffer);

    return resultBuffer;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const noteBuffers: AudioBuffer[] = [];

for (let i = 1; i <= numNotes; i++) {
  console.log(i);
  const buffer = await loadBuffer(`${audioPath}/${i}.wav`);
  if (buffer) noteBuffers.push(buffer);
}

function playNote(index: number) {
  playAudioBuffer(noteBuffers[index]);
}

export { playAudioBuffer, loadBuffer, playNote };
