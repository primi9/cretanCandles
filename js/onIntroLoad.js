//document.addEventListener("DOMContentLoaded", () => {
const startOffset = 300;
window.onload = function() {
    
    const headerSection = document.getElementById("headerReveal");

    const gridElement = document.getElementById("imageGrid");
    const images = document.querySelectorAll(".to-reveal");

    images.forEach((image, index) => {
        setTimeout(() => {
            image.style.opacity = "1";
        }, index * 1000 + startOffset);
    });
    
    setTimeout(() => {
       headerSection.classList.add('reveal-after');
    }, images.length * 1000 + startOffset); 
};
/*


function imagesReady(){
    images.forEach((image, index) => {
        setTimeout(() => {
            image.style.transform = "scale(1)";
        }, index * 900 + startOffset);
    });
    
    setTimeout(() => {
       headerSection.classList.add('reveal-after');
    }, images.length * 900 + startOffset);
}

function imageLoaded(){
    loadedImgs++;
    console.log(loadedImgs);
    if (loadedImgs == images.length)
        imagesReady();
}

const headerSection = document.getElementById("headerReveal");
const images = document.querySelectorAll(".to-reveal");
let loadedImgs = 0;
const startOffset = 100;

images.forEach(image => {

    image.onload = () => {
        imageLoaded();
    };

    if(image.complete)
        imageLoaded();
});

*/