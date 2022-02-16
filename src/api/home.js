import instance from "../utils/request";

export function getSwiperData(options){
  return instance(options)
}
export function getCategoryData(url,options){
  return instance({
    url:`/category/${url}`,
    method:'get',
    params:options
  })
}

export function getUserInfo(){
  return instance({
    url:`/userInfo`,
    method:'get'
  })
}

export function footprint(options){
  return instance({
    url:`/userInfo/footprint`,
    method:'post',
    data:options
  })
}