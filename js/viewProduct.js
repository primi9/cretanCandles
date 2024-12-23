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

//when an arrow is clicked:
function arrowPressed(n){
    
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
    displayFocusedImage(currentElement);
}

//when close button is clicked
function closeModal() {
    console.log("close button clicked");
    handleButtons.style.display = "none";
    modal.style.display = "none";
    document.body.style.overflowY = "auto";
    
    currentFocusedProduct = 0;
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
