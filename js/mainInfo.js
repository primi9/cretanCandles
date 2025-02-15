function modifyHeader(){
    mainInfo.children[0].style.display = "block";
    mainInfo.children[3].style.display = "none";
    mainInfo.children[4].style.display = "none";
    mainInfo.style.justifyContent = "flex-end";
    modified = true;
}

function resetHeader(){
    mainInfo.style.justifyContent = "center";
    mainInfo.children[0].style.display = "none";
    mainInfo.children[3].style.display = "inline-block";
    mainInfo.children[4].style.display = "inline-block";
    modified = false;
}

let modified = false;
mainInfo = document.getElementById("mainInfo");

document.addEventListener("DOMContentLoaded", () => {
    if(mainInfo.getBoundingClientRect().top <= 0)//if user already scrolled
        modifyHeader();
})

window.addEventListener('scroll', function() {

    const infoTopPos = mainInfo.getBoundingClientRect().top;
    if (!modified && infoTopPos <= 0)
        modifyHeader();
    else if(modified && infoTopPos > 0)
        resetHeader();
});
