import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function Exams() {
  const exams = useSelector(state => state.examsData)

  return (
    <React.Fragment>
      <h2 className="Block-title">
        Trešais solis -  uzzini par mācībām un eksāmeniem vidusskolā!
      </h2>

      <Typography variant="body1" paragraph>
        Šajā sadaļā būs informatīvs teksts par mācībām un eksāmeniem vidusskolā. Šajā sadaļā svarīgi ievietot Valsts pārbaudes darbu plānotāju:
      </Typography>

      <Paper>
        <Table size="small" stickyHeader aria-label="Exams table">
          <TableHead>
            <TableRow>
              <TableCell>Kārtot?</TableCell>
              <TableCell>Eksāmens</TableCell>
              <TableCell>Klase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam, i) =>
              <TableRow key={i}>
                <TableCell>
                  <Checkbox
                    color="primary"
                    disabled={exam.disabled}
                    checked={exam.selected}
                  />
                </TableCell>
                <TableCell>{exam.courseName}</TableCell>
                <TableCell>{exam.points12 ? '12' : '11'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}
