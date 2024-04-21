import { menuType } from "./config";
import {
  Biotech,
  CalendarToday,
  Group,
  Home,
  ImportContacts,
  School,
  Settings,
} from "@mui/icons-material";

const menuData: menuType[] = [
  {
    displayText: "Home",
    path: "/",
    icon: <Home />,
  },
  {
    displayText: "Syllabus",
    icon: <ImportContacts />,
    path: "/syllabus",
    child: [
      {
        displayText: "View Syllabus",
        path: "/syllabus",
      },
      {
        displayText: "Create Syllabus",
        path: "/syllabus/create",
      },
    ],
  },
  {
    displayText: "Program",
    icon: <Biotech />,
    path: "/training-program",
    child: [
      {
        displayText: "View Program",
        path: "/training-program",
      },
      {
        displayText: "Create Program",
        path: "/training-program/create",
      },
    ],
  },
  {
    displayText: "Class",
    icon: <School />,
    path: "/class",
    child: [
      {
        displayText: "View Class",
        path: "/class",
      },
      {
        displayText: "Create Class",
        path: "/class/create",
      },
    ],
  },
  {
    displayText: "Training Calendar",
    path: "/training-calendar",
    icon: <CalendarToday />,
  },
  {
    displayText: "User Management",
    icon: <Group />,
    path: "/user-management",
    child: [
      {
        displayText: "User List",
        path: "/user-management",
      },
      {
        displayText: "User permission",
        path: "/user-management/permisson",
      },
    ],
  },
  {
    displayText: "Learning Material",
    icon: <ImportContacts />,
    path: "/training-material",
  },
  {
    displayText: "Setting",
    icon: <Settings />,
    path: "/setting",
    child: [
      {
        displayText: "Calendar",
        path: "/setting",
      },
    ],
  },
];

export default menuData;
