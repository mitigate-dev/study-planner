import React from 'react';
import logo from './logo.png';
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import store from './store';
import IntroText from './IntroText';
import StudyDirections from './StudyDirections';
import Courses from './Courses';
import { useHistory, useRouteMatch } from "react-router-dom";

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

      <StudyDirections onNextStep={onNextStep} />
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

      <Typography variant="body1" paragraph>
        Šajā sadaļā būs informatīvs teksts par mācībām un eksāmeniem vidusskolā. Šajā sadaļā svarīgi ievietot Valsts pārbaudes darbu plānotāju:
      </Typography>
    </React.Fragment>
  )
}

function Content() {
  const match = useRouteMatch("/:step");
  const activeStep = match ? parseInt(match.params.step, 10) : 0;
  const history = useHistory();

  return (
    <React.Fragment>
      {activeStep === 0 && <h1 className="Block-title">Izveido savu vidusskolu!</h1>}

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

      {activeStep === 0 && <Step1 onNextStep={() => { history.push("/1"); window.scrollTo(0, 0) }} />}
      {activeStep === 1 && <Step2 onNextStep={() => { history.push("/2"); window.scrollTo(0, 0) }} />}
      {activeStep === 2 && <Step3 />}
    </React.Fragment>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Container maxWidth="md">

              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>

              <Content />

            </Container>
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
