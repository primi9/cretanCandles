const headerSection = document.getElementById("headerReveal");
const gridElement = document.getElementById("imageGrid");
const images = Array.from(document.querySelectorAll(".front-image")).reverse();
const imgContainers = document.querySelectorAll(".img-container2");


window.onload = function() {
   
   const cells = gridElement.children;

   images.forEach((image, index) => {
      const currentCell = imgContainers[index];
      const cellRect = currentCell.getBoundingClientRect();
      const currentImagRect = image.getBoundingClientRect();

      const translateX = cellRect.left - currentImagRect.left;
      const translateY = cellRect.top - currentImagRect.top;
      const scaleX = cellRect.width / currentImagRect.width;
      const scaleY = cellRect.height / currentImagRect.height;

      setTimeout(() => {
         image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})` ;
      }, index * 500);

   });
   
 
};