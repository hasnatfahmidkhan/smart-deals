import axios from "axios";

const instance = axios.create({
  baseURL: "https://smart-deals-api-server-phi.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
