import logo from "./logo.svg";
import "./App.css";
import NextRace from "./components/NextRace/NextRace";
import DriversRanking from "./components/DriversRanking/DriversRanking";
import ConstructorsRanking from "./components/ConstructorsRanking/ConstructorsRanking";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
        <Row>
          <Col>
            <NextRace />
          </Col>
          <Col>
            <DriversRanking />{" "}
          </Col>
          <Col>
            <ConstructorsRanking />{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
