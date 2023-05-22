
const switchElement = document.querySelector('.theme__switch');

export function themeSwitch() {
console.log(switchElement.checked);
if(switchElement.checked){
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}
else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}
}

export function setThemeOnLoad(){
   const currentTheme = localStorage.getItem('theme');
   document.body.classList.add(currentTheme);

   if(currentTheme === 'dark'){
    switchElement.checked = true;
   } 

}