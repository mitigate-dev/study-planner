import { createReducer } from '@reduxjs/toolkit';

import _groupBy from 'lodash/groupBy';
import _entries from 'lodash/entries';
import _times from 'lodash/times';
import _flatMap from 'lodash/flatMap';
import _values from 'lodash/values';

import data from './Courses.json';

// {
//   "Specializētie kursi": [
//     { selectedCourse: ..., courses: [..., ...] }
//   ]
// }
const initialState = {}
const entriesByCourseTypes = _entries(_groupBy(data, (row) => row.courseType))
entriesByCourseTypes.forEach(([courseType, entries]) => {
  initialState[courseType] = [];
  const entriesByGroup = _entries(_groupBy(entries, (row) => row.group))
  entriesByGroup.forEach(([group, entries]) => {
    _times(entries[0].repeat).forEach((i) => {
      initialState[courseType].push({
        courseType,
        group,
        selectedCourseIndex: entries.length > 1 ? -1: 0,
        courses: entries.map((e) => ({ ...e, disabled: false }))
      })
    })
  })
})

const reducer = createReducer(initialState, {
  SELECT_COURSE: (state, { courseType, entryIndex, selectedCourseIndex }) => {
    // console.log('SELECT_COURSE', { courseType, entryIndex, selectedCourseIndex })
    // set selectedCourse
    state[courseType][entryIndex].selectedCourseIndex = selectedCourseIndex
    // get all entries
    const entries = _flatMap(_values(state))
    // reset disabled flag
    entries.forEach((e) => {
      e.courses.forEach((c) => {
        c.disabled = false
      })
    })
    // disable courses based on `group`
    const entriesByGroup = _entries(_groupBy(entries, (e) => e.group))
    entriesByGroup.forEach(([group, groupEntries]) => {
      const selectedCourseIndexes = groupEntries.map((e) => e.selectedCourseIndex)
      groupEntries.forEach((e) => {
        e.courses.forEach((c, i) => {
          if (i === e.selectedCourseIndex) return;
          if (selectedCourseIndexes.indexOf(i) === -1) return;
          if (!c.points10 && !c.points11 && !c.points12) return; // Kurss nav izvlēlēts
          c.disabled = true;
        })
      })
    })
    // disable courses based on `uniqBy`
    const uniqBySelected = {};
    entries.forEach((e) => {
      const selectedCourse = (e.courses[e.selectedCourseIndex] || {});
      if (!selectedCourse.uniqBy) return;
      uniqBySelected[selectedCourse.uniqBy] = true;
    });
    entries.forEach((e) => {
      const selectedCourse = (e.courses[e.selectedCourseIndex] || {});
      e.courses.forEach((c) => {
        if (!c.uniqBy) return;
        if (!uniqBySelected[c.uniqBy]) return;
        if (selectedCourse.uniqBy === c.uniqBy) return;
        c.disabled = true;
      });
    });
    // disable courses based on `requiredBy`
    const allSelectedCourseNames = entries.map((e) => {
      const selectedCourse = (e.courses[e.selectedCourseIndex] || {});
      return selectedCourse.courseName;
    });
    entries.forEach((e) => {
      let disableOthers = false;
      // select the required course
      e.courses.forEach((c, i) => {
        if (!c.requiredBy) return
        if (allSelectedCourseNames.indexOf(c.requiredBy) === -1) return;
        e.selectedCourseIndex = i;
        disableOthers = true;
      })
      // disable other courses
      if (disableOthers) {
        e.courses.forEach((c, i) => {
          if (i === e.selectedCourseIndex) return;
          c.disabled = true
        })
      }
    })
  }
})

export default reducer;