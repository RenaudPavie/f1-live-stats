import logo from './logo.svg';
import './App.css';
import NextRace from './components/NextRace/NextRace'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NextRace /> 
    </div>
  );
}

export default App;
