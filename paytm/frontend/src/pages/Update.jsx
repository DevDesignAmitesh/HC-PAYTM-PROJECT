import React, { useState } from 'react'
import Button from '../component/Button'
import InputBox from '../component/InputBox'
import Heading from '../component/Heading'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Update() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const updateFunction = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3000/api/v1/user/update", {
        firstName,
        lastName,
        password,
      },
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      navigate('/dashboard')

    } catch (error) {
      console.log(error.message)
      navigate("/dashboard")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-full flex-col gap-5'>
      <Heading label={"Update your credentials below..."} />
      <div>
        <InputBox className={`border-2 border-black p-2 rounded-md w-full`} placeholder={"Enter New Firstname"} value={firstName} onChange={e => setFirstName(e.target.value)} />
        <InputBox className={`border-2 border-black p-2 rounded-md w-full`} placeholder={"Enter New Lastname"} value={lastName} onChange={e => setLastName(e.target.value)} />
        <InputBox className={`border-2 border-black p-2 rounded-md w-full`} placeholder={"Enter New Password"} value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <Button onClick={updateFunction}  label={"Submit your credentials"}/>
      <div>
      <Button onClick={() => navigate("/dashboard")}  label={"Back to dashboard"}/>
      <Button onClick={() => navigate("/me")}  label={"Back to Me"}/>
      </div>
    </div>
    
  )
}

export default Update