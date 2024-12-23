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

function displayFocusedImage(element) {
    productImg = element.children[0];
    productDetails = element.children[2];
    
    modalImage.src = productImg.src; 
    modalImage.alt = productImg.alt;

    modal.querySelector('p').textContent = productDetails.textContent;
}

function focusProduct(element){
    displayFocusedImage(element);

    handleButtons.style.display = "block"; // display the handlers
    modal.style.display = "flex"; // display the product in focused mode
    document.body.style.overflowY = "hidden";//make the page un - scrollable when user is checking out the product
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

//when an arrow is clicked:
async function arrowPressed(n){
    
    if(processing)
        return;

    processing = true;

    if (n == 1) {//if pressed next arrow
        if (currentFocusedProduct == nProducts)
            currentFocusedProduct = 1;
        else 
            currentFocusedProduct += 1;
    }
    else {
        if (currentFocusedProduct == 1)
            currentFocusedProduct = nProducts;
        else 
            currentFocusedProduct -= 1;
    }
    const currentElement = document.querySelector(`[data-index="${currentFocusedProduct}"]`);

    await waitOpacityChange("0");
    displayFocusedImage(currentElement);    
    await waitOpacityChange("1");

    processing = false;
}

//when close button is clicked
function closeModal() {
    console.log("close button clicked");
    handleButtons.style.display = "none";
    
    modal.style.display = "none";
    document.body.style.overflowY = "auto";
    
    currentFocusedProduct = 0;
}

let startX = 0;
let minSlideX = 50;
let processing = false; // flag indicating that image in view mode is the middle of transitioning

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

function mouseStart(event){
    console.log("mpuse start");
    startX = event.clientX;
    console.log(startX);
}

function mouseEnd(event) {

    console.log("mouse end");
    const endX = event.clientX;
    console.log(endX);

    if ((endX - startX) > minSlideX)
        arrowPressed(-1);
    else if ((endX - startX < - minSlideX))
        arrowPressed(1);
}

const handleButtons = document.getElementById("handleButtons");
//create a modal element that I fill with different img and p every time, depending on which product the user clicked
const modal = document.getElementById('productModal');
const modalImage = modal.querySelector('img');

//get all the product-containers
const productContainers = document.querySelectorAll('.product-container');
const nProducts = productContainers.length;

let currentFocusedProduct = 0;//0 means no image focused.

document.addEventListener('keydown', keyPressHandler);

//add an event listener to all product containers
productContainers.forEach((element,index) => {
    element.addEventListener("click" , () => {
        currentFocusedProduct = index + 1;
        focusProduct(element);
    });
});

modal.addEventListener('touchstart',touchStart);
modal.addEventListener('touchend', touchEnd);
modal.addEventListener("touchcancel", touchEnd);

modal.addEventListener('mousedown',mouseStart);
modal.addEventListener('mouseup', mouseEnd);