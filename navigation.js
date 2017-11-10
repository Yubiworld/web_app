/*/My Selectors/*/

let burger = document.querySelector("#burger");
let burgerExit = document.querySelector("#burger-exit");
let nav = document.querySelector("#full-nav-box");
let mainContent = document.querySelector(".main-content");


burger.addEventListener('click', showNav);
function showNav(){
    nav.classList.remove('dont-show');
    mainContent.classList.add('dont-show');
}

burgerExit.addEventListener('click', hideNav);
function hideNav(){
    nav.classList.add('dont-show');
    mainContent.classList.remove('dont-show');
}


