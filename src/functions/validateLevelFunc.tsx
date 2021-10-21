// need to optimize this one later

export function validateLevel(
  guessedWords: number,
  updateLevelFunc: (level: number) => void
) {
  let level: number = 1
  guessedWords < 3 ? updateLevelFunc(level = 1) : 
  guessedWords < 6 ? updateLevelFunc(level = 2) :
  guessedWords < 10 ? updateLevelFunc(level = 3) :
  guessedWords < 14 ? updateLevelFunc(level = 4) :
  guessedWords < 18 ? updateLevelFunc(level = 5) :
  guessedWords < 22 ? updateLevelFunc(level = 6) :
  guessedWords < 26 ? updateLevelFunc(level = 7) :
  guessedWords < 30 ? updateLevelFunc(level = 8) :
  guessedWords < 34 ? updateLevelFunc(level = 9) :
  guessedWords > 33 && updateLevelFunc(level = 10)
  return level

}
