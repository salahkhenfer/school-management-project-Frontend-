import { useEffect, useState } from "react";
import "./App.css";
import LoadingFirstPage from "./components/loading/LoadingFirstPage";
import SideBar from "./components/adminsCompnents/navbar/SideBar";
import Header from "./components/adminsCompnents/navbar/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (fontLoaded) {
    return (
      <div className="font-cairo">
        <Header isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
        <div className="flex">
          <SideBar isOpen={isOpen} />
          <div
            className="pt-20 
          h-[calc(100vh-1rem)]
           overflow-y-scroll w-full px-4 "
          >
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
