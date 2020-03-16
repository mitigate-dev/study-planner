import React from 'react';
import { Document, Page, View, Text, Font, StyleSheet } from '@react-pdf/renderer';
import _entries from 'lodash/entries';
import _sumBy from 'lodash/sumBy';
import _flatMap from 'lodash/flatMap';
import _values from 'lodash/values';

// curl "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap&subset=latin-ext"
Font.register({
  family: 'Roboto',
  fontWeight: 500,
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxP.ttf'
});
Font.register({
  family: 'Roboto',
  fontWeight: 700,
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfChc9.ttf'
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 50,
    fontSize: 12,
    fontWeight: 500
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderColor: '#bfbfbf',
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCell: { 
    width: "25%", 
    borderStyle: "solid", 
    borderColor: '#bfbfbf',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCellText: {
    margin: 5,
    fontWeight: 500
  },  
  tableCellBoldText: {
    margin: 5,
    fontWeight: 700
  },
});

const Table = ({children}) =>
  <View style={styles.table}>{children}</View>;
const TableRow = ({children}) =>
  <View style={styles.tableRow}>{children}</View>;
const TableCell = ({children, width}) =>
  <View style={[styles.tableCell, { width }]}>
    <Text style={styles.tableCellText}>{children}</Text>
  </View>;
const TableHeadCell = ({children, width}) =>
  <View style={[styles.tableCell, { width }]}>
    <Text style={styles.tableCellBoldText}>{children}</Text>
  </View>;

const nullCourse = {
  courseName: '?',
  points10: 0,
  points11: 0,
  points12: 0
}

export default function CoursesPDF({ rows }) {
  const selectedCourses = _flatMap(_values(rows)).map((e) => e.courses[e.selectedCourseIndex] || nullCourse)
  const points10 = _sumBy(selectedCourses, (sc) => sc.points10)
  const points11 = _sumBy(selectedCourses, (sc) => sc.points11)
  const points12 = _sumBy(selectedCourses, (sc) => sc.points12)
  const totalPoints = points10 + points11 + points12

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Table>
            <TableRow>
              <TableHeadCell width="40%"></TableHeadCell>
              <TableHeadCell width="15%">10. klase</TableHeadCell>
              <TableHeadCell width="15%">11. klase</TableHeadCell>
              <TableHeadCell width="15%">12. klase</TableHeadCell>
              <TableHeadCell width="15%">Kopā</TableHeadCell>
            </TableRow>
            <TableRow>
              <TableHeadCell width="40%">Mācību stundu kopskaits nedēļā</TableHeadCell>
              <TableHeadCell width="15%">{points10}</TableHeadCell>
              <TableHeadCell width="15%">{points11}</TableHeadCell>
              <TableHeadCell width="15%">{points12}</TableHeadCell>
              <TableHeadCell width="15%">{totalPoints}</TableHeadCell>
            </TableRow>
            {_entries(rows).map(([courseType, entries]) =>
              <React.Fragment key={courseType}>
                <TableRow>
                  <TableHeadCell width="40%">{courseType}</TableHeadCell>
                  <TableHeadCell width="15%"></TableHeadCell>
                  <TableHeadCell width="15%"></TableHeadCell>
                  <TableHeadCell width="15%"></TableHeadCell>
                  <TableHeadCell width="15%"></TableHeadCell>
                </TableRow>
                {entries.map((entry, i) => {
                  const selectedCourse = entry.courses[entry.selectedCourseIndex] || nullCourse;
                  return (
                    <TableRow key={i}>
                      <TableCell width="40%">{selectedCourse.courseName}</TableCell>
                      <TableCell width="15%">{selectedCourse.points10}</TableCell>
                      <TableCell width="15%">{selectedCourse.points11}</TableCell>
                      <TableCell width="15%">{selectedCourse.points12}</TableCell>
                      <TableCell width="15%">{selectedCourse.points10 + selectedCourse.points11 + selectedCourse.points12}</TableCell>
                    </TableRow>
                  )
                })}
              </React.Fragment>
            )}
          </Table>
        </View>
      </Page>
    </Document>
  )
}
