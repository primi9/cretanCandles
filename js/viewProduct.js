function touchStart(event){
    console.log("touch start");
    startX = event.touches[0].clientX;
    console.log(startX);
}

function touchEnd(event) {

    console.log("touch end");
    const endX = event.changedTouches[0].clientX;
    console.log(endX);

    if ((endX - startX) > minSlideX)
        arrowPressed(-1);
    else if ((endX - startX < - minSlideX))
        arrowPressed(1);
}

function keyPressHandler(event) {

    if(!focusedMode)
        return;

    if (event.key == "Escape"){
        closeModal();
        return;
    }

    if (event.key == "ArrowLeft"){
        arrowPressed(-1);
        return;
    }

    if (event.key == "ArrowRight"){
        arrowPressed(1);
        return;
    }
}

function waitOpacityChange(opacityValue){

    modal.style.opacity = opacityValue;

    const promise = new Promise((resolve) => {
        modal.addEventListener("transitionend", () => {
            resolve();
        }, {once: true});
    });

    return promise;
}

async function arrowPressed(n){
    
    if(processing)
        return;

    processing = true;

    if (n == 1) {//if pressed next arrow
        if (foregroundImageIndex == imageList.length - 1)
            foregroundImageIndex = 0;
        else 
        foregroundImageIndex += 1;
    }
    else {
        if (foregroundImageIndex == 0)
            foregroundImageIndex = imageList.length - 1;
        else 
            foregroundImageIndex -= 1;
    }

    await waitOpacityChange("0");
    displayFocusedImage(foregroundImageIndex);
    await waitOpacityChange("1");

    processing = false;
}

function displayFocusedImage(imgIndex) {
    modal.src = imageList[imgIndex];
}

function focusProduct(){

    mainInfo.style.display = "none";

    focusedMode = true;

    if (focusedIndex != -1){
        imagesSlide[focusedIndex].classList.remove("active-slideShow-image");
        focusedIndex = -1;
    }

    displayFocusedImage(foregroundImageIndex);

    handleButtons.style.display = "block"; // display the handlers
    modal.style.display = "flex"; // display the product in focused mode
    document.body.style.overflowY = "hidden";//make the page un - scrollable when user is checking out the product
}

function closeModal() {

    console.log("close button clicked");

    if (foregroundImageIndex >= slideStartIndex && foregroundImageIndex < slideStartIndex + imagesSlide.length)
        setFocusedImage(foregroundImageIndex - slideStartIndex);

    handleButtons.style.display = "none";
    
    modal.style.display = "none";
    document.body.style.overflowY = "auto";
    mainInfo.style.display = "flex";
    focusedMode = false;
}

function startSlider(){
    ArrowLeft.disabled = true;

    if (imageList.length - imagesSlide.length <= 0)
        ArrowRight.disabled = true;

    for(let i = 0; i < imagesSlide.length; i++)
        imagesSlide[i].src = imageList[i];

    slideStartIndex = 0;
    focusedIndex = 0;
    foregroundImageIndex = 0;
    imagesSlide[0].classList.add("active-slideShow-image");
    focusedImage.src = imageList[0];
}

function setFocusedImage(index){

    if (focusedIndex != -1)
        imagesSlide[focusedIndex].classList.remove("active-slideShow-image");

    focusedIndex = index;
    foregroundImageIndex = slideStartIndex + index;

    imagesSlide[focusedIndex].classList.add("active-slideShow-image");
    focusedImage.src = imageList[foregroundImageIndex];
}

