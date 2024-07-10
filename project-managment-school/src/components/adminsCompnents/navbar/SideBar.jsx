import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-80 min-h-screen h-fit  pt-14 p-10 shadow-xl ">
      <div className="font-bold  rounded-lg ">الصفحة الرئيسة </div>
      <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
        الاحصائيات{" "}
      </div>
      <div className="flex flex-col">
        <div className="font-bold  py-2 ">الاقسام والدورات</div>
        <Link
          style={{ textDecoration: "none", width: "100%" }}
          to="courses/Languages"
          className="px-4 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          الغات{" "}
        </Link>
        <Link
          to="courses/Courses"
          className="px-4  rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          {" "}
          الدورات{" "}
        </Link>
        <Link
          style={{ textDecoration: "none", width: "100%" }}
          to="courses/Levels"
          className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
        >
          {" "}
          المستويات{" "}
        </Link>
      </div>
      <div>
        <div className="font-bold  py-2 "> المستخدمين واالإضافات</div>
        <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
          التالميذ{" "}
        </div>
        <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
          {" "}
          االساتذة{" "}
        </div>
        <div className="px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
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
      </div>
    </div>
  );
}

export default SideBar;
