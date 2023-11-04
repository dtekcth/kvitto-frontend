import logo from './logo.svg';
import './App.css';
import { MyButton } from './design-system/button/button';
import React from 'react';

function App() {
  var l: string = ""
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MyButton></MyButton>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
