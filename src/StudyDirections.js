import React from 'react';
import './App.css';
import rows from './StudyDirectionsData';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function StudyDirections() {
  return (
    <React.Fragment>
      <h2 className="Block-title">
        Studiju virzieni un ieteikumi padziļināto kursu izvēlei
      </h2>

      <ul className="Default-list">
        <li>
          Ogres 1. vidusskola piedāvās deviņus padziļinātos kursus - Latviešu valoda un literatūra II, Angļu valoda II, Sociālās zinātnes II, Fizika II, Ķīmija II, Bioloģija II, Matemātika II, Dizains un tehnoloģijas II, Programmēšana II.
        </li>
        <li>
          Skolēns nevar vienlaicīgi apgūt padziļināto kursu Dizains un tehnoloģijas II un Programmēšana II.
        </li>
        <li>
          Skolēniem tiks piedāvāts vai nu padziļinātais kurss Ķīmija II, vai arī padziļinātais kurss Bioloģija II; skolas piedāvājums atkarīgs no skolēnu intereses par šiem kursiem.
        </li>
        <li>
          Ogres 1. vidusskola piedāvās specializētos kursus - Spāņu valoda, Franču valoda, Filozofija, Uzņēmējdarbības pamati, Projektu vadība, Psiholoģija, Cilvēka bioloģija.
        </li>
      </ul>

      <TableContainer component={Paper}>
        <Table aria-label="Study directions table">
          <TableHead>
            <TableRow>
              <TableCell>N.p.k</TableCell>
              <TableCell>Studiju virziens</TableCell>
              <TableCell>Ieteikumi padziļināto un specializēto kursu izvēlei</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.nr}>
                <TableCell>{row.nr}</TableCell>
                <TableCell>{row.study_direction}</TableCell>
                <TableCell>{row.recomendations}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>      
    </React.Fragment>
  );
}

export default StudyDirections;
