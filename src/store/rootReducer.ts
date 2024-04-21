import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../features/user-management/user.slice";
import { syllabusReducer } from "../features/syllabus/syllabus.slice";
import { classReducer } from "../features/class/class.slice";
import { calendarReducer } from "../features/calendar/calendar.slice";
import { programReducer } from "../features/TrainingProgram/trainingProgram.slice";
import { materialReducer } from "../features/TrainingMaterial/trainingMaterial.slice";
import { userPermissionReducer } from "../features/user-permission/userPermission.slice";

const rootReducer = combineReducers({
  user: userReducer,
  syllabus: syllabusReducer,
  class: classReducer,
  calendar: calendarReducer,
  program: programReducer,
  material: materialReducer,
  userPermission : userPermissionReducer,
});

export default rootReducer;
