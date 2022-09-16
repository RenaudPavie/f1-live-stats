import React, { useEffect, useState } from 'react'
import './NextRace.css'

function NextRace(props) {
    const data = props.data
    const [raceDate, setRaceDate] = useState(null);
    
    useEffect(() => {
        if(data.Races !== undefined) {
            const nextRaceToCome = data.Races.filter(x => new Date(x.date) > new Date())
            setRaceDate(nextRaceToCome[0])
        }
    },[data])

    return (
        <div className="nextRace">
            <p>{raceDate && raceDate.raceName} - {raceDate && raceDate.Circuit.circuitName}</p>
            <p>{raceDate && raceDate.date} - {raceDate && raceDate.time}</p>
        </div>
    )
}

export default NextRace