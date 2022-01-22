import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const getUserTasks = () => {
  return axios.get(API_URL + "task", { headers:authHeader() });
};


const userService = {
 getUserTasks
};

export default userService
