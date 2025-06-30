const getPointWord = (word: string): { points: number, pangram: boolean } => {
  const length = word.length;
  let pangram = false;

  let points = (length === 4) ? 1 : length;

  const uniqueLetters = new Set(word).size;

  if (uniqueLetters === 7) {
    points += 7;
    pangram = true;

  }
  return {
    points,
    pangram

  };

};

const getFullPoints = (words: Array<string>): number => {
  const seen = new Set();
  let total = 0;

  for (const w of words) {
    const word = w.toLowerCase();
    if (!seen.has(word)) {
      seen.add(word);
      const point = getPointWord(word);
      total += point.points;

    }
  }
  return total;
};

export {
  getFullPoints,
  getPointWord

};
