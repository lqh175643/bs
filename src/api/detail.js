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
    data:options
  })
}

export function detailShoucang(options){
  return instance({
    url:`/userInfo/collection`,
    method:'post',
    data:options
  })
}

export function commitZan(options){
  return instance({
    url:`/detail/commitZan`,
    method:'post',
    data:options
  })
}

export function commitChd(options){
  return instance({
    url:`/detail/commitChd`,
    method:'post',
    data:options
  })
}