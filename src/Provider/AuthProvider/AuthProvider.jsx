import { AuthContext } from "../../Context/AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  return <AuthContext value={""}>{children}</AuthContext>;
};

export default AuthProvider;
