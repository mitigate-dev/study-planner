import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { useSelector, useDispatch } from 'react-redux';
import _entries from 'lodash/entries';
import _sumBy from 'lodash/sumBy';
import _flatMap from 'lodash/flatMap';
import _values from 'lodash/values';

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
    style.backgroundColor = green[50];
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
  return (
    <TableRow>
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
          <TableCell>10. klase</TableCell>
          <TableCell>11. klase</TableCell>
          <TableCell>12. klase</TableCell>
          <TableCell>Kopā</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Mācību stundu kopskaits nedēļā</strong></TableCell>
          <TableCell><strong><Points value={points10} max={36} /></strong></TableCell>
          <TableCell><strong><Points value={points11} max={36} /></strong></TableCell>
          <TableCell><strong><Points value={points12} max={36} /></strong></TableCell>
          <TableCell><strong><Points value={totalPoints} /></strong>
          </TableCell>
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

export default function Courses() {
  return (
    <React.Fragment>
      <h2 className="Block-title">
        Otrais solis - iepazīsti individuālo plānu!
      </h2>

      <p>
        Individuālais mācību plāns ir teju gatavs! Zaļajos lauciņos vēl jāveic daža kursu izvēles. Apskati savu individuālo plānu. Ja vēlies, nosūti to sev uz e-pastu.
      </p>

      <CoursesTable />
    </React.Fragment>
  );
}
