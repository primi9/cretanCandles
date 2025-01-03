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

function setFocusedImage(index){
    
    imagesSlide[prevFocusedIndex].classList.remove("active-slideShow-image");
    imagesSlide[index].classList.add("active-slideShow-image");
    focusedImage.src = imagesSlide[index].src;
    prevFocusedIndex = index;
}

function applySmoothTransform() {

    return new Promise((resolve) => {
        
        slideWrapper.style.transition = 'transform 3s ease-in-out';
        slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;

        slideWrapper.addEventListener("transitionend", () => {
            slideWrapper.style.transition = "";
            resolve();
        },{once:true});
    });
}

function leftArrowPressed(){

    ArrowRight.disabled = false;

    const imageSlideWidth = imagesSlide[0].getBoundingClientRect().width;
    currentSliderPos += imageSlideWidth;

    if(currentSliderPos == 0)
        ArrowLeft.disabled = true;

    slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;

}

function rightArrowPressed(){

    ArrowLeft.disabled = false;
    imageSlideWidth = imagesSlide[0].getBoundingClientRect().width;
    currentSliderPos -= imageSlideWidth;

    if(currentSliderPos == -rightLimit * imageSlideWidth)
        ArrowRight.disabled = true;

    slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;

}

let startTouch = 0;
let currentSliderPos = 0;
let imageSlideWidth = 0;
let maxWidth = 0;

function touchStartSlide(event) {
    console.log("start");
    imageSlideWidth = imagesSlide[0].getBoundingClientRect().width;
    maxWidth = imageSlideWidth * nImages;
    startTouch = event.touches[0].clientX;
}

function touchMoveSlide(event) {

    const moveTouch = event.touches[0].clientX;
    const moveOffset = moveTouch - startTouch;

    if (currentSliderPos + moveOffset >= 0 || currentSliderPos + moveOffset <= - rightLimit * imageSlideWidth)
        return;

    slideWrapper.style.transform = `translateX(${currentSliderPos + moveOffset}px)`;
}

function touchEndSlide(event) {

    imageSlideWidth = imagesSlide[0].getBoundingClientRect().width;
    currentSliderPos += event.changedTouches[0].clientX - startTouch;

    if (currentSliderPos > 0)
        currentSliderPos = 0;
    else if (currentSliderPos < -rightLimit * imageSlideWidth)
        currentSliderPos = -rightLimit * imageSlideWidth;
    else{
        const remainingWidth = (-currentSliderPos) % imageSlideWidth;

        if (remainingWidth > imageSlideWidth / 2)
            currentSliderPos -= imageSlideWidth - remainingWidth;
        else
            currentSliderPos += remainingWidth;
    }

    if (currentSliderPos == 0)
        ArrowLeft.disabled = true;
    else
        ArrowLeft.disabled = false;

    if (currentSliderPos == -rightLimit * imageSlideWidth)
        ArrowRight.disabled = true;
    else
        ArrowRight.disabled = false;

    slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;

}

const productsContainer = document.getElementById("productsContainer");
const focusedImage = document.getElementById("focusedImage");
const ArrowLeft = document.getElementById("leftArrow");
const ArrowRight = document.getElementById("rightArrow");
const imagesSlide = document.querySelectorAll(".slideImage");
const slideWrapper = document.getElementById("slideWrapper");
const nImages = imagesSlide.length;
const nImagesShown = 5;
const rightLimit = nImages - nImagesShown;
const modal = document.getElementById('productModal');

let startX = 0;
let minSlideX = 60;
let processing = false;
let prevFocusedIndex = 0;
let focusedMode = false;

const slideContainermove = 60;

document.addEventListener('keydown', keyPressHandler);
modal.addEventListener('touchstart',touchStart);
modal.addEventListener('touchend', touchEnd);

slideWrapper.addEventListener('touchstart' , touchStartSlide);
slideWrapper.addEventListener('touchmove' , touchMoveSlide);
slideWrapper.addEventListener('touchend' , touchEndSlide);

//set a listener
imagesSlide.forEach((img, index) => {
    img.addEventListener('click', () => {
        setFocusedImage(index);
    });
});

imagesSlide[0].classList.add("active-slideShow-image");
ArrowLeft.disabled = true;