import axios from "axios";
const timeOut = 10000;
const baseUrl = "http://localhost:3002";

const instance = axios.create({
  baseURL : baseUrl,
  timeout: timeOut
})
instance.interceptors.request.use(req=>{
  return req
},err=>{
  return Promise.reject(err)
})
instance.interceptors.response.use(res=>{
  return res.data
},err=>{
  return Promise.reject(err)
})
export default instance
