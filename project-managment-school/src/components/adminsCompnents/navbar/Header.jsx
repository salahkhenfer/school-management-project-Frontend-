import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../../../public/logo.png";
import { BiMenu, BiMessageDetail } from "react-icons/bi";
import {
  Avatar,
  AvatarIcon,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";

function Header({ isOpen, setIsOpen }) {
  // eslint-disable-next-line no-unused-vars
  const [isInvisible, setIsInvisible] = useState(false);

  return (
    <div className=" flex justify-between absolute z-50  bg-white md:px-10  px-2  items-center w-full h-fit">
      <div onClick={setIsOpen} className="   md:hidden  ">
        <BiMenu className="w-10 h-10" />
      </div>
      <img className="w-14 h-14" src={logo} alt="" />
      <div className="  flex justify-center md:gap-6 items-center">
        <Badge
          color="danger"
          className="max-md:hidden"
          content={2}
          isInvisible={isInvisible}
          shape="circle"
        >
          <BiMessageDetail className="w-6 max-md:hidden h-6 cursor-pointer " />
        </Badge>
        <Badge
          className="max-md:hidden"
          color="danger"
          content={5}
          isInvisible={isInvisible}
          shape="circle"
        >
          <IoNotificationsOutline className="w-6 max-md:hidden h-6 cursor-pointer " />
        </Badge>
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
