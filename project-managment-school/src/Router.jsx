import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Languages from "./admins/classes/Languages";
import Courses from "./admins/classes/Courses";
import Levels from "./admins/classes/Levels";
import Groups from "./admins/groups/Groups";
import LanguagesLavels from "./admins/classes/LanguagesLavels";
import LevelYears from "./admins/classes/LevelYears";
import LevelModuls from "./admins/classes/LevelModuls";
import Group from "./admins/groups/Group";
import { Login } from "./login/Login";
import Statistics from "./admins/statistics/Statistics";
import AdditionalWebSite from "./admins/controlWebsite/AdditionalWebSite";
import RegimentControl from "./admins/controlWebsite/RegimentControl";
import Students from "./admins/UsersAndAdditional/Students";
import Teachers from "./admins/UsersAndAdditional/Teachers";
import Parents from "./admins/UsersAndAdditional/Parents";
import StudentsInfo from "./components/adminsCompnents/UsersAndAdditional/StudentsInfo";
import ParentInfo from "./components/adminsCompnents/UsersAndAdditional/ParentInfo";
import TeacherInfo from "./components/adminsCompnents/UsersAndAdditional/TeacherInfo";
import FinancialTeachers from "./admins/Financialmanagement/FinancialTeachers";
import FinancialTeachersInfo from "./components/adminsCompnents/Financialmanagement/FinancialTeachersInfo";
import TransitionDone from "./components/adminsCompnents/Financialmanagement/TransitionDone";
import FinancialEmployer from "./admins/Financialmanagement/FinancialEmployer";
import Permission from "./admins/permissions/permission";
import AllUsersPermission from "./admins/permissions/AllUsersPermission";
import TeachersPage from "./teachers/TeachersPage";
import TeacherGroups from "./teachers/TeacherGroups/TeacherGroups";
import TeacherGoupe from "./teachers/TeacherGroups/TeacherGoupe";
import ParentsPage from "./parents/ParentsPage";
import StudentsGroups from "./parents/parentStudentsGroup/StudentsGroups";
import SendReport from "./parents/parentStudentsGroup/SendReport";
import MessagesAdmin from "./components/adminsCompnents/MessagesAdmin";
import ErrorElement from "./components/ErrorElement";
import Not_Found from "./components/Not_Found";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/classes/Languages",
        element: <Languages />,
      },

      {
        path: "/classes/Languages/:LanguagePrams",
        element: <LanguagesLavels />,
      },
      {
        path: "/classes/Languages/:LanguagePrams/:LevelPrams",
        element: <Groups />,
      },

      {
        path: "/classes/Languages/:LanguagePrams/:LevelPrams/:groupParams",
        element: <Group />,
      },

      {
        path: "/classes/Courses",
        element: <Courses />,
      },
      {
        path: "/classes/Courses/:courseParams",
        element: <Groups />,
      },
      {
        path: "/classes/Courses/:courseParams/:groupParams",
        element: <Group />,
      },

      {
        path: "/classes/Levels",
        element: <Levels />,
      },
      {
        path: "/classes/Levels/:levelParams",
        element: <LevelYears />,
      },
      {
        path: "/classes/Levels/:levelParams/:modulePrams/:groupsParams",
        element: <Groups />,
      },
      {
        path: "/classes/Levels/:levelParams/:modulePrams/:groupsParams/:groupParams",
        element: <Group />,
      },
      {
        path: "/classes/Levels/:levelParams/:modulePrams",
        element: <LevelModuls />,
      },
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "/additionalWebSite",

        element: <AdditionalWebSite />,
      },
      {
        path: "/additionalWebSite/:additionalWebSitePrams",

        element: <RegimentControl />,
      },
      {
        path: "/additional/Students",
        element: <Students />,
      },
      {
        path: "/additional/Students/:studentParams",
        element: <StudentsInfo />,
      },
      {
        path: "/additional/Teachers",
        element: <Teachers />,
      },
      {
        path: "/additional/Teachers/:teacherParams",
        element: <TeacherInfo />,
      },
      {
        path: "/additional/Parents",
        element: <Parents />,
      },
      {
        path: "/additional/Parents/:parentParams",
        element: <ParentInfo />,
      },
      {
        path: "/Financialmanagement",
        element: <FinancialTeachers />,
      },
      {
        path: "/FinancialEmployer",
        element: <FinancialEmployer />,
      },
      {
        path: "/Financialmanagement/:FinancialTeachersParams",
        element: <FinancialTeachersInfo />,
      },
      {
        path: "/Financialmanagement/:FinancialTeachersParams/TransitionDone",
        element: <TransitionDone />,
      },
      {
        path: "/Financialmanagement/TransitionDone",
        element: <TransitionDone />,
      },
      {
        path: "/Permission",
        element: <Permission />,
      },
      {
        path: "/Permission/AllUsersPermission",
        element: <AllUsersPermission />,
      },
      {
        path: "/messages",
        element: <MessagesAdmin />,
      },
    ],
  },
  {
    path: "/teachers",
    element: <TeachersPage />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,

        element: <TeacherGroups />,
      },
      {
        path: "/teachers/:teacherGroupsParams",
        element: <TeacherGoupe />,
      },
      {
        path: "FinancialTeacher",
        element: <FinancialTeachersInfo />,
      },
      {
        path: "FinancialTeacher/TransitionDone",
        element: <TransitionDone />,
      },
    ],
  },
  {
    path: "/parents",
    element: <ParentsPage />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <StudentsGroups />,
      },
      {
        path: ":studentParams",
        element: <StudentsInfo />,
      },
      {
        path: "sendReport",
        element: <SendReport />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorElement />,
  },
  {
    path: "*",
    element: <Not_Found />,
  },
]);
export default routes;
