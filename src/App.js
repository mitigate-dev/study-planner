import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Provider } from 'react-redux';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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

function Step1({ onNextStep }) {
  return (
    <React.Fragment>
      <h2 className="Block-title">
        Pirmais solis - izvēlies padziļinātos un specializētos kursus! 
      </h2>

      <IntroText />

      <StudyDirections />

      <Box className="Block-call-to-action">
        <Button variant="contained" color="primary" onClick={onNextStep}>
          Izvēli esmu veicis! Doties tālāk!
        </Button>
      </Box>
    </React.Fragment>
  )
}

function Step2({ onNextStep }) {
  return (
    <React.Fragment>
      <Courses onNextStep={onNextStep} />
    </React.Fragment>
  )
}

function Step3({ onNextStep }) {
  return (
    <React.Fragment>
      <h2 className="Block-title">
        Trešais solis -  uzzini par mācībām un eksāmeniem vidusskolā!
      </h2>

      <p>
        Šajā sadaļā būs informatīvs teksts par mācībām un eksāmeniem vidusskolā. Šajā sadaļā svarīgi ievietot Valsts pārbaudes darbu plānotāju:
      </p>
    </React.Fragment>
  )
}

function Content() {
  const defaultStep = parseInt(window.location.hash.substr(1), 10) || 0;
  const [activeStep, setActiveStep] = useState(defaultStep);

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key="1">
          <StepLabel>Izvēlies padziļinātos un specializētos kursus</StepLabel>
        </Step>
        <Step key="2">
          <StepLabel>Iepazīsti individuālo plānu</StepLabel>
        </Step>
        <Step key="3">
          <StepLabel>Uzzini par mācībām un eksāmeniem vidusskolā</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && <Step1 onNextStep={() => { setActiveStep(1); window.scrollTo(0, 0) }} />}
      {activeStep === 1 && <Step2 onNextStep={() => { setActiveStep(2); window.scrollTo(0, 0) }} />}
      {activeStep === 2 && <Step3 />}
    </React.Fragment>
  )
}

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

            <Content />

          </Container>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
