import "../styles/header.css";
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="App-title">MyToDo</div>
      <nav className="header-menu">
        <li className="header-content">
          <a href="/">home</a>
        </li>
        <li className="header-content">
          <a href="/HowTo">使い方</a>
        </li>
      </nav>
    </div>
  );
}
export default Header;
