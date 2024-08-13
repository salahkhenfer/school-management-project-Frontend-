import { NavLink } from "react-router-dom";

function SideBar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`w-80 
        ${isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}
        duration-200 bg-white z-40 max-md:fixed min-h-screen h-fit pt-14 p-10 shadow-xl`}
    >
      <div className="font-bold rounded-lg">الصفحة الرئيسة</div>
      <div className="w-full flex flex-col">
        <NavLink
          exact
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 w-full rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          الاحصائيات
        </NavLink>
      </div>
      <div className="flex flex-col">
        <div className="font-bold py-2">الاقسام والدورات</div>
        <NavLink
          to="classes/Languages"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          اللغات
        </NavLink>
        <NavLink
          to="classes/Courses"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          الدورات
        </NavLink>
        <NavLink
          to="classes/Levels"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          المستويات
        </NavLink>
      </div>
      <div className="flex flex-col">
        <div className="font-bold py-2">المستخدمين والإضافات</div>
        <NavLink
          to="/additional/Students"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 py-1 w-full rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          التلاميذ
        </NavLink>
        <NavLink
          to="/additional/Teachers"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 w-full py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          الأساتذة
        </NavLink>
        <NavLink
          to="/additional/Parents"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `px-4 w-full py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          أولياء التلاميذ
        </NavLink>
      </div>
      <div className="flex flex-col">
        <div className="font-bold py-2">التسيير المالي</div>
        <NavLink
          to="/Financialmanagement"
          className={({ isActive }) =>
            `px-4 py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          الأستاذ
        </NavLink>
        <NavLink
          to="/FinancialEmployer"
          className={({ isActive }) =>
            `px-4 py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          العمال
        </NavLink>
      </div>
      <div className="flex flex-col">
        <div className="font-bold px-2">التحكم في الموقع</div>
        <NavLink
          to="/Permission"
          className={({ isActive }) =>
            `px-4 py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          تحديد الصلاحيات
        </NavLink>
        <NavLink
          to="/additionalWebSite"
          className={({ isActive }) =>
            `px-4 py-1 rounded-lg cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          إضافات الموقع
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
