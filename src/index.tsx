import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import RegexContextProvider from "./store/regex-context"
import AuthContextProvider from "./store/auth-context"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <RegexContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </RegexContextProvider>,
  document.getElementById("root")
)
