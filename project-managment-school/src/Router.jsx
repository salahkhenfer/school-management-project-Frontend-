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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/classes/Levels/:levelParams/:modulePrams/Groups",
        element: <Groups />,
      },
      {
        path: "/classes/Levels/:levelParams/:modulePrams/Groups/:groupParams",
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default routes;
