import { Button, Card, Input } from "@nextui-org/react";
import logo from "../../public/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkauthApi, LoginApi } from "../apiCalls/authCalls";
import LoadingFirstPage from "../components/loading/LoadingFirstPage";
import { checkauth, login, selectAuth } from "../Redux/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(selectAuth);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLoading(true);
      try {
        const userData = await checkauthApi();

        dispatch(checkauth(userData.user));
      } catch (err) {
        console.error("Error checking authentication status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userInfo = await LoginApi(username, password);
      dispatch(login(userInfo));
      console.log(user);
    } catch (err) {
      console.error("Failed to login:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingFirstPage />;
  } else if (user) {
    return <Navigate to="/" />;
  } else {
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
            className="text-white bg-blue-500"
          >
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }
}
