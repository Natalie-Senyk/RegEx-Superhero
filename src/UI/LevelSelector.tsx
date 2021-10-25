import React, { useCallback, useEffect, useState } from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import debounce from "lodash.debounce"
import { PROGRESS_URL } from "../urls.config"

const levels = [
  { level: "level 1" },
  { level: "level 2" },
  { level: "level 3" },
  { level: "level 4" },
  { level: "level 5" },
  { level: "level 6" },
  { level: "level 7" },
  { level: "level 8" },
  { level: "level 9" },
  { level: "level 10" },
]

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    margin: "30px auto",
  },
}))

type progressFetchedData = {
  guessedWords: string[]
  guessedTime: string
  guessedRegEx: string
  level: number
}

type searchFieldProps = {
  onSearch: (filteredResult: progressFetchedData[] | undefined) => void
}

const LevelSelector: React.FC<searchFieldProps> = ({onSearch}) => {
  const classes = useStyles()
  const [userQuery, setUserQuery] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<
    progressFetchedData[] | undefined
  >([])
  const userQueryTransformed = userQuery.map(levelNum => levelNum.match(/\d/))
  const userQueryLevelArray = userQueryTransformed.map(level => +level![0])
  const userQueryLevelMaxNumber = Math.max(...userQueryLevelArray)
  const userQueryLevelMinNumber = Math.min(...userQueryLevelArray)



  const updateQuery = async () => {
    try {
      const response = await fetch(
        `${PROGRESS_URL}?orderBy="level"&startAt=${userQueryLevelMinNumber}&endAt=${userQueryLevelMaxNumber}`
      )
      const data = await response.json()
      if (data === null) {
        return
      }
      let userProgressTransformed: any = []
      for (let key in data) {
        userProgressTransformed.push({
          guessedWords: data[key].guessedWords,
          guessedTime: data[key].guessedTime,
          guessedRegEx: data[key].guessedRegEx,
          level: data[key].level
        })
      }
      setFilteredData(userProgressTransformed)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }


  const delayedQuery = useCallback(debounce(updateQuery, 500), [userQuery])

  useEffect(() => {
    userQuery.length && delayedQuery()

    return delayedQuery.cancel
  }, [userQuery, delayedQuery])

  useEffect(() => {
    onSearch(filteredData)
  }, [filteredData, onSearch])



  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={levels}
        getOptionLabel={(option) => option.level}
        getOptionSelected={(option, value) => option.level === value.level}
        onChange={(e: object, value: any | null) => {
            setUserQuery(value.map((selected: {level: string}) => selected.level))
           value.length === 0 && setFilteredData([])
          }}
 
       
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            data-testid="searchInput"
            variant="outlined"
            label="Choose one or multiple levels"
            placeholder="Sort by level"
          />
        )}
      />
    </div>
  )
}

export default LevelSelector
