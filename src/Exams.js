import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CoursesPDF from './CoursesPDF';

function ExamsRow({ examIndex, exam }) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const selected = event.target.checked;
    dispatch({ type: 'TOGGLE_EXAM', examIndex, selected })
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          color="primary"
          disabled={exam.disabled}
          checked={exam.selected}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>{exam.points12 ? '12' : '11'}</TableCell>
      <TableCell>{exam.courseName}</TableCell>
    </TableRow>
  )
}

function ExamsTable({ exams }) {
  return (
    <Paper>
      <Table size="small" stickyHeader aria-label="Exams table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5%' }}>Kārtot?</TableCell>
            <TableCell style={{ width: '5%' }}>Klase</TableCell>
            <TableCell>Eksāmens</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exams.map((exam, examIndex) =>
            <ExamsRow key={examIndex} examIndex={examIndex} exam={exam} />
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

function ExamsButtons({ onPrevStep }) {
  const rows = useSelector(state => state.coursesData)

  const document = <CoursesPDF rows={rows} />;

  return (
    <Box className="Block-call-to-action">
      <Button variant="outlined" color="primary" onClick={onPrevStep}>
        Atgriezties uz 2. soli
      </Button>
      &nbsp;
      <PDFDownloadLink document={document} fileName="plans.pdf">
        {({ blob, url, loading, error }) => {
          if (loading) return 'Lūdzu uzgaidiet...';
          return (
            <Button variant="contained" color="primary">
              Atvērt PDF formātā, lai drukātu vai saglabātu
            </Button>
          )
        }}
      </PDFDownloadLink>
    </Box>
  )
}

export default function Exams({ onPrevStep }) {
  const exams = useSelector(state => state.examsData);
  const advancedExams = exams.filter(e => e.courseType === "Padziļinātie kursi")
  const basicExams    = exams.filter(e => e.courseType !== "Padziļinātie kursi")

  return (
    <React.Fragment>
      <h2 className="Block-title">
        Trešais solis -  uzzini par mācībām un eksāmeniem vidusskolā!
      </h2>

      <Typography variant="body1" paragraph>
        Šajā sadaļā būs informatīvs teksts par mācībām un eksāmeniem vidusskolā.
      </Typography>

      <h3 className="Block-title">
        Valsts pārbaudes darbs padziļinātajā kursā (izvēlies divus)
      </h3>

      <ExamsTable exams={advancedExams} />

      <h3 className="Block-title">
        Valsts pārbaudes darbs pamatkursā
      </h3>

      <ExamsTable exams={basicExams} />

      <ExamsButtons onPrevStep={onPrevStep} />
    </React.Fragment>
  );
}