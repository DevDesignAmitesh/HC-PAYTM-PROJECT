import React from 'react'

function InputBox({
  type = "text",
  placeholder,
  label,
  onChange,
  value,
  ...props
}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input value={value} onChange={onChange} type={type} placeholder={placeholder} className={`w-full px-2 py-1 border rounded border-slate-200`} {...props} />
    </div>
  )
}

export default InputBox