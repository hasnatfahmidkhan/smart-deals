import React from "react";

const MyLabel = ({ children, className }) => {
  return <label className={`label text-black text-sm ${className}`}>{children}</label>;
};

export default MyLabel;
