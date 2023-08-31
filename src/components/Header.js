import { Link } from "react-router-dom";
import "../styles/header.css";
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="App-title">
        <img className="header-box-logo" src="./box-logo.png" alt="My ToDo"></img>
      </div>
      <nav className="header-menu">
        <li className="header-content">
          <Link to="/HowTo">使い方</Link>
        </li>
        <li className="header-content">
          <Link to="/">home</Link>
        </li>
        <li className="header-content"> 
          <Link to="/Graph">達成グラフ</Link>
        </li>
      </nav>
    </div>
  );
}
export default Header;
