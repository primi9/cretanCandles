
window.addEventListener('scroll', function() {

    const infoTopPos = mainInfo.getBoundingClientRect().top;
    if (infoTopPos <= 0){
        mainInfo.children[0].style.display = "block";
        mainInfo.children[3].style.display = "none";
        mainInfo.children[4].style.display = "none";
        mainInfo.style.justifyContent = "flex-end";
    }
    else {
        mainInfo.style.justifyContent = "center";
        mainInfo.children[0].style.display = "none";
        mainInfo.children[3].style.display = "inline-block";
        mainInfo.children[4].style.display = "inline-block";
    }
});
