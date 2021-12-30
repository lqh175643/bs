import {str_parse} from './util'

function set_local_storage(name, data ,delay) {
  let createAt = Date.now();
  let expirationTime = createAt+delay
  let type = typeof data;
  if (type !== "object" && type !== "function") {
    data = { data };
  }
  data = JSON.stringify(Object.assign(data,{expirationTime}))
  localStorage.setItem(name, data);
}

function get_local_storage(name){
  let current = Date.now();
  let item = str_parse(localStorage.getItem(name))
  if(typeof item==='object'){
    let expirationTime = item.expirationTime
    if(expirationTime>=current){
      return item.data
    }
  }else{
    return false
  }
}

export {
  set_local_storage,
  get_local_storage
}