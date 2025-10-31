import { Link } from "react-router";

const BtnPrimary = ({ children, className, to, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      style={{ background: "var(--gradient-primary)" }}
      className={`btn font-semibold rounded-md px-7 py-4 text-white ${className}`}
    >
      {children}
    </Link>
  );
};

export default BtnPrimary;
