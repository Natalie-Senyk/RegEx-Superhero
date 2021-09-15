import React from "react"
import { Route } from "react-router-dom"
import Layout from "./UI/Layout"
import Main from "./pages/Main"
import RegexContextProvider from "./store/regex-context"
import Logout from "./pages/Logout"

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
        <Route></Route>
      </Layout>
    </RegexContextProvider>
  )
}

export default App
