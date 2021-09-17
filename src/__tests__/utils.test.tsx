import "@testing-library/jest-dom"
import regExpData from "../store/utils"


describe("Regex array", () => {
  it("should check regEx length (30 expressions)", () => {
    const regExpressions = regExpData
    expect(regExpressions.length).toBe(30)
  })
  it("should check one of regEx expressions", () => {
    const regExpressions = regExpData
    expect(regExpressions).toContain('abc123')
  })
  it("should check the last regEx in the regex array", () => {
    const regExpressions = regExpData
    expect(regExpressions[regExpressions.length - 1]).toBe('RegEx-SuperHero-2021')
  })

})