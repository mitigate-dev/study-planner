import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { useSelector, useDispatch } from 'react-redux';
import _entries from 'lodash/entries';
import _sumBy from 'lodash/sumBy';
import _flatMap from 'lodash/flatMap';
import _values from 'lodash/values';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CoursesPDF from './CoursesPDF';

const useStyles = makeStyles({
  headerRowCell: {
    backgroundColor: '#0B5F87',
    color: '#fff',
  },
  courseTypeRow: {
    backgroundColor: grey[100]
  }
});

const nullCourse = {
  points10: 0,
  points11: 0,
  points12: 0
}

function CoursesEntryRow({ courseType, entryIndex, selectedCourseIndex, courses }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedCourseIndex = event.target.value;
    dispatch({ type: 'SELECT_COURSE', courseType, entryIndex, selectedCourseIndex })
  }

  const selectedCourse = courses[selectedCourseIndex] || nullCourse;

  let style = {};

  if (courses.length > 1) {
    style.backgroundColor = blue[50];
  }

  return (
    <TableRow style={style}>
      <TableCell>
        {  (courses.length > 1)
          ? <Select
              className="Course-dropdown"
              onChange={handleChange}
              value={selectedCourseIndex}
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
                  <span style={{width: '355px' }}>{course.courseName}</span>
                  <span style={{width: '147px' }}>{course.points10}</span>
                  <span style={{width: '147px' }}>{course.points11}</span>
                  <span style={{width: '147px' }}>{course.points12}</span>
                </MenuItem>
              )}
            </Select>
          : <span>{selectedCourse.courseName}</span>
        }
      </TableCell>
      <TableCell>{selectedCourse.points10}</TableCell>
      <TableCell>{selectedCourse.points11}</TableCell>
      <TableCell>{selectedCourse.points12}</TableCell>
      <TableCell>{selectedCourse.points10 + selectedCourse.points11 + selectedCourse.points12}</TableCell>
    </TableRow>
  )
}

function CoursesTypeRow({ courseType, entries }) {
  const selectedCourses = entries.map((e) => e.courses[e.selectedCourseIndex] || nullCourse)
  const points10 = _sumBy(selectedCourses, (sc) => sc.points10)
  const points11 = _sumBy(selectedCourses, (sc) => sc.points11)
  const points12 = _sumBy(selectedCourses, (sc) => sc.points12)
  const classes = useStyles();

  return (
    <TableRow className={classes.courseTypeRow}>
      <TableCell><strong>{courseType}</strong></TableCell>
      <TableCell><strong>{points10}</strong></TableCell>
      <TableCell><strong>{points11}</strong></TableCell>
      <TableCell><strong>{points12}</strong></TableCell>
      <TableCell><strong>{points10 + points11 + points12}</strong></TableCell>
    </TableRow>
  )
}

function Points({value, max}) {
  if (!max || value <= max) return value;

  return (
    <Tooltip title={`Punktu skaits nedrīkst pārsniegt ${max}`}>
      <span style={{ color: red[500] }}>
        {value}
      </span>
    </Tooltip>
  );
}

function CoursesTable() {
  const classes = useStyles();

  const rows = useSelector(state => state.coursesData)

  const selectedCourses = _flatMap(_values(rows)).map((e) => e.courses[e.selectedCourseIndex] || nullCourse)
  const points10 = _sumBy(selectedCourses, (sc) => sc.points10)
  const points11 = _sumBy(selectedCourses, (sc) => sc.points11)
  const points12 = _sumBy(selectedCourses, (sc) => sc.points12)
  const totalPoints = points10 + points11 + points12

  return (
    <Table component={Paper} size="small" stickyHeader aria-label="Courses table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell><strong>10. kl.</strong></TableCell>
          <TableCell><strong>11. kl.</strong></TableCell>
          <TableCell><strong>12. kl.</strong></TableCell>
          <TableCell><strong>Kopā</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerRowCell}><strong>Mācību stundu kopskaits nedēļā</strong></TableCell>
          <TableCell className={classes.headerRowCell}><strong><Points value={points10} max={36} /></strong></TableCell>
          <TableCell className={classes.headerRowCell}><strong><Points value={points11} max={36} /></strong></TableCell>
          <TableCell className={classes.headerRowCell}><strong><Points value={points12} max={36} /></strong></TableCell>
          <TableCell className={classes.headerRowCell}><strong><Points value={totalPoints} /></strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {_entries(rows).map(([courseType, entries]) =>
          <React.Fragment key={courseType}>
            <CoursesTypeRow courseType={courseType} entries={entries} />
            {entries.map((entry, i) =>
              <CoursesEntryRow key={i} courseType={courseType} entryIndex={i} {...entry} />
            )}
          </React.Fragment>
        )}
      </TableBody>
    </Table>
  )
}

function CoursesButtons({ onNextStep }) {
  const rows = useSelector(state => state.coursesData)
  const [downloadLinkReady, setDownloadLinkReady] = useState(false);

  const document = <CoursesPDF rows={rows} />;

  return (
    <Box className="Block-call-to-action">
      {downloadLinkReady || 'Lūdzu uzgaidiet...'}
      <PDFDownloadLink document={document} fileName="plans.pdf">
        {({ blob, url, loading, error }) => {
          if (loading) return;
          setDownloadLinkReady(true)
          return (
            <Button variant="contained" color="primary">
              Saglabāt PDF
            </Button>
          )
        }}
      </PDFDownloadLink>
      &nbsp;
      {downloadLinkReady &&
        <Button variant="contained" color="primary" onClick={onNextStep}>
          Vēlos uzzināt vairāk
        </Button>
      }
    </Box>
  )
}

export default function Courses({ onNextStep }) {
  return (
    <React.Fragment>
      <h2 className="Block-title">
        Otrais solis - iepazīsti individuālo plānu!
      </h2>

      <p>
        Individuālais mācību plāns ir teju gatavs! Zilajos lauciņos vēl jāveic daža kursu izvēles. Apskati savu individuālo plānu. Ja vēlies, izdrukā vai saglabā PDF failā.
      </p>

      <CoursesTable />
      <CoursesButtons onNextStep={onNextStep} />
    </React.Fragment>
  );
}
