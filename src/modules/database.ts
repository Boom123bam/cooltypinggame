export function getRandomWord() {
  const words = ["apple", "banana", "orange", "grape", "kiwi"];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export async function getRandomWordList(wordCount: number) {
  const words = ["apple", "banana", "orange", "grape", "kiwi"];
  const result: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    result.push(words[randomIndex]);
  }
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1000);
  return result;
}
