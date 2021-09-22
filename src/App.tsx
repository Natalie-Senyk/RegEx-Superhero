import { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Layout from "./UI/Layout"
import Main from "./pages/Main"
import Logout from "./pages/Logout"
import Progress from "./pages/Progress"

import { AuthContext } from "./store/auth-context"

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login">
          <Logout />
        </Route>
        <Route path="/progress">
          {authCtx.token !== null && <Progress />}
          {authCtx.token === null && <Redirect to="/login" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
