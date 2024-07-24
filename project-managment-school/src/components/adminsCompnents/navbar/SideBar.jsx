import { Link } from "react-router-dom";

function SideBar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`w-80 
        ${isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}
        duration-200  bg-white z-40 max-md:fixed min-h-screen h-fit  pt-14 p-10 shadow-xl`}
    >
      <div className="font-bold  rounded-lg ">الصفحة الرئيسة </div>
      <div className="w-full flex flex-col">
        <Link
          style={{ textDecoration: "none", width: "100%" }}
          onClick={() => setIsOpen(false)}
          to="/"
          className="px-4 w-full rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          الاحصائيات{" "}
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="font-bold  py-2 ">الاقسام والدورات</div>
        <Link
          onClick={() => setIsOpen(false)}
          style={{ textDecoration: "none", width: "100%" }}
          to="classes/Languages"
          className="px-4 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          الغات{" "}
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to="classes/Courses"
          className="px-4  rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          {" "}
          الدورات{" "}
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          style={{ textDecoration: "none", width: "100%" }}
          to="classes/Levels"
          className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          {" "}
          المستويات{" "}
        </Link>
      </div>
      <div>
        <div className="font-bold  py-2 "> المستخدمين واالإضافات</div>
        <div
          onClick={() => setIsOpen(false)}
          className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          التالميذ{" "}
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          {" "}
          االساتذة{" "}
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          {" "}
          اولياء التالميذ{" "}
        </div>
      </div>
      <div>
        <div className="font-bold  py-2 "> التسيير المالي</div>
        <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
          االأستاذ{" "}
        </div>
        <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
          {" "}
          العمال{" "}
        </div>
      </div>
      <div>
        <div className="font-bold  px-2 "> التحكم في الموقع </div>
        <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
          تحديد الصلاحيات
        </div>
        <Link
          to="/additionalWebSite"
          className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          اضافات الموقع
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
