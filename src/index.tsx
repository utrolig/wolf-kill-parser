import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({ palette: { type: "dark" } });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
