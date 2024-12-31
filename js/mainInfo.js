const mainInfo = document.getElementById("mainInfo");

window.addEventListener('scroll', function() {

    const infoTopPos = mainInfo.getBoundingClientRect().top;
    if (infoTopPos <= 0){
        mainInfo.children[0].style.display = "block";
        mainInfo.style.justifyContent = "flex-end";
    }
    else {
        mainInfo.style.justifyContent = "center";
        mainInfo.children[0].style.display = "none";
    }

});