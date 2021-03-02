import React from 'react';
import rows from './StudyDirectionsData';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import { useSelector, useDispatch } from 'react-redux';

function StudyDirectionCoursesEntryRow({ entryIndex, entry }) {
  const dispatch = useDispatch();

  const { courseType, selectedCourseIndex, courses } = entry;

  const handleChange = (event) => {
    const selectedCourseIndex = event.target.value;
    dispatch({ type: 'SELECT_DIRECTION_COURSE', courseType, entryIndex, selectedCourseIndex })
  }

  const moveUp = (event) => {
    const selectedCourseIndex = event.target.value;
    dispatch({ type: 'MOVE_DIRECTION_COURSE', courseType, entryIndex, toIndex: entryIndex - 1 })
  }

  const moveDown = (event) => {
    const selectedCourseIndex = event.target.value;
    dispatch({ type: 'MOVE_DIRECTION_COURSE', courseType, entryIndex, toIndex: entryIndex + 1 })
  }

  return (
    <TableRow>
      <TableCell style={{ width: '5%', padding: 0 }}>
        <ButtonGroup variant="text" size="small" color="primary">
          <Button disabled={entryIndex === 0} onClick={moveUp}>
            <ArrowUpward />
          </Button>
          <Button disabled={entryIndex === 4} onClick={moveDown}>
            <ArrowDownward />
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell style={{ width: '5%' }}>#{entryIndex + 1}</TableCell>
      <TableCell>
        <Select
          className="Course-dropdown"
          onChange={handleChange}
          value={selectedCourseIndex !== -1 ? selectedCourseIndex : ''}
          autoWidth={true}
          disableUnderline
          displayEmpty
          renderValue={(i) => (
            (courses[i] && courses[i].directionName) ||
            <em>Izvēlies kursu ...</em>
          )}
        >
          <MenuItem value="">
            <em>Kurss nav izvēlēts</em>
          </MenuItem>
          {courses.map((course, i) =>
            <MenuItem
              key={course.directionName}
              value={i}
              disabled={course.disabled}
            >
              {course.directionName}
            </MenuItem>
          )}
        </Select>
      </TableCell>
    </TableRow>
  )
}

