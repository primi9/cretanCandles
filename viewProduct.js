const closeButton =  document.getElementById('closeButton');
const blurElement = document.getElementById("blurDiv");
const arrowsElement = document.getElementById("arrows");
const leftArrow = arrowsElement.children[0];
const rightArrow = arrowsElement.children[1];
const slideShow = document.getElementById("slide-show");
const slideShowWrapper = document.getElementById("slide-show-wrapper");

let sliderLeftX = 0;
let sliderRightX = 0;

let noUpdate = false;

//whether the arrows are disabled
let arrowsState = [false,false];

//create a modal element that I fill with different img and p every time, depending on which product the user clicked

//get all the product-containers
const productContainers = document.querySelectorAll('.product-container');
const nProducts = productContainers.length;

let current_offset = 0;
let currentFocusedProduct = 0;//0 means no image focused.

function manageArrows(index){

    if (index == 1){
        arrowsState[0] = true;
        leftArrow.disabled = true;
    }
    else if(arrowsState[0] == true){
        arrowsState[0] = false;
        leftArrow.disabled = false;
    }

    if (index == nProducts){
        arrowsState[1] = true;
        rightArrow.disabled = true;
    }
    else if(arrowsState[1] == true){
        arrowsState[1] = false;
        rightArrow.disabled = false;
    }
}

function keyPressHandler(event) {

    if(currentFocusedProduct == 0)
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
function displayFocusedImage(index) {
    
    currentFocusedProduct = index + 1;
    current_offset = index * slideShow.offsetWidth;

    manageArrows(currentFocusedProduct);
    slideShowWrapper.style.transform = `translateX(-${current_offset}px)`;
}

function focusProduct(index){
    blurElement.style.display = "block"; // blur the page, except for the focused product (modal)
    closeButton.style.display = "block";//display a  close button
    arrowsElement.style.display = "block";
    document.body.style.overflowY = "hidden";//make the page un - scrollable when user is checking out the product
    slideShow.style.display = "flex"; // display the product in focused mode
    
    displayFocusedImage(index);
}

let prevX = 0;

function touchStart(event){
    prevX = event.touches[0].clientX;
    console.log(prevX);
}

function touchMoveAction(event){
    console.log("touch");
    
    //event.preventDefault();

    //calculate on resize kanonika
    sliderLeftX = slideShow.getBoundingClientRect().left;
    sliderRightX = slideShow.getBoundingClientRect().width + sliderLeftX;

    const moveX = event.touches[0].clientX
    console.log(moveX);
    if (moveX <= sliderLeftX || moveX >= sliderRightX){
        console.log("eeeeeepppppppppppppp");
        return;
    }
    const deltaX = moveX - prevX;
    if (currentFocusedProduct == 1 && deltaX > 0){
        noUpdate = true;
        return;
    }
    if (currentFocusedProduct == 6 && deltaX < 0){
        noUpdate = true;
        return;
    }

    noUpdate = false;
    current_offset -= deltaX;
    prevX = moveX;
    console.log(current_offset);
    slideShowWrapper.style.transform = `translateX(-${current_offset}px)`;
}

function touchEnd(event) {

    if (noUpdate)
        return;

    console.log("touch end");
    console.log(current_offset);
    const endx = event.changedTouches[0].clientX
    console.log(endx);
    var current_index = current_offset / slideShow.offsetWidth;
    console.log(current_index);
    current_index = Math.round(current_index);
    console.log(current_index);
    
    slideShowWrapper.style.transition = "transform 0.5s ease";
    displayFocusedImage(current_index);

    slideShowWrapper.addEventListener('transitionend', () => {
        slideShowWrapper.style.transition = "transform 0s ease";
    }, { once: true });
}

slideShow.addEventListener('touchstart',touchStart);
slideShow.addEventListener('touchmove', touchMoveAction);
slideShow.addEventListener('touchend', touchEnd);

//add an event listener to all product containers
productContainers.forEach((element,index) => {
    element.addEventListener("click" , () => {
        focusProduct(index);
    });
});

document.addEventListener('keydown', keyPressHandler);

//when an arrow is clicked:
function arrowPressed(n){
    console.log("arrow pressed");
    const width = slideShow.offsetWidth;

    if (n == 1) {//if pressed next arrow
        current_offset += width;
        currentFocusedProduct += 1;
    }
    else {
        current_offset -= width;
        currentFocusedProduct -= 1;
    }
    manageArrows(currentFocusedProduct);
    slideShowWrapper.style.transform = `translateX(-${current_offset}px)`;
}

//when close button is clicked
function closeModal() {
    console.log("close button clicked");
    blurElement.style.display = "none";
    closeButton.style.display = "none";
    slideShow.style.display = "none";
    arrowsElement.style.display = "none";
    document.body.style.overflowY = "auto";
    slideShowWrapper.style.transform = `translateX(${current_offset}px)`;

    current_offset = 0;
    currentFocusedProduct = 0;
}