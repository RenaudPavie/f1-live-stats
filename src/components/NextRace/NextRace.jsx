import React, { useEffect, useState } from 'react'
import './NextRace.css'

function NextRace() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [infoFromAPI, setInfoFromAPI] = useState([]);
    const [localDate, setLocalDate] = useState([
        {
            session: '',
            date: ''
        }
    ]);
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const getNextSession = (arr) => {
        arr.sort((a,b)=>a.date - b.date);
        let newArr = arr.filter(x => {
            return x.date > new Date()
        })
        return newArr
    }
    useEffect(() => {
      fetch("https://ergast.com/api/f1/current/next.json",requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
            // console.log(result);
            setIsLoaded(true);
            const data = result.MRData.RaceTable.Races[0];
            setInfoFromAPI(data);
            let firstPracticeDate = new Date(data.FirstPractice.date+'T'+data.FirstPractice.time)
            let secondPracticeDate = new Date(data.SecondPractice.date+'T'+data.SecondPractice.time)
            let qualifyingDate = new Date(data.Qualifying.date+'T'+data.Qualifying.time)
            let raceDate = new Date(data.date+'T'+data.time)
            const dateArr = [
                {
                    session : 'FP1',
                    date: firstPracticeDate
                },
                {
                    session : 'FP2',
                    date: secondPracticeDate
                },
                {
                    session : 'Qualifs',
                    date: qualifyingDate
                },
                {
                    session : 'Course',
                    date: raceDate
                }
            ]
            if (data.hasOwnProperty('ThirdPractice')) {
                let thirdPracticeDate = new Date(data.ThirdPractice.date+'T'+data.ThirdPractice.time)
                dateArr.push(
                {
                    session : 'FP3',
                    date: thirdPracticeDate
                })
            }
            if (data.hasOwnProperty('Sprint')) {
                let sprintRaceDate = new Date(data.Sprint.date+'T'+data.Sprint.time)  
                dateArr.push(
                    {
                        session : 'Sprint',
                        date: sprintRaceDate
                    })
            }
            let filteredArray = getNextSession(dateArr)
            console.log(filteredArray)
            // setLocalDate(raceDate)
            setLocalDate(filteredArray)
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }, [])

    const calculateTimeLeft = (d) => {
        const difference = d[0].date - new Date();
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
                <p><strong>{localDate && localDate[0].session}</strong> - 
                    {timeLeft && `${Object.keys(timeLeft).length === 0 ? 'En cours de calcul...' : 
                        ` J : ${timeLeft.days} H : ${timeLeft.hours} M : ${timeLeft.minutes} S : ${timeLeft.seconds}`
                    }`} 
                </p>
            </div>
        )
    }
}

export default NextRace