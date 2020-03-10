import React from 'react';
import logo from './logo.png';
import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IntroText from './IntroText';
import StudyDirections from './StudyDirections';

import CoursesTable from './CoursesTable';

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

        <CoursesTable />

        <Box className="Block-call-to-action">
          <Button variant="contained" color="primary">
            Savu plānu esmu apskatījis! Vēlos to drukāt!
          </Button>
        </Box>

        <h2 className="Block-title">
          Trešais solis -  uzzini par mācībām un eksāmeniem vidusskolā!
        </h2>

      </Container>
    </div>
  );
}

export default App;
