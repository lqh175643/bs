import instance from "../utils/request";

export function login(options){
  return instance({
    url:`/login`,
    method:'post',
    data:options
  })
}