function leftArrowPressed(){

    slideStartIndex -= 1;

    for(let i = 0; i < imagesSlide.length; i++)
        imagesSlide[i].src = imageList[slideStartIndex + i];

    if(focusedIndex == imagesSlide.length - 1){
        imagesSlide[focusedIndex].classList.remove("active-slideShow-image");
        focusedIndex = -1;
    }
    else if(focusedIndex != -1){
        imagesSlide[focusedIndex].classList.remove("active-slideShow-image");
        imagesSlide[focusedIndex + 1].classList.add("active-slideShow-image");
        focusedIndex += 1;
    }
    else if (focusedIndex == -1){
        if (foregroundImageIndex == slideStartIndex){
            focusedIndex = 0;
            imagesSlide[0].classList.add("active-slideShow-image");
        }
    }
    
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
    else if(focusedIndex != -1){
        imagesSlide[focusedIndex].classList.remove("active-slideShow-image");
        imagesSlide[focusedIndex - 1].classList.add("active-slideShow-image");
        focusedIndex -= 1;
    }
    else if (focusedIndex == -1){
        if (foregroundImageIndex == slideStartIndex + imagesSlide.length - 1){
            focusedIndex = imagesSlide.length - 1;
            imagesSlide[focusedIndex].classList.add("active-slideShow-image");
        }
    }
    
    ArrowLeft.disabled = false;
    if(slideStartIndex == imageList.length - imagesSlide.length)
        ArrowRight.disabled = true;
}

function touchStartSlider(event){

    slideContainertouchS = event.touches[0].clientX;
}

function touchStartSlider(event){

    slideContainertouchS = event.touches[0].clientX;
}

function touchMoveSlider(event){

    if (movedSlider)
        return;

    const moveTouch = event.touches[0].clientX;

    if ((moveTouch - slideContainertouchS > slideContainermove / 2) && slideStartIndex != 0){
        movedSlider = true;
        for(let i = 0; i < imagesSlide.length; i++){
            imagesSlide[i].style.transform = "translate(0.5rem) scale(0.95)";

        }
    }
    else if (moveTouch - slideContainertouchS < (-slideContainermove / 2) && slideStartIndex != imageList.length - imagesSlide.length){
        movedSlider = true;
        for(let i = 0; i < imagesSlide.length; i++)
            imagesSlide[i].style.transform = "translate(-0.5rem) scale(0.95)";
    }
}

function touchEndSlider(event) {

    console.log("touch end");
    movedSlider = false;
    
    const endX = event.changedTouches[0].clientX;
    for(let i = 0; i < imagesSlide.length; i++)
        imagesSlide[i].style.transform = "translate(0) scale(1)";

    if ((endX - slideContainertouchS) > slideContainermove && slideStartIndex != 0)
        leftArrowPressed();
    else if ((endX - slideContainertouchS < - slideContainermove) && slideStartIndex != imageList.length - imagesSlide.length)
        rightArrowPressed();
}

const productsContainer = document.getElementById("productsContainer");
const focusedImage = document.getElementById("focusedImage");
const ArrowLeft = document.getElementById("leftArrow");
const ArrowRight = document.getElementById("rightArrow");
const imagesSlide = document.querySelectorAll(".slideImage");
const slideImageContainer = document.getElementById("imagesSlide");

const imageList = ["images/eikona91.jpg" , "images/eikona92.jpg" , "images/eikona93.jpg" , "images/eikona94.jpg" , "images/eikona91.jpg","images/eikona91.jpg","images/eikona91.jpg"];
const modal = document.getElementById('productModal');

let startX = 0;
let minSlideX = 60;
let processing = false;
let focusedMode = false;
let focusedIndex;
let foregroundImageIndex;
let slideStartIndex;
let slideContainertouchS = 0;
let slideContainertouchE = 0;
const slideContainermove = 60;
let movedSlider = false;

document.addEventListener('keydown', keyPressHandler);
modal.addEventListener('touchstart',touchStart);
modal.addEventListener('touchend', touchEnd);

slideImageContainer.addEventListener('touchstart',touchStartSlider);

slideImageContainer.addEventListener('touchmove',touchMoveSlider);

slideImageContainer.addEventListener('touchend', touchEndSlider);

//set a listener
imagesSlide.forEach((img, index) => {
    img.addEventListener('click', () => {
        setFocusedImage(index);
    });
});

startSlider();