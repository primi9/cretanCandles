const startOffset = 200;
document.addEventListener("DOMContentLoaded", () => {
//window.onload = function() {
    
    const headerSection = document.getElementById("headerReveal");

    const gridElement = document.getElementById("imageGrid");
    const images = document.querySelectorAll(".to-reveal");

    images.forEach((image, index) => {
        setTimeout(() => {
            image.style.transform = "scale(1)";
        }, index * 900 + startOffset);
    });
    
    setTimeout(() => {
       headerSection.classList.add('reveal-after');
    }, images.length * 900 + startOffset); 
});   