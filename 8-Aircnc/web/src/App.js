import React from "react";
import Routes from "./Routes";
import "./App.css";

import logo from "./assets/logo.svg";

require("dotenv/config");

export default function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo AirCnC" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

// "eslintConfig": {
//   "extends": "react-app"
// },
