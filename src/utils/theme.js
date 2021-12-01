let initColor = localStorage.getItem('themeColor') || 'rgba(0,0,0,0.8)'
export function changeTheme(color=initColor){
  localStorage.setItem('themeColor',color)
  document.body.style.color = color
}