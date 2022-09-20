import React, { useEffect, useState } from "react";
import "./DriversRanking.css";

import Table from "react-bootstrap/Table";

function DriversRanking() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [infoFromAPI, setInfoFromAPI] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/driverStandings.json", {
      method: "GET",
      redirect: "follow",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const data =
            result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          setInfoFromAPI(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="DriversRanking">
        <Table bordered variant="dark">
          <thead>
            <tr>
              <th>Position</th>
              <th>Drivers</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {infoFromAPI &&
              infoFromAPI.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.position}</td>
                    <td>{data.Driver.code}</td>
                    <td>{data.Constructors[0].name}</td>
                    <td>{data.points}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DriversRanking;
