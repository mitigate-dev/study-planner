import React from 'react';
import logo from './logo.png';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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

        <Box className="Block-call-to-action">
          <Button variant="contained" color="primary">
            Izvēli esmu veicis! Doties tālāk!
          </Button>
        </Box>

        <h2 className="Block-title">
          Otrais solis - iepazīsti individuālo plānu!
        </h2>

        <p>
          Individuālais mācību plāns ir teju gatavs! Zaļajos lauciņos vēl jāveic daža kursu izvēles. Apskati savu individuālo plānu. Ja vēlies, nosūti to sev uz e-pastu.
        </p>

        {/* TODO : TE NĀK EBE BLOKS */}

      </Container>
    </div>
  );
}

export default App;
