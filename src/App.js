import React from 'react';
import logo from './logo.png';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IntroText from './IntroText';
import StudyDirections from './StudyDirections';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <h1 className="Block-title">
          Izveido savu vidusskolu!
        </h1>
        <h2 className="Block-title">
          Pirmais solis - izvēlies padziļinātos un specializētos kursus! 
        </h2>

        <IntroText />

        <StudyDirections />

      </Container>
    </div>
  );
}

export default App;
