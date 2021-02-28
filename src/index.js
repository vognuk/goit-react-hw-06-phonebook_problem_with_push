import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

import store from './redux/store'
import { action } from './redux/actions'
import { Provider } from 'react-redux'

// console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/* {renderDevTools(store)} */}
  </React.StrictMode>,
  document.getElementById("root")
);
