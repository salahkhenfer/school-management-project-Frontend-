import { Button, Card, Input } from "@nextui-org/react";
import logo from "../../public/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkauthApi, LoginApi } from "../apiCalls/authCalls";
import LoadingFirstPage from "../components/loading/LoadingFirstPage";
import { checkauth, login, selectAuth } from "../Redux/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(selectAuth);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const userData = await checkauthApi();
        console.log(userData);

        if (!userData.user) {
          nav("/login");
        }
        dispatch(checkauth(userData.user));
      } catch (err) {
        console.error("Error checking authentication status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, [dispatch, nav]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      Swal.fire({
        title: "جاري تسجيل الدخول",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const userInfo = await LoginApi(username, password);
      dispatch(login(userInfo));
      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "تأكد من اسم المستخدم وكلمة المرور",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingFirstPage />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen bg-slate-500">
      <img src={logo} className="w-28 mx-auto h-28 object-cover" alt="Logo" />

      <div className="text-2xl font-bold text-center">
        مرحبا بكم في موقع اكادمية التطوير
      </div>
      <Card className="m-auto max-w-sm p-4 h-fit my-10">
        <h1 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h1>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="اسم المستخدم"
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
          className="text-white bg-blue-500"
        >
          تسجيل الدخول
        </Button>
      </Card>
    </div>
  );
}
