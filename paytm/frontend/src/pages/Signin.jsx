import Heading from "../component/Heading";
import SubHeading from "../component/SubHeading";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import BottomWarning from "../component/BottomWarning";
import { useState } from "react";
import axios from "axios";
import AuthFailedMsg from "../component/AuthFailedMsg";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate("");

  const signinFunction = async () => {

    try {

      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      
    } catch (error) {
      if (!username || !password) {
        setError("please fill up your credentials");
      } else{
        setError("Invalid Inputs / User doesn't exist");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={signinFunction}
              label={`${loading ? "Loading..." : "Sign in"}`}
            />
            <AuthFailedMsg label={error} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
