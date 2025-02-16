document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category-description");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting ) {
                    entry.target.style.opacity = "1";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3}
    );

    categories.forEach(category => observer.observe(category));
});

window.onload = function () {

    function changeScale() {

        if(transformScale){
            backgroundImg.style.transform = "scale(1.04)";
            transformScale = 0;
        }
        else {
            backgroundImg.style.transform = "scale(1)";
            transformScale = 1;
        }
    }

    function preloadImages() {

        for (let i = 0; i < numImages; i++) {
            const img = new Image();
            img.src = mainSlideImages[i];
        }
    }

    function changeSlideBackground() {
        index = (index + 1) % numImages;
        backgroundImg.style.backgroundImage = `url("${mainSlideImages[index]}")`;
    }

    const mainSlideImages = ["images/candles1.webp" , "images/candles2.webp" , "images/candles3.webp" , "images/candles4.webp"];

    const backgroundImg = document.getElementById("backgroundImg");
    const numImages = mainSlideImages.length;
    let index = 0;
    let transformScale = 1;

    backgroundImg.addEventListener("transitionend", (event) => {
        
        if(event.propertyName == "transform")
            changeScale();
    });

    preloadImages();
    changeScale();
    setInterval(changeSlideBackground, 3500);
};