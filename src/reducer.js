import { createReducer } from '@reduxjs/toolkit';

import _groupBy from 'lodash/groupBy';
import _entries from 'lodash/entries';
import _times from 'lodash/times';
import _flatMap from 'lodash/flatMap';
import _values from 'lodash/values';
import _uniqBy from 'lodash/uniqBy';

import data from './Courses.json';

const setupExamsData = (state) => {
  state.examsData = []

  const entries = _flatMap(_values(state.coursesData))

  entries.forEach((e) => {
    const course = (e.courses[e.selectedCourseIndex] || {}); 
    if (!course.exam) return;
    const disabled = course.courseType !== "Padziļinātie kursi"
    const exam = { ...course, selected: disabled, disabled }
    state.examsData.push(exam);
  })
}

const toggleExam = (state, examIndex, selected) => {
  const exams = state.examsData

  // Max 2 exams can be selected
  if (selected && exams.filter((e) => e.selected && !e.disabled).length > 1) return;

  // Select the exam
  exams[examIndex].selected = selected;

  const allSelectedExamNames = exams
    .filter((e) => e.selected)
    .map((e) => e.courseName);

  // Handle exclusions
  exams.forEach((exam) => {
    if (!exam.disabled) return;
    const excluded = (exam.examExcludedBy && allSelectedExamNames.indexOf(exam.examExcludedBy) !== -1);
    exam.selected = !excluded;
  })
}

const setupCoursesData = (initialState, data) => {
  const entriesByCourseTypes = _entries(_groupBy(data, (row) => row.courseType))
  entriesByCourseTypes.forEach(([courseType, entries]) => {
    initialState.coursesData[courseType] = [];
    const entriesByGroup = _entries(_groupBy(entries, (row) => row.group))
    entriesByGroup.forEach(([group, entries]) => {
      _times(entries[0].repeat).forEach((i) => {
        initialState.coursesData[courseType].push({
          courseType,
          group,
          selectedCourseIndex: entries.length > 1 ? -1: 0,
          courses: entries.map((e) => ({ ...e, disabled: false }))
        })
      })
    })

    if (courseType === 'Padziļinātie kursi' || courseType === 'Specializētie kursi') {
      initialState.directionsData[courseType].forEach((e) => {
        e.courseType = courseType;
        e.group = courseType;
        e.selectedCourseIndex = -1;
        if (courseType === 'Specializētie kursi') {
          // Converts "Psiholoģija (10. klase)" to "Psihiloģija", etc
          const normalizedCourses = entries.map(e => ({ ...e, courseName: e.courseName.replace(/\s\(.+$/, '') }))
          e.courses = _uniqBy(normalizedCourses, e => e.courseName);
        } else {
          e.courses = entries.map(e => ({ ...e, disabled: false }));
        }
      })
    }
  })
}

const toggleEntries = (entries) => {
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

const initialState = {
  // {
  //   "Specializētie kursi": [
  //     { selectedCourse: ..., courses: [..., ...] }
  //   ]
  // }
  coursesData: {},
  direction: null,
  directionsData: {
    "Padziļinātie kursi":  [{}, {}, {}, {}, {}],
    "Specializētie kursi": [{}, {}, {}, {}, {}],
  },
  examsData: []
};

setupCoursesData(initialState, data);
setupExamsData(initialState);

const reducer = createReducer(initialState, {
  SELECT_DIRECTION: (state, { direction }) => {
    state.direction = direction;
  },
  SELECT_DIRECTION_COURSE: (state, { courseType, entryIndex, selectedCourseIndex }) => {
    // set selectedCourse
    state.directionsData[courseType][entryIndex].selectedCourseIndex = selectedCourseIndex
    // get all entries
    const entries = _flatMap(_values(state.directionsData))
    toggleEntries(entries)
  },
  // Select TOP 3 courses selected in step 1 and transfer them to step 2
  CONFIRM_DIRECTION_COURSES: (state) => {
    const courseType = "Padziļinātie kursi";
    state.directionsData[courseType].slice(0, 3).forEach((directionEntry, entryIndex) => {
      const selectedDirectionCourse = directionEntry.courses[directionEntry.selectedCourseIndex] || {};
      const entry = state.coursesData[courseType][entryIndex];
      entry.courses.forEach((course, courseIndex) => {
        if (course.courseName === selectedDirectionCourse.courseName) {
          entry.selectedCourseIndex = courseIndex;
        }
      })
    })
    // get all entries
    const entries = _flatMap(_values(state.coursesData))
    toggleEntries(entries)
  },
  SELECT_COURSE: (state, { courseType, entryIndex, selectedCourseIndex }) => {
    // set selectedCourse
    state.coursesData[courseType][entryIndex].selectedCourseIndex = selectedCourseIndex
    // get all entries
    const entries = _flatMap(_values(state.coursesData))
    toggleEntries(entries)
    setupExamsData(state)
  },
  TOGGLE_EXAM: (state, { examIndex, selected}) => {
    toggleExam(state, examIndex, selected);
  }
})

export default reducer;