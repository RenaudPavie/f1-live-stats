import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [infoFromAPI, setInfoFromAPI] = useState([]);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    useEffect(() => {
      fetch("https://ergast.com/api/f1/current.json",requestOptions)
        .then(res => res.json())
        .then(result => {
            setIsLoaded(true);
            setInfoFromAPI(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
    }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
