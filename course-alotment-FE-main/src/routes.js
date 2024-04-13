import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdOutlineSchool,
  MdOutlineTableChart,
  MdBugReport,
  MdBook,
  MdCoPresent,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
import TeachersTable from "views/admin/teachers";
import StudentsTable from "views/admin/students";
import ClassesTable from "views/admin/classes";
import ReportsTable from "views/admin/reports";
import CoursesTable from "views/admin/courses";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Courses",
    layout: "/admin",
    icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
    path: "/courses",
    component: CoursesTable,
  },
  {
    name: "Teachers",
    layout: "/admin",
    icon: <Icon as={MdCoPresent} width="20px" height="20px" color="inherit" />,
    path: "/teachers",
    component: TeachersTable,
  },
  {
    name: "Classes",
    layout: "/admin",
    icon: (
      <Icon
        as={MdOutlineTableChart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/classes",
    component: ClassesTable,
  },
  {
    name: "Students",
    layout: "/admin",
    icon: (
      <Icon as={MdOutlineSchool} width="20px" height="20px" color="inherit" />
    ),
    path: "/students",
    component: StudentsTable,
  },


  // {
  //   name: "Reports",
  //   layout: "/admin",
  //   icon: <Icon as={MdBugReport} width="20px" height="20px" color="inherit" />,
  //   path: "/reports",
  //   component: ReportsTable,
  // },
];

export default routes;
