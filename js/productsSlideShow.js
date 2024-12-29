function startSlider(){
    ArrowLeft.disabled = true;
    if (imageList.length - imagesSlide.length <= 0)
        ArrowRight.disabled = true;

    for(let i = 0; i < imagesSlide.length; i++)
        imagesSlide[i].src = imageList[i];

    focusedIndex = 0;
    imagesSlide[0].classList.add("active-slideShow-image");
    focusedImage.src = imageList[0];
}

function setFocusedImage(index){

    if(focusedIndex == index)
        return;

    if (focusedIndex != -1)
        imagesSlide[focusedIndex].classList.remove("active-slideShow-image");

    focusedIndex = index;

    imagesSlide[focusedIndex].classList.add("active-slideShow-image");
    focusedImage.src = imageList[focusedIndex + slideStartIndex];
}

function leftArrowPressed(){

    slideStartIndex -= 1;

    for(let i = 0; i < imagesSlide.length; i++)
        imagesSlide[i].src = imageList[slideStartIndex + i];

    if(focusedIndex == imagesSlide.length - 1){
        imagesSlide[imagesSlide.length - 1].classList.remove("active-slideShow-image");
        focusedIndex = -1;
    }
    else if(focusedIndex != -1)
        setFocusedImage(focusedIndex + 1);
    
    ArrowRight.disabled = false;
    if(slideStartIndex == 0)
        ArrowLeft.disabled = true;
}

function rightArrowPressed(){

    slideStartIndex += 1;

    for(let i = 0; i < imagesSlide.length; i++)
        imagesSlide[i].src = imageList[slideStartIndex + i];

    if(focusedIndex == 0){
        imagesSlide[0].classList.remove("active-slideShow-image");
        focusedIndex = -1;
    }
    else if(focusedIndex != -1)
        setFocusedImage(focusedIndex - 1);
    
    ArrowLeft.disabled = false;
    if(slideStartIndex == imageList.length - imagesSlide.length)
        ArrowRight.disabled = true;
}

const productsContainer = document.getElementById("productsContainer");
const focusedImage = document.getElementById("focusedImage");
const ArrowLeft = document.getElementById("leftArrow");
const ArrowRight = document.getElementById("rightArrow");
const imagesSlide = document.querySelectorAll(".slideImage");
const imageList = ["images/eikona91.jpg" , "images/eikona92.jpg" , "images/eikona93.jpg" , "images/eikona94.jpg" , "images/eikona91.jpg","images/eikona91.jpg","images/eikona91.jpg"];

let slideStartIndex = 0;
let focusedIndex;

startSlider();

//set a listener
imagesSlide.forEach((img, index) => {
    img.addEventListener('click', () => {
        setFocusedImage(index);
    });
});
