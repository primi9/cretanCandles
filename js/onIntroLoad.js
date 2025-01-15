//document.addEventListener("DOMContentLoaded", () => {
window.onload = function() {
    
    const headerSection = document.getElementById("headerReveal");

    const gridElement = document.getElementById("imageGrid");
    const images = document.querySelectorAll(".to-reveal");

    images.forEach((image, index) => {
        setTimeout(() => {
            image.style.opacity = '1';
            console.log(index * 800);
        }, index * 800);
    });
    
    setTimeout(() => {
       headerSection.classList.add('reveal-after');
    }, images.length * 800); 
};   