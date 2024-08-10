import {
  Checkbox,
  CheckboxGroup,
  Input,
  Button,
  Spacer,
  Card,
} from "@nextui-org/react";
import React, { useState } from "react";
import axios from "axios";
import { createpermission } from "../../apiCalls/permissionsCalls";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Permission() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("admin@admin.admin");
  const [phone, setPhone] = useState("");
  const nav = useNavigate();
  const [permissions, setPermissions] = useState({
    classes: true,
    users: false,
    financial: false,
  });

  const handleCheckboxChange = (value) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [value]: !prevPermissions[value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password, email, phone, permissions);

    const response = await createpermission({
      name: "admin",
      username,
      password,
      email,
      phone,
      permissions,
    });
    if (response) {
      nav("AllUsersPermission");
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setPermissions({
        classes: true,
        users: false,
        financial: false,
      });

      Swal.fire({
        icon: "success",
        title: "تمت الاضافة بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ ما",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold text-center">رؤية الصلاحيات</div>
      <Link to="AllUsersPermission">
        <Button
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            nav("AllUsersPermission");
          }}
        >
          {" "}
          رؤية جميع الحسابات
        </Button>
      </Link>
      <Card className="max-w-[400px] mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4"> انشاء مسؤول</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="اسم المستخدم"
            required
            className="mb-4"
          />

          <Input
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            required
            className="mb-4"
          />

          <Input
            label="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم الهاتف"
            required
            className="mb-4"
          />

          <CheckboxGroup
            label="الصلاحيات"
            value={Object.keys(permissions).filter((key) => permissions[key])}
            className="mb-4"
          >
            <Checkbox
              value="classes"
              isSelected={permissions.classes}
              onChange={() => handleCheckboxChange("classes")}
            >
              الاقسام و الدورات
            </Checkbox>
            <Checkbox
              value="users"
              isSelected={permissions.users}
              onChange={() => handleCheckboxChange("users")}
            >
              المستخدمين
            </Checkbox>
            <Checkbox
              value="financial"
              isSelected={permissions.financial}
              onChange={() => handleCheckboxChange("financial")}
            >
              التسير المالي
            </Checkbox>
          </CheckboxGroup>

          <Spacer y={1} />
          <Button type="submit" color="primary" shadow className="w-full">
            اضافة
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Permission;
