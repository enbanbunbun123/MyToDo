import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Header from "./components/Header";
import Main from "./Main";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <div style={{ padding: "30px" }}>
      <Main />
    </div>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root"),
);
