import { useEffect, useState } from "react";
import "./App.css";
import LoadingFirstPage from "./components/loading/LoadingFirstPage";
import SideBar from "./components/adminsCompnents/navbar/SideBar";
import Header from "./components/adminsCompnents/navbar/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (fontLoaded) {
    return (
      <div className="font-cairo">
        <Header />
        <div className="flex">
          <SideBar />
          <div className="pt-20 h-[90vh] w-full overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingFirstPage />;
  }
}

export default App;
