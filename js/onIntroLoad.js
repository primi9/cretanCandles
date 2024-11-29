document.addEventListener("DOMContentLoaded", () => {
    //window.onload = function() {
    
    const headerSection = document.getElementById("headerReveal");
    //const headerElement = document.getElementById("header");
    //const enterButton = document.getElementById("enterButton");
    const gridElement = document.getElementById("imageGrid");
    const images = document.querySelectorAll(".to-reveal");
 
    images.forEach((image, index) => {
          setTimeout(() => {
          image.style.opacity = "1";
          //image.style.transform = "translateY(0)";
       }, index * 500);
    });
    
    setTimeout(() => {
       headerSection.classList.add('reveal-after');
       //headerElement.classList.add('reveal-after');
       //enterButton.style.display = "block";
       //enterButton.style.opacity = "1";
       //enterButton.classList.add('reveal-after-button');
       //console.log(getComputedStyle(enterButton));
       //background-color:rgba(0, 0, 0, 0.85);
       //gridElement.style.background = "#fdf5e7";
       
       gridElement.style.opacity = "0.3";
    }, images.length * 500); 
});   