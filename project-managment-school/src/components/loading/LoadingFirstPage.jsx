import logo from "../../../public/logo.png";
import { ThreeDot } from "react-loading-indicators";

function LoadingFirstPage() {
  return (
    <div className="w-screen flex-col h-screen absolute top-0 left-0 bg-white flex justify-center items-center">
      <img src={logo} className="w-28 h-28  " />
      <div className="w-10 h-10 relative">
        <ThreeDot color="#1ea2c2" size="small" text="" textColor="#1869b8" />
      </div>
    </div>
  );
}

export default LoadingFirstPage;
