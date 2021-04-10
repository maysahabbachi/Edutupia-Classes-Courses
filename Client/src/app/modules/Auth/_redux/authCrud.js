import axios from "axios";
import jwt_decode from "jwt-decode";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


export const ME_URL = "api/me";

export function login(email, password ) {
 

  return axios.post("http://localhost:5000/users/login", { email, password });
}

export function register( firstname, lastname,email, password, password2) {

  console.log(axios.post("http://localhost:5000/users/register", {  firstname, lastname,email, password , password2}).then(response => {
    console.log("Success ========>", response);
})
.catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) } }));
  
  return axios.post("http://localhost:5000/users/register", {  firstname, lastname,email, password , password2});
  
}

export function requestPassword(email) {
  return axios.post("http://localhost:5000/users/forgot", { email });
}
export function loginGmail(tokenId) {
  
  return axios.post("http://localhost:5000/users/google_login", { tokenId });
}
export function reset(token,password) {
  return axios.post("http://localhost:5000/users/reset", { token,password });
}

export  function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
 const token = localStorage.getItem("jwtToken")
  const decoded = jwt_decode(token);
  console.log(decoded)
  return axios.get("http://localhost:5000/users/" +decoded.id).then(res => {
    console.log("eeeeee")
    console.log(res.data)
    const  user  = res.data;
    console.log( user );
    localStorage.setItem("user", JSON.stringify(user)  );
    return res.data ;
    // Save to localStorage
// Set token to localStorage
    // const { token } = res.data;
    // localStorage.setItem("jwtToken", token);
    // // Set token to Auth header
    
    // // Decode token to get user data
    // const decoded = jwt_decode(token);
    // Set current user
    
  })
  .catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) } });
}
