import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
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
    <Table aria-label="simple table">
      <TableBody>
        {entriesByCourseTypes.map(([courseType, entries]) =>
          <CoursesTypeRows courseType={courseType} entries={entries} />
        )}
      </TableBody>
    </Table>
  );
}
