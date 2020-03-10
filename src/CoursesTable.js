import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import data from './Courses.json';
import _groupBy from 'lodash/groupBy';
import _entries from 'lodash/entries';
import _times from 'lodash/times';

function CoursesRow({ entries }) {
  const [selectedEntry, setSelectedEntry] = useState(entries[0]);

  const handleChange = (event) => {
    const index = event.target.value;
    setSelectedEntry(entries[index]);
  }

  return (
    <TableRow>
      <TableCell>
        {  (entries.length > 1)
          ? <Select className="Course-dropdown" onChange={handleChange} value={entries.indexOf(selectedEntry)}>
              {entries.map((course, i) => {
                return (<MenuItem value={i}>{course.courseName}</MenuItem>)
              })}
            </Select>
          : <span>{entries[0].courseName}</span>
        }
      </TableCell>
      <TableCell>{selectedEntry.points10}</TableCell>
      <TableCell>{selectedEntry.points11}</TableCell>
      <TableCell>{selectedEntry.points12}</TableCell>
      <TableCell>{selectedEntry.points10 + selectedEntry.points11 + selectedEntry.points12}</TableCell>
    </TableRow>
  )
}

function CoursesRows({ entries }) {
  const repeat = entries[0].repeat;
  return (
    <React.Fragment>
      {_times(repeat).map((i) =>
        <CoursesRow key={i} entries={entries} />
      )}
    </React.Fragment>
  )
}

function CoursesTypeRows({ courseType, entries }) {
  const entriesByGroup = _entries(_groupBy(entries, (row) => row.group))
  return (
    <React.Fragment>
      <TableRow>
        <TableCell><strong>{courseType}</strong></TableCell>
        <TableCell>...</TableCell>
        <TableCell>...</TableCell>
        <TableCell>...</TableCell>
        <TableCell>...</TableCell>
      </TableRow>
      {entriesByGroup.map(([group, entries]) =>
        <CoursesRows key={group} entries={entries} />
      )}
    </React.Fragment>
  )
}

export default function CoursesTable() {
  const entriesByCourseTypes = _entries(_groupBy(data, (row) => row.courseType))
  return (
    <React.Fragment>
      <h2 className="Block-title">
        Otrais solis - iepazīsti individuālo plānu!
      </h2>

      <p>
        Individuālais mācību plāns ir teju gatavs! Zaļajos lauciņos vēl jāveic daža kursu izvēles. Apskati savu individuālo plānu. Ja vēlies, nosūti to sev uz e-pastu.
      </p>

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
            <TableCell>Mācību stundu kopskaits nedēļā</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesByCourseTypes.map(([courseType, entries]) =>
            <CoursesTypeRows courseType={courseType} entries={entries} />
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
