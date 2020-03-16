import React from 'react';
import logo from './logo.png';
import './App.css';
import { Provider } from 'react-redux';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import store from './store';
import IntroText from './IntroText';
import StudyDirections from './StudyDirections';
import Courses from './Courses';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#0B5F87',
      main: '#0B5F87',
      dark: '#053c57',
      contrastText: '#fff'
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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

            <Courses />

            <Box className="Block-call-to-action">
              <Button variant="contained" color="primary" onClick={() => window.print()}>
                Savu plānu esmu apskatījis! Vēlos to drukāt!
              </Button>
            </Box>

            <h2 className="Block-title">
              Trešais solis -  uzzini par mācībām un eksāmeniem vidusskolā!
            </h2>

            <p>
              Šajā sadaļā būs informatīvs teksts par mācībām un eksāmeniem vidusskolā. Šajā sadaļā svarīgi ievietot Valsts pārbaudes darbu plānotāju:
            </p>

          </Container>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
