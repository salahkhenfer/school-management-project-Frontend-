import { NavLink } from "react-router-dom";

function TeacherSideBar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`w-80 
        ${isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}
        duration-200 bg-white z-40 max-md:fixed min-h-screen h-fit pt-14 p-10 shadow-xl`}
    >
      <div className="font-bold rounded-lg">الصفحة الرئيسة</div>
      <div className="w-full flex flex-col">
        <NavLink
          to="/teachers"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 w-full rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          تسجيل الحضور
        </NavLink>
        <NavLink
          to="/teachers/FinancialTeacher"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 w-full rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          رؤية الدفعات المالية
        </NavLink>
      </div>
    </div>
  );
}

export default TeacherSideBar;
