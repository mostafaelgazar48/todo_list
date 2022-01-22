const { default: axios } = require("axios");
const API_URL = "http://localhost:3000/";

const userLogin = async ({email,password}) => {
  const data =JSON.stringify({
    "email": email,
    "password":password,
    "strategy": "local"
  })
  var config = {
    method:'post',
    url: 'http://localhost:3000/authentication',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data : data
  };

  return  axios(config)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(error => console.log(error));
};
const logout = () => {
  localStorage.removeItem("user");
};


const authService = {userLogin,logout};
export default authService;
