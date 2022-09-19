import React, { useEffect, useState } from 'react'
import './DriversRanking.css'

function DriversRanking() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [infoFromAPI, setInfoFromAPI] = useState([]);
   
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    useEffect(() => {
      fetch("https://ergast.com/api/f1/current/driverStandings.json",requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            const data = result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setInfoFromAPI(data);  
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }, [])



    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div className="DriversRanking">
                <table>
                    <tbody>
                        {infoFromAPI && infoFromAPI.map((data,index) => {
                            return <tr key={index}>
                                <td>{data.Driver.code}</td>
                                <td>{data.Constructors[0].name}</td>
                                <td>{data.position}</td>
                                <td>{data.points}</td>
                                </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DriversRanking