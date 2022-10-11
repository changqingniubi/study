import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <button onClick={props.dispatchMake}>
          发送异步action
        </button>
      </div>
    </div>
  );
}
export default App;
