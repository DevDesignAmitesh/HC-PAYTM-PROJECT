import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Button from "./Button";

export const Appbar = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const logoutFunction = () => {
    const token = localStorage.getItem("token");

    if(token){
      axios.delete("http://localhost:3000/api/v1/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    localStorage.clear()
    navigate("/");
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
         axios.get(`http://localhost:3000/api/v1/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUsers(res.data);
          });
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  }, []);

  const firstName = users.firstName
  const firstLetter = firstName?.split("")[0].toUpperCase()
  
  

  return <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex items-center justify-between">
        <Button onClick={logoutFunction} label={"Logout"} />
        <div className="flex flex-col capitalize justify-center h-full mr-4">{firstName}</div>
        <div onClick={() => navigate("/me")} className="rounded-full h-12 w-32 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex cursor-pointer flex-col justify-center text-xl">{firstLetter}</div>
        </div>
      </div>
    </div>
};
