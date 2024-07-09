export function chooseWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

export function getFeedback(guess, actual) {
  let feedback = ["⬜", "⬜", "⬜", "⬜", "⬜"];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === actual[i]) {
      feedback[i] = "🟩";
    } else if (actual.includes(guess[i])) {
      feedback[i] = "🟨";
    }
  }
  return feedback;
}
