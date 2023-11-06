import { ReactComponent as ReactLogo } from './logo.svg'
import './App.css'

function App(): JSX.Element {
  let a = 3
  a++
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const b = a
  return (
    <div className="App">
      <header className="App-header">
        <ReactLogo className="App-logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reac
        </a>
      </header>
    </div>
  )
}

export default App
