const mainInfo = document.getElementById("mainInfo");
const playButton = document.getElementById("playButton");
const video = document.getElementById("video");

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

function playButtonClick(){
    
    if(video.paused){
        video.style.opacity = "1";
        playButton.style.display = "none";
        video.play();
    } else {
        video.pause();
        video.style.opacity = "0.7";
        playButton.style.display = "block";
    }
}