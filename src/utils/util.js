function str_parse(data){
  let result
  try {
    result = JSON.parse(data)
  } catch (error) {
    
  }
  return result
}

export {
  str_parse
}