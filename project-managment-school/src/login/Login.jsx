import { Button, Card, Input } from "@nextui-org/react";
import logo from "../../public/logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginApi } from "../apiCalls/authCalls";

export function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    console.log(username, password);
    LoginApi(username, password);
  };
  return (
    <div className="w-full h-screen bg-slate-500">
      <img src={logo} className="w-28 mx-auto h-28 object-cover" />

      <div className="text-2xl font-bold text-center">
        مرحبا بكم في موقع اكادمية التطوير
      </div>
      <Card className="m-auto max-w-sm p-4  h-fit  my-10">
        <h1 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h1>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="البريد الالكتروني"
          className="mb-4"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="كلمة المرور"
          type="password"
          className="mb-4"
        />
        <Button
          onClick={handleLogin}
          block
          variant="primary"
          className=" text-white bg-blue-500"
        >
          تسجيل الدخول
        </Button>
      </Card>
    </div>
  );
}
