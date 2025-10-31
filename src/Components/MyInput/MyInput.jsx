import React from "react";

const MyInput = ({ type, className, placeholder, name }) => {
  return (
    <input
      type={type}
      className={`input w-full focus:outline-none focus:border-[#632ee3] ${className}`}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default MyInput;
