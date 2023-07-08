import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Header from './components/Header';
import Main from './components/Main';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <div style={{padding: "30px"}}>
      <Main />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);