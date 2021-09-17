import React from "react"
import { Route } from "react-router-dom"
import Layout from "./UI/Layout"
import Main from "./pages/Main"
import RegexContextProvider from "./store/regex-context"
import Logout from "./pages/Logout"
import ProgressList from "./pages/Progress"

function App() {
  return (
    <RegexContextProvider>
      <Layout>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/progress">
          <ProgressList />
        </Route>
      </Layout>
    </RegexContextProvider>
  )
}

export default App
