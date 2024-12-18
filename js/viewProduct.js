const closeButton =  document.getElementById('closeButton');
const blurElement = document.getElementById("blurDiv");
const arrowsElement = document.getElementById("arrows");
//create a modal element that I fill with different img and p every time, depending on which product the user clicked
const modal = document.getElementById('productModal');
const modalImage = modal.querySelector('img');

//get all the product-containers
const productContainers = document.querySelectorAll('.product-container');
const nProducts = productContainers.length;

let currentFocusedProduct = 0;//0 means no image focused.

function displayFocusedImage(element,index) {
    productImg = element.children[0];
    productDetails = element.children[2];
    
    modalImage.src = productImg.src; 
    modalImage.alt = productImg.alt;
    console.log(productDetails.textContent);
    modal.querySelector('p').textContent = productDetails.textContent;

    //updateDimensions(); // update dimensions of modal so that it fits well on every screen size
    blurElement.style.display = "block"; // blur the page, except for the focused product (modal)
    modal.style.display = "flex"; // display the product in focused mode
    closeButton.style.display = "block";//display a  close button
    arrowsElement.style.display = "block";
    document.body.style.overflow = "hidden";//make the page un - scrollable when user is checking out the product
}

//add an event listener to all product containers
productContainers.forEach((element,index) => {
    element.addEventListener("click" , () => {
        currentFocusedProduct = index + 1;
        displayFocusedImage(element);
    });
});

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
    blurElement.style.display = "none";
    closeButton.style.display = "none";
    modal.style.display = "none";
    arrowsElement.style.display = "none";
    document.body.style.overflow = "scroll";
    
    currentFocusedProduct = 0;
}