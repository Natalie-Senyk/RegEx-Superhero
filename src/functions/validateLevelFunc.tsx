// need to optimize this one later

export function validateLevel(
  guessedWords: number,
  updateLevelFunc: (level: number) => void
) {
  guessedWords < 3 ? updateLevelFunc(1) : 
  guessedWords < 6 ? updateLevelFunc(2) :
  guessedWords < 10 ? updateLevelFunc(3) :
  guessedWords < 14 ? updateLevelFunc(4) :
  guessedWords < 18 ? updateLevelFunc(5) :
  guessedWords < 22 ? updateLevelFunc(6) :
  guessedWords < 26 ? updateLevelFunc(7) :
  guessedWords < 30 ? updateLevelFunc(8) :
  guessedWords < 34 ? updateLevelFunc(9) :
  guessedWords > 33 && updateLevelFunc(10)

}
