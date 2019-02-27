import React from "react";
import ReactDOM from "react-dom";
import "./Components/index.css";
import Main from "./main.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root")
);
