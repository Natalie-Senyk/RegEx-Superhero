const fetchData = () => {
  return Promise.resolve({
    numberOfGuessedWords: 0,
    updateGuessedWords: (num: number) => num + 1,
    currentLevel: 0,
    validateLevel: (numOfGuessedWords: number, currentLevel: number) => {
        if (numOfGuessedWords > 2) {
            currentLevel = 2
        }
    },
  })
}

export default fetchData
