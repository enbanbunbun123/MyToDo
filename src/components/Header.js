import '../styles/header.css'
import React from 'react'

function Header() {
  return (
    <div className='header'>
      <div className='App-title'>ToDo App</div>
      <nav className='header-menu'>
        <li className='header-content'><a>home</a></li>
        <li className='header-content'><a>how to</a></li>
      </nav>
    </div>
  );
}
export default Header;
