import instance from "../utils/request";

export function generateOrder(options){
  return instance({
    url:`/order/generate`,
    method:'post',
    data:options
  })
}

export function getOrder(){
  return instance({
    url:'/order/obtain',
    method:'get',
    params:''
  })
}

export function deleteOrder(options){
  return instance({
    url:'/order/delete',
    method:'delete',
    data:options
  })
}