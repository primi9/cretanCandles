const playButton = document.getElementById("playButton");
const video = document.getElementById("video");

function playButtonClick(){
    
    if(video.paused){
        video.style.opacity = "1";
        playButton.style.display = "none";
        video.play();
    } else {
        video.pause();
        video.style.opacity = "0.8";
        playButton.style.display = "block";
    }
}