import Heading from "../component/Heading";
import SubHeading from "../component/SubHeading";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import BottomWarning from "../component/BottomWarning";
import AuthFailedMsg from "../component/AuthFailedMsg"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const signupFunction = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          password,
          firstName,
          lastName,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      if(!firstName || !lastName || !username || !password){
        setError("please fill up your credentials")
      } else{
        setError("Invalid Inputs / User already exist")
      }
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
          <Button onClick={signupFunction} label={`${loading ? "Loading..." : "Sign up"}`} />
            <AuthFailedMsg label={error} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
