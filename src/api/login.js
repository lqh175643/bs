import instance from "../utils/request";

export function login(options){
  return instance({
    url:`/login`,
    method:'post',
    data:options
  })
}

export function forget(options){
  return instance({
    url:'/forget',
    method:'post',
    data:options
  })
}

export function modifyUserpass(options){
  return instance({
    url:'/modifyUserpass',
    method:'post',
    data:options
  })
}