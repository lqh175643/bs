import instance from "../utils/request";

export function register(options){
  return instance({
    url:`/register`,
    method:'post',
    data:options
  })
}