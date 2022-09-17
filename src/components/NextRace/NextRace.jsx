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
    useEffect(() => {
      fetch("https://ergast.com/api/f1/current/next.json",requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result);
            setIsLoaded(true);
            setInfoFromAPI(result.MRData.RaceTable.Races[0]);
            let fixedDate = new Date(result.MRData.RaceTable.Races[0].date+'T'+result.MRData.RaceTable.Races[0].time)
            setLocalDate(fixedDate)
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }, [])

    const calculateTimeLeft = (d) => {
        const difference = d - new Date();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
        return timeLeft
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(localDate));
    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft(localDate));
        }, 1000);
        return () => clearTimeout(timer);
    });

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div className="nextRace">
                <h2>{infoFromAPI && infoFromAPI.raceName} - {infoFromAPI && infoFromAPI.Circuit.circuitName}</h2>
                <p>
                    {timeLeft && `${Object.keys(timeLeft).length === 0 ? 'Calculating...' : 
                        `J : ${timeLeft.days} H : ${timeLeft.hours} M : ${timeLeft.minutes} S : ${timeLeft.seconds}`
                    }`} 
                </p>
            </div>
        )
    }
}

export default NextRace