import { Link } from "react-router";

const BtnSecondary = ({ children, to, className }) => {
  return (
    <Link
      to={`${to}`}
      className={`btn font-semibold px-7 text-[#632ee3] border border-[#632ee3] rounded-md bg-transparent ${className}`}
    >
      {children}
    </Link>
  );
};

export default BtnSecondary;
