import React, { useState } from 'react';
import rows from './StudyDirectionsData';
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
import { useSelector, useDispatch } from 'react-redux';

function StudyDirectionCoursesEntryRow({ entryIndex, entry }) {
  const dispatch = useDispatch();

  const { courseType, selectedCourseIndex, courses } = entry;

  const handleChange = (event) => {
    const selectedCourseIndex = event.target.value;
    dispatch({ type: 'SELECT_DIRECTION_COURSE', courseType, entryIndex, selectedCourseIndex })
  }

  return (
    <TableRow>
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
            (courses[i] && courses[i].courseName) ||
            <em>Izvēlies kursu ...</em>
          )}
        >
          {courses.map((course, i) =>
            <MenuItem
              key={course.courseName}
              value={i}
              disabled={course.disabled}
            >
              {course.courseName}
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
            <TableCell colSpan={2}>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, entryIndex) =>
            <StudyDirectionCoursesEntryRow entryIndex={entryIndex} entry={entry} />
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}


function StudyDirections() {
  const directionsData = useSelector(state => state.directionsData)
  const [selectedDirection, setSelectedDirection] = useState(undefined);

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

      <Select
        autoWidth={true}
        style={{ width: '100%', marginBottom: '1rem' }}
        displayEmpty
        variant="outlined"
        value={selectedDirection || ""}
        renderValue={(row) => (row ? row.study_direction : <em>Izvēlies virzienu ...</em>)}
        onChange={(e) => setSelectedDirection(e.target.value)}
      >
        {rows.map(row => (
          <MenuItem key={row.nr} value={row}>
            {row.study_direction}
          </MenuItem>
        ))}
      </Select>

      {selectedDirection &&
        <Typography variant="body1" paragraph>
          {selectedDirection.recomendations}
        </Typography>
      }

      {selectedDirection &&
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <StudyDirectionCourses entries={directionsData['Padziļinātie kursi']} title="Mana padzīļināto kursu ivēlē (prioritārā secībā)" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <StudyDirectionCourses entries={directionsData['Specializētie kursi']} title="Mana specializēto kursu ivēlē (prioritārā secībā)" />
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
}

export default StudyDirections;
