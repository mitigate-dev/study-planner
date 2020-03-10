import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import data from './Courses.json';
import _groupBy from 'lodash/groupBy';
import _entries from 'lodash/entries';
import _times from 'lodash/times';

function CoursesRow({ entries }) {
  const repeat = entries[0].repeat;
  return (
    <React.Fragment>
      {_times(repeat).map((i) =>
        <TableRow key={i}>
          <TableCell>
            {entries.map((e) => e.courseName).join(', ')}
          </TableCell>
        </TableRow>
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
      </TableRow>
      {entriesByGroup.map(([group, entries]) =>
        <CoursesRow key={group} entries={entries} />
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

      <Table component={Paper} aria-label="Courses table">
        <TableBody>
          {entriesByCourseTypes.map(([courseType, entries]) =>
            <CoursesTypeRows courseType={courseType} entries={entries} />
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
