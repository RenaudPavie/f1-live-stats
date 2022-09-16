import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'
import NextRace from './components/NextRace/NextRace'

function App() {
    const [infoFromAPI, setInfoFromAPI] = useState([]);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    useEffect(() => {
      fetch("https://ergast.com/api/f1/current.json",requestOptions)
        .then(res => res.json())
        .then(result => {
            setInfoFromAPI(result.MRData.RaceTable);
        })
    }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NextRace data={infoFromAPI} /> 
    </div>
  );
}

export default App;
