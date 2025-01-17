//document.addEventListener("DOMContentLoaded", () => {
window.onload = function() {
    
    const headerSection = document.getElementById("headerReveal");

    const gridElement = document.getElementById("imageGrid");
    const images = document.querySelectorAll(".to-reveal");

    images.forEach((image, index) => {
        setTimeout(() => {
            image.style.opacity = '1';
        }, index * 900 + 100);
    });
    
    setTimeout(() => {
       headerSection.classList.add('reveal-after');
    }, images.length * 900 + 100); 
};   