import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../component/Button';
import { useNavigate } from 'react-router-dom';
import InputBox from '../component/InputBox';

function Me() {

  const [users, setUsers] = useState("");
  const [balance, setBalance] = useState("")
  const navigate = useNavigate()

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
            setUsers(res.data)
          });
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  }, []);

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

  const firstName = users.firstName;
  const lastName = users.lastName;
  const username = users.username;
  const password = users.password;

  return (
    <div className='flex justify-center items-center h-screen w-full flex-col'>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <p>Current Balance: {balance}</p>
      <Button onClick={() => navigate("/dashboard")}  label={"Back to dashboard"}/>
      <Button onClick={() => navigate("/update")}  label={"Update your credentials"}/>
    </div>
  )
}

export default Me;