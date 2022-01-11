import instance from "../utils/request";

export function getDetail(options){
  return instance({
    url:`/detail/${options.category}/${options.id}`,
    method:'get'
  })
}

export function detailAddBus(options){
  return instance({
    url:`/detail/operation`,
    method:'post',
    params:options
  })
}