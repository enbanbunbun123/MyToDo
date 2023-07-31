import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <Header />
      <Main className="Content" />
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById("root"),
);
