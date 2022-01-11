import {str_parse} from './util'

function set_local_storage(name, data ,delay=30*60) {
  let createAt = Math.floor(Date.now()/1000);
  let expirationTime = createAt+delay
  let type = typeof data;
  if (type !== "object" && type !== "function") {
    data = { data };
  }
  data = JSON.stringify(Object.assign(data,{expirationTime}))
  localStorage.setItem(name, data);
}

function get_local_storage(name){
  const current = Math.floor(Date.now()/1000);
  const item = str_parse(localStorage.getItem(name))
  if(typeof item==='object' && item!=null){
    const expirationTime = item.expirationTime
    if(expirationTime>=current){
      return item.data
    }
  }else{
    return false
  }
}

function delete_local_storage(name){
  localStorage.removeItem(name)
}

export {
  set_local_storage,
  get_local_storage,
  delete_local_storage
}