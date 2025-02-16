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

    const mainSlideImages = ["images/candles1.png" , "images/candles2.png" , "images/candles3.png" , "images/candles4.png"];
    const backgroundImg = document.getElementById("backgroundImg");
    const numImages = mainSlideImages.length;
    let index = 0;

    function changeSlideBackground() {
        
        backgroundImg.style.backgroundImage = `url('${mainSlideImages[index]}')`;

        if(index % 2)
            backgroundImg.style.transform = "scale(1)";
        else
            backgroundImg.style.transform = "scale(1.05)";

        index = (index + 1) % numImages; 
    }

    changeSlideBackground();
    setInterval(changeSlideBackground, 3500);
});
