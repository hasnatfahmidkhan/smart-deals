import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`md:w-11/12 2xl:w-7xl mx-auto px-4 py-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