function StudyDirectionCourses({ entries, title }) {
  return (
    <Paper>
      <Table size="small" stickyHeader aria-label="Courses table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, entryIndex) =>
            <StudyDirectionCoursesEntryRow key={entryIndex} entryIndex={entryIndex} entry={entry} />
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

function StudyDirections({ onNextStep }) {
  const dispatch = useDispatch();
  const directionsData = useSelector(state => state.directionsData)
  const direction = useSelector(state => state.direction)
  const completed = direction
    && directionsData['Padziļinātie kursi'].filter(e => e.selectedCourseIndex >= 0).length >= 4;

  const selectDirection = (direction) => {
    dispatch({ type: 'SELECT_DIRECTION', direction })
  }

  const onNextStepWithCompletionCheckAndConfirm = () => {
    if (completed) {
      dispatch({ type: 'CONFIRM_DIRECTION_COURSES' })
      onNextStep()
    } else {
      window.alert(
        "Lai dotos uz otro soli, jābūt norādītiem vismaz četriem padziļinātajiem kursiem."
      )
    }
  }

  return (
    <React.Fragment>
      <h2 className="Block-title">
        Pirmais solis - izvēlies padziļinātos un specializētos kursus! 
      </h2>

      <Typography variant="body1" paragraph align="justify">
        Katram vidusskolēnam 12. klasē jāapgūst <b>trīs padziļinātie kursi</b>. Padziļinātos kursus skolēns izvēlas, iestājoties vidusskolā. Skolēnam ne vienmēr būs dota iespēja mainīt padziļinātos kursus mācību laikā, tādēļ lēmumiem par padziļināto kursu izvēli jābūt atbildīgiem.
      </Typography>
      <Typography variant="body1" paragraph align="justify">
        Svarīgi zināt, ka <b>divos no apgūtajiem</b> padziļinātajiem kursiem skolēnam būs jākārto valsts pārbaudes darbs. Skolēns pats izvēlas, kuros no apgūtajiem padziļinātajiem kursiem kārtot valsts pārbaudes darbus. Valsts pārbaudes darba rezultāti būs nozīmīgi, iestājoties izvēlētajās studiju programmās Latvijā un ārzemēs.
      </Typography>
      <Typography variant="body1" paragraph align="justify">
        Ogres 1. vidusskola piedāvās deviņus padziļinātos kursus - Latviešu valoda un literatūra II, Angļu valoda II, Sociālās zinātnes II, Fizika II, Ķīmija II, Bioloģija II, Matemātika II, Dizains un tehnoloģijas II, Programmēšana II.      
      </Typography>
      <Typography variant="body1" paragraph align="justify">
        Lai padziļinātos kursus varētu izvēlēties pārdomāti, esam norādījuši, kurus padziļinātos kursus ieteicams izvēlēties sekmīgām studijām dažādos studiju virzienos. Aicinām iedvesmoties no piemēriem! <b>Aicinām izvēlēties un sakārtot prioritātā secībā piecus interesantākos un nākotnei noderīgākos padziļinātos kursus, kurus vēlaties mācīties!</b>
      </Typography>
      <Typography variant="body1" paragraph align="justify">
        Līdztekus padziļinātajiem kursiem skolēnam ir iespēja izvēlēties <b>specializētos kursus vai fakultatīvos kursus</b>.
        Specializēto un fakultatīvo kursu izvēle un apguve ir brīvprātīga! Ogres 1. vidusskola piedāvās sešus
        specializētos vai fakultatīvos kursus - Spāņu valoda, Franču valoda, Filozofija, Uzņēmējdarbības pamati,
        Projektu vadība, Psiholoģija.
      </Typography>

      <h2 className="Block-title">
        Studiju virzieni un ieteikumi padziļināto kursu izvēlei
      </h2>

      <Typography variant="body1" paragraph align="justify" component="div">
        <ul className="Default-list">
          <li>
            Ogres 1. vidusskola piedāvās deviņus padziļinātos kursus - Latviešu valoda un literatūra II, Angļu valoda II, Sociālās zinātnes II, Fizika II, Ķīmija II, Bioloģija II, Matemātika II, Dizains un tehnoloģijas II, Programmēšana II.
          </li>
          <li>
            Skolēns nevar vienlaicīgi apgūt padziļināto kursu Dizains un tehnoloģijas II un Programmēšana II.
          </li>
          <li>
            Ogres 1. vidusskola piedāvās specializētos kursus - Spāņu valoda, Franču valoda, Filozofija, Uzņēmējdarbības pamati, Projektu vadība, Psiholoģija, Cilvēka bioloģija.
          </li>
        </ul>
      </Typography>

      <Typography variant="body1" paragraph align="justify">
        Lai atvieglotu padziļināto un specializēto kursu izvēli, esam sagatavojuši padziļināto un specializēto kursu ieteikumus katram no Latvijā piedāvātajiem studiju virzieniem. Šie ieteikumi var atvieglot padziļināto un specializēto kursu izvēli.
      </Typography>

      <Select
        autoWidth={true}
        style={{ width: '100%', marginBottom: '1rem' }}
        displayEmpty
        variant="outlined"
        value={direction || ""}
        renderValue={(row) => (row ? row.study_direction : <em>Izvēlies iespējamo studiju virzienu ...</em>)}
        onChange={(e) => selectDirection(e.target.value)}
      >
        {rows.map(row => (
          <MenuItem key={row.nr} value={row}>
            {row.study_direction}
          </MenuItem>
        ))}
      </Select>

      {direction &&
        <Box my={2}>
          <Paper>
            <Box bgcolor="grey.200" p={3}>
              <Typography variant="body1">
                {direction.recomendations}
              </Typography>
            </Box>
          </Paper>
        </Box>
      }

      {direction &&
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <StudyDirectionCourses entries={directionsData['Padziļinātie kursi']} title="Mana padziļināto kursu izvēle (prioritārā secībā)" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <StudyDirectionCourses entries={directionsData['Specializētie kursi']} title="Mana specializēto kursu izvēle (prioritārā secībā)" />
          </Grid>
        </Grid>
      }

      <Box className="Block-call-to-action">
        <Button
          variant={completed? "contained" : "outlined"}
          color="primary"
          onClick={onNextStepWithCompletionCheckAndConfirm}
        >
          Izvēli esmu veicis! Doties tālāk!
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default StudyDirections;
