export async function getRandomWordList(
  wordCount: number,
  fileName: string
) {
  const data = await getWordsData(fileName);
  const words = data.words;
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

async function getWordsData(fileName: string) {
  let data = localStorage.getItem(fileName);
  if (data) return JSON.parse(data);

  const res = await fetch(`/json/${fileName}.json`);
  data = await res.json();
  if (data) {
    localStorage.setItem(fileName, JSON.stringify(data));
    return data;
  }
  throw Error("no file: " + fileName);
}
