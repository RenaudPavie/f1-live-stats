import logo from './logo.svg';
import './App.css';
import NextRace from './components/NextRace/NextRace'
import DriversRanking from './components/DriversRanking/DriversRanking'
import ConstructorsRanking from './components/ConstructorsRanking/ConstructorsRanking'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NextRace /> 
      <DriversRanking /> 
      <ConstructorsRanking /> 
    </div>
  );
}

export default App;
