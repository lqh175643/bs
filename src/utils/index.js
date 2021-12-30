import { changeTheme } from "./theme";

function urlFilter(arr) {
  if (arr) {
    arr = arr.map((item) => {
      if (item.includes("url")) {
        return item.split(/\(|\)/)[1];
      } else {
        return item;
      }
    });
    arr = arr.filter((item) => {
      if (item != "none" && item != undefined) return item;
    });
    arr = arr.map(item=>{
      return item.split('"')[1]
    })
  }
  return arr;
}
export { changeTheme, urlFilter };
