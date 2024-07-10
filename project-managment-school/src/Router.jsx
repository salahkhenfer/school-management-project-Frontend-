import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Languages from "./admins/classes/Languages";
import Courses from "./admins/classes/Courses";
import Levels from "./admins/classes/Levels";
import LanguagesLavels from "./components/adminsCompnents/Classes/Languages/LanguagesLavels";
import LevelYears from "./components/adminsCompnents/Classes/Languages/LevelYears";
import Groups from "./admins/groups/Groups";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/courses/Languages",
        element: <Languages />,
      },
      {
        path: "/courses/Languages/:LanguagePrams",
        element: <LanguagesLavels />,
      },
      {
        path: "/courses/Courses",
        element: <Courses />,
      },
      {
        path: "/courses/Levels",
        element: <Levels />,
      },
      {
        path: "/courses/Levels/:levelParams",
        element: <LevelYears />,
      },
      {
        path: "/courses/Levels/:levelParams/Groups",
        element: <Groups />,
      },
    ],
    // {
    //   path: "/login",
    //   element: (
    //       <App />,
    //   ),
  },
]);
export default routes;
