import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user, signoutFunc } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user.accessToken;

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status == 401 || status == 403) {
          signoutFunc().then(() => {
            navigate("/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, [user, signoutFunc, navigate]);

  return instance;
};
export default useAxiosSecure;
