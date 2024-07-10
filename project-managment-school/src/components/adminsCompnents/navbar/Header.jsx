import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../../../public/logo.png";
import { BiMessageDetail } from "react-icons/bi";
import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

function Header() {
  return (
    <div className=" flex justify-between absolute  bg-white px-10  items-center w-full h-fit">
      <img className="w-14 h-14" src={logo} alt="" />
      <div className="flex justify-center gap-6 items-center">
        <BiMessageDetail className="w-6 h-6 cursor-pointer " />
        <IoNotificationsOutline className="w-6 h-6 cursor-pointer " />
        <div className="flex items-center">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br rounded-full from-[#FFB457] to-[#FF705B]",
                  icon: "text-black/80",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">اسم الحساب </p>
                <p className="font-semibold">محمد</p>
              </DropdownItem>
              <DropdownItem key="settings">الصفحة الرئيسة</DropdownItem>
              <DropdownItem key="logout" color="danger">
                تسجيل الخروج
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Header;
