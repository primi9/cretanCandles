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

    const mainSlideImages = ["images/candles1.webp" , "images/candles2.webp" , "images/candles3.webp" , "images/candles4.webp"];
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
