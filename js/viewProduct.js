function touchStart(event){
    console.log("touch start");
    startX = event.touches[0].clientX;
    console.log(startX);
}

function touchEnd(event) {

    if(fullImgMode)
        return;

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

    if (n == 1) {
        if (prevFocusedIndex == nImages - 1)
            prevFocusedIndex = 0;
        else 
            prevFocusedIndex += 1;
    }
    else {
        if (prevFocusedIndex == 0)
            prevFocusedIndex = nImages - 1;
        else 
            prevFocusedIndex -= 1;
    }

    await waitOpacityChange("0");
    displayFocusedImage(imagesSlide[prevFocusedIndex].src);
    await waitOpacityChange("1");

    processing = false;
}

function displayFocusedImage(src) {
    modal.src = src;
}

function focusProduct(){

    focusedMode = true;

    imagesSlide[prevFocusedIndex].classList.remove("active-slideShow-image");
    displayFocusedImage(focusedImage.src);

    handleButtons.style.display = "block"; // display the handlers
    modalContainer.style.display = "block"; // display the product in focused mode
    document.body.style.overflowY = "hidden";//make the page un - scrollable when user is checking out the product
}

function displayFullImg(){
    /*
    modal.style.maxHeight = "none";
    modal.style.maxWidth = "none";
    modal.style.cursor = "zoom-out";
    modal.style.objectFit = "none";
    modal.style.position = "none";
    modal.style.overflow = "scroll";

    modal.style.transform = "translate(0);"
    body.style.overflowX = "auto";
    body.style.overflowY = "auto";
    */
}

function closeModal() {

    console.log("close button clicked");

    if(fullImgMode)
        disableFullimg();

    handleButtons.style.display = "none";
    
    modalContainer.style.display = "none";
    document.body.style.overflowY = "auto";

    imagesSlide[prevFocusedIndex].classList.add("active-slideShow-image");
    imagesSlide[prevFocusedIndex].classList.add("active-slideShow-image");
    focusedImage.src = imagesSlide[prevFocusedIndex].src;
    focusedMode = false;
}

function setFocusedImage(index){
    
    imagesSlide[prevFocusedIndex].classList.remove("active-slideShow-image");
    imagesSlide[index].classList.add("active-slideShow-image");
    focusedImage.src = imagesSlide[index].src;
    prevFocusedIndex = index;
}

/*
function applySmoothTransform() {

    processingTrans = true;

    slideWrapper.style.transition = "transform 0.3s ease-in-out";
    slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;

    function transitionEnd(){
        slideWrapper.style.transition = "";
        console.log("xaaxxaax");
        slideWrapper.removeEventListener("transitionend", transitionEnd);
        processingTrans = false;

    }
    slideWrapper.addEventListener("transitionend", transitionEnd);
}
*/

function leftArrowPressed(){

    ArrowRight.disabled = false;

    currentSliderPos += imageSlideWidth;

    if(currentSliderPos == 0)
        ArrowLeft.disabled = true;

    slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;
}

function rightArrowPressed(){

    ArrowLeft.disabled = false;
    currentSliderPos -= imageSlideWidth;

    if(currentSliderPos == -rightLimit * imageSlideWidth)
        ArrowRight.disabled = true;

    slideWrapper.style.transform = `translateX(${currentSliderPos}px)`;
}

function touchStartSlide(event) {

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

function fixAlignment(){

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

function touchEndSlide(event) {

    currentSliderPos += event.changedTouches[0].clientX - startTouch;
    fixAlignment();
}

function disableFullimg(){

    focusArrows[0].style.display = "block";
    focusArrows[1].style.display = "block";

    modal.style.maxWidth = "80dvw";
    modal.style.maxHeight = "95dvh";
    modal.style.objectFit = "contain";
    modal.style.borderRadius = "3rem";
    modalContainer.style.overflow = "hidden";

    zoomButton.classList.remove("fa-search-minus");
    zoomButton.classList.add("fa-search-plus");

    fullImgMode = false;
}

function displayFullImg() {

    if(fullImgMode){
        disableFullimg();
        return;
    }

    fullImgMode = true;

    zoomButton.classList.remove("fa-search-plus");
    zoomButton.classList.add("fa-search-minus");

    focusArrows[0].style.display = "none";
    focusArrows[1].style.display = "none";
    modalContainer.style.overflow = "auto";

    modal.style.maxWidth = "none";
    modal.style.maxHeight = "none";
    modal.style.objectFit = "fill";
    modal.style.borderRadius = "0";
}

window.addEventListener("resize", () => {

    imageSlideWidth = imagesSlide[0].getBoundingClientRect().width;
    fixAlignment();
});

const productsContainer = document.getElementById("productsContainer");
const focusedImage = document.getElementById("focusedImage");
const ArrowLeft = document.getElementById("leftArrow");
const ArrowRight = document.getElementById("rightArrow");
const imagesSlide = document.querySelectorAll(".slideImage");
const focusArrows = document.querySelectorAll(".focusArrow");
const slideWrapper = document.getElementById("slideWrapper");
const zoomButton = document.getElementById("zoomButton");
const nImages = imagesSlide.length;
const nImagesShown = 5;
const rightLimit = nImages - nImagesShown;
const modal = document.getElementById('productModal');
const modalContainer = document.getElementById('modalContainer');

let processing = false;
let prevFocusedIndex = 0;
let focusedMode = false;
let fullImgMode = false;

let startTouch = 0;
let currentSliderPos = 0;
let imageSlideWidth = imagesSlide[0].getBoundingClientRect().width;

//when product is focused
let startX = 0;
const minSlideX = 60;

document.addEventListener('keydown', keyPressHandler);
modal.addEventListener('touchstart',touchStart);
modal.addEventListener('touchend', touchEnd);

slideWrapper.addEventListener('touchstart' , touchStartSlide);
slideWrapper.addEventListener('touchmove' , touchMoveSlide);
slideWrapper.addEventListener('touchend' , touchEndSlide);

imagesSlide[0].classList.add("active-slideShow-image");
ArrowLeft.disabled = true;

imagesSlide.forEach((img, index) => {
    img.addEventListener('click', () => {
        setFocusedImage(index);
    });
});