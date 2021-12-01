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