import React from "react"
import { Route } from "react-router-dom"
import Layout from "./UI/Layout"
import Main from "./pages/Main"

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route></Route>
        <Route></Route>
      </Layout>
    </div>
  )
}

export default App
