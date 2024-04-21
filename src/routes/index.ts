import { lazy } from "react";

const SyllabusPage = lazy(
  () => import("../pages/SyllabusPage/pages/SyllabusList")
);
const SyllabusDetail = lazy(
  () => import("../pages/SyllabusPage/pages/SyllabusDetail")
);
const SyllabusCreate = lazy(
  () => import("../pages/SyllabusPage/pages/SyllabusCreate")
);
const TrainingProgramPage = lazy(
  () => import("../pages/ProgramPage/pages/ProgramList")
);
const TrainingProgramDetail = lazy(
  () => import("../pages/ProgramPage/pages/ProgramDetail")
);
const TrainingProgramCreate = lazy(
  () => import("../pages/ProgramPage/pages/ProgramCreate")
);
const TrainingProgramEdit = lazy(
  () => import("../pages/ProgramPage/pages/ProgramEdit")
);
const ClassPage = lazy(() => import("../pages/ClassPage/pages/ClassList"));
const ClassDetail = lazy(() => import("../pages/ClassPage/pages/ClassDetail"));
const ClassCreate = lazy(() => import("../pages/ClassPage/pages/ClassCreate"));

const CalendarPage = lazy(
  () => import("../pages/CalendarPage/pages/CalendarList")
);
const UserManagementPage = lazy(
  () => import("../pages/UserManagementPage/pages/UserList")
);
const UserPermission = lazy(
  () => import("../pages/UserManagementPage/pages/UserPermission")
);

const MaterialPage = lazy(() => import("../pages/MaterialPage/MaterialPage"));
const SettingPage = lazy(() => import("../pages/SettingPage/SettingPage"));

const coreRoutes = [
  //syllabus
  { path: "/syllabus", component: SyllabusPage },
  { path: "/syllabus/:id", component: SyllabusDetail },
  { path: "/syllabus/create", component: SyllabusCreate },
  { path: "/syllabus/:syllabusId/update", component: SyllabusCreate },

  //training program
  { path: "/training-program", component: TrainingProgramPage },
  { path: "/training-program/:id", component: TrainingProgramDetail },
  { path: "/training-program/create", component: TrainingProgramCreate },
  { path: "/training-program/:id/edit", component: TrainingProgramEdit },

  //class
  { path: "/class", component: ClassPage },
  { path: "/class/:id", component: ClassDetail },
  { path: "/class/create", component: ClassCreate },
  { path: "/class/:id/edit", component: ClassCreate },

  //calendar
  { path: "/training-calendar", component: CalendarPage },

  //user management
  { path: "/user-management", component: UserManagementPage },
  { path: "/user-management/permisson", component: UserPermission },

  //training material
  { path: "/training-material", component: MaterialPage },

  //setting
  { path: "/setting", component: SettingPage },
];

const routes = [...coreRoutes];

export default routes;
