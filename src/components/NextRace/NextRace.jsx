import React, { useEffect, useState } from 'react'
import './NextRace.css'

function NextRace() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [infoFromAPI, setInfoFromAPI] = useState([]);
    const [localDate, setLocalDate] = useState(null);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const getLocalDate = (d,t) => {
        let newLocalDate = new Date(d+"T"+t).toLocaleString("fr-FR", {timeZone: "Europe/Paris"})
        return newLocalDate
    }
    useEffect(() => {
      fetch("https://ergast.com/api/f1/current/next.json",requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setInfoFromAPI(result.MRData.RaceTable.Races[0]);
            setLocalDate(getLocalDate(result.MRData.RaceTable.Races[0].date,result.MRData.RaceTable.Races[0].time))

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
            <div className="nextRace">
                {console.log(infoFromAPI)}
                <p>{infoFromAPI && infoFromAPI.raceName} - {infoFromAPI && infoFromAPI.Circuit.circuitName}</p>
                <p>{localDate && localDate}</p>
            </div>
        )
    }
}

export default NextRace