import { RegexContext } from "../store/regex-context"
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Progress from "../pages/Progress"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"

jest.mock("../components/LevelBadge", () => () => (
  <div data-testid="levelbadge" />
))

jest.mock("../UI/SearchField", () => () => (
  <>
    <div data-testid="searchInput" />
    <input placeholder="Search by date or hour (format: dd.mm.yyyy, hh:mm:ss)" />
  </>
))

let contextItems = {
  currentLevel: 1,
  wordIndex: 0,
  currentWord: [],
  enteredInput: "",
  updateEnteredInput: () => {},
  numberOfGuessedWords: 0,
  updateCurrentWord: () => {},
  skipWord: () => {},
  timerIsActive: false,
  launchTimer: () => {},
  timeResult: { minutes: 0, hours: 0 },
  updateTimeResultStatement: () => {},
  validateResult: () => {},
  fetchUserData: () => {},
  fetchUserProgress: () => {},
  resetUserData: () => {},
  userProgress: [],
  updateFetchRequests: () => {},
  updateCardLimit: jest.fn(),
  cardLimit: 6,
}

describe("Progress Component and its behaviour", () => {
  it("hides the spinner when user progress current data is received", async () => {
    render(
      <RegexContext.Provider value={contextItems}>
        <BrowserRouter>
          <Progress />
        </BrowserRouter>
      </RegexContext.Provider>
    )
    await waitFor(() => {
      const loadingSpinner = screen.queryByText("Loading your progress data...")
      expect(loadingSpinner).toBeNull()
    })
  })
  it('assigns className "progress" to the main div block if number of guessed words is > 1', async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <BrowserRouter>
          <Progress />
        </BrowserRouter>
      </RegexContext.Provider>
    )
    const mainDivElement = await screen.findByTestId("progress")
    expect(mainDivElement).toHaveClass("progress")
  })
  it('assigns className "noProgress" to the div block if number of guessed words is < 2', async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 1,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <BrowserRouter>
          <Progress />
        </BrowserRouter>
      </RegexContext.Provider>
    )
    const mainDivElement = await screen.findByTestId("no-progress")
    expect(mainDivElement).toHaveClass("noProgress")
  })
  it("renders LevelBadge child component if number of guessed words is > 1", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <BrowserRouter>
          <Progress />
        </BrowserRouter>
      </RegexContext.Provider>
    )
    const levelBadgeComponent = await screen.findByTestId("levelbadge")
    expect(levelBadgeComponent).toBeVisible()
  })
  it("renders SearchInput component if number of guessed words is > 1", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <BrowserRouter>
          <Progress />
        </BrowserRouter>
      </RegexContext.Provider>
    )
    const searchComponent = await screen.findByTestId("searchInput")
    expect(searchComponent).toBeVisible()
  })
})
