import React, { useCallback, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import debounce from "lodash.debounce"
import { PROGRESS_URL } from "../urls.config"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
    margin: "30px auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

type progressFetchedData = {
  guessedWords: string[]
  guessedTime: string
  guessedRegEx: string
}

type searchFieldProps = {
  onSearch: (
    filteredResult: progressFetchedData[] | undefined,
    userQuery: string
  ) => void
}
const SearchField: React.FC<searchFieldProps> = (props) => {
  const classes = useStyles()
  const [userQuery, setUserQuery] = useState<string>("")
  const [filteredData, setFilteredData] = useState<
    progressFetchedData[] | undefined
  >([])

  const updateQuery = async () => {
    try {
      const response = await fetch(PROGRESS_URL)
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
        })
      }
      userQuery &&
        setFilteredData(
          userProgressTransformed!.filter(
            (item: progressFetchedData) =>
              item.guessedTime!.match(userQuery) !== null
          )
        )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const delayedQuery = useCallback(debounce(updateQuery, 500), [userQuery])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value)
    props.onSearch(filteredData, userQuery)
  }

  useEffect(() => {
    delayedQuery()

    return delayedQuery.cancel
  }, [userQuery, delayedQuery])

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by date or hour (format: dd.mm.yyyy, hh:mm:ss)"
        inputProps={{
          "aria-label": "Search by date or hour (format: dd.mm.yyyy, hh:mm:ss)",
        }}
        onChange={changeHandler}
        value={userQuery}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  )
}

export default SearchField
