const closeButton =  document.getElementById('closeButton');
const blurElement = document.getElementById("blurDiv");
//create a modal element that I fill with different img and p every time, depending on which product the user clicked
const modal = document.getElementById('productModal');
const modalImage = modal.querySelector('img');
let viewDetails = false;
//add an event listener to all product containers
document.querySelectorAll('.product-container').forEach(element => {
    element.addEventListener('click', () => {
        
        event.stopPropagation();
        productImg = element.children[0];
        productDetails = element.children[2];
        
        modalImage.src = productImg.src; 
        modalImage.alt = productImg.alt;
        console.log(productDetails.textContent);
        modal.querySelector('p').textContent = productDetails.textContent;
        viewDetails = true; 
        
        //updateDimensions(); // update dimensions of modal so that it fits well on every screen size
        blurElement.style.display = "block"; // blur the page, except for the focused product (modal)
        modal.style.display = "flex"; // display the product in focused mode
        closeButton.style.display = "block";//display a  close button
        document.body.style.overflow = "hidden";//make the page un - scrollable when user is checking out the product
    });  
});
//when close button is clicked
function closeModal() {
    console.log("close button clicked");
    blurElement.style.display = "none";
    closeButton.style.display = "none";
    modal.style.display = "none";
    document.body.style.overflow = "scroll";
    viewDetails = false;
}