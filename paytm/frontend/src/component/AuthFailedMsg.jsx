import React from 'react'

function AuthFailedMsg({label}) {
  return (
    <p className="text-[14px] capitalize text-red-600">{label}</p>
  )
}

export default AuthFailedMsg