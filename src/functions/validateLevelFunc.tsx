export function validateLevel(guessedWords: number, updateLevelFunc: (level: number) => void) {
  if (guessedWords > 1) {
    updateLevelFunc(2)
  }
  if (guessedWords > 4) {
    updateLevelFunc(3)
  }
  if (guessedWords > 7) {
    updateLevelFunc(4)
  }
  if (guessedWords > 10) {
    updateLevelFunc(5)
  }
  if (guessedWords > 13) {
    updateLevelFunc(6)
  }
  if (guessedWords > 16) {
    updateLevelFunc(7)
  }
  if (guessedWords > 19) {
    updateLevelFunc(8)
  }
  if (guessedWords > 22) {
    updateLevelFunc(9)
  }
  if (guessedWords > 25) {
    updateLevelFunc(10)
  }
}
