import logo from './logo.svg';
import './App.css';
import Terminal from "./terminal/Terminal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Terminal
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
