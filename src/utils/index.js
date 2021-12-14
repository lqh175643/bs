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
  }
  console.log(arr);
  return arr;
}
export { changeTheme, urlFilter };
