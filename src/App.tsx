import React from "react"
import { Route, Switch } from "react-router-dom"
import Layout from "./UI/Layout"
import Main from "./pages/Main"
import RegexContextProvider from "./store/regex-context"
import Logout from "./pages/Logout"
import Progress from "./pages/Progress"
import Error from "./pages/Error"

function App() {
  return (
    <RegexContextProvider>
      <Layout>
        <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/progress">
          <Progress />
        </Route>
        <Route component={Error}/>
        </Switch>
    
      </Layout>
    </RegexContextProvider>
  )
}

export default App
