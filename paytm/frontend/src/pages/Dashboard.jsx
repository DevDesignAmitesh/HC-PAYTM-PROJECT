import { useEffect, useState } from "react"
import {Appbar} from "../component/Appbar"
import {Balance} from "../component/Balance"
import {Users} from "../component/Users"
import axios from "axios"

export const Dashboard = () => {
    
  const [balance, setBalance] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token");
        try {
          if (token) {
             axios.get(`http://localhost:3000/api/v1/account/balance`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setBalance(res.data.balance)
              });
          }
        } catch (error) {
          console.error(
            "Error fetching users:",
            error.response ? error.response.data : error.message
          );
        }
      }, []);

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}