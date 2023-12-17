
//FULL SIZE FOR PICTURE
function change(element){
    element.classList.toggle("fullsize") // clasList?
}

// Remove item from CART

let removeItem = document.getElementsByClassName("remove");
for(let i=0; i<removeItem.length; i++){
    let button = removeItem[i]
    button.addEventListener('click', removeItemFromCart)
}

function removeItemFromCart (event){
    buttonClicked = event.target   // Question!!
        buttonClicked.parentElement.parentElement.remove()
        updateTotal();
}


// UPDATE QUANTITY PRICE
let quantityInput = document.getElementsByClassName("cart-quantity-input")
for(let i=0; i<quantityInput.length; i++){
    let input =quantityInput[i]
    input.addEventListener("change", quantityChanged)
}

// VALIDATION FOR PURCHASE IF QUANTITY IS NOT NULL AND MORE THAN 1
function quantityChanged(event){
    let input= event.target
    if(isNaN(input.value) || input.value <=0){
        input.value=1
    }
    updateTotal()
}

//UPDAITING THE PRICE IN THE CART
function updateTotal(){
    let cartItem = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItem.getElementsByClassName("cart-row")
    let total = 0;
    for(let i=0; i<cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("EUR", ""))
        let quantity = quantityElement.value
        total= total +(price * quantity)
    }
    total = Math.round(total*100)/100; //TO get normal float number
    document.getElementsByClassName("cart-total-price")[0].innerText=total + "EUR"
}

//AD ITEM TO CART
let product = document.getElementsByClassName("addToBasket") 
 for(let i=0; i<product.length; i++){
    let button = product[i]
    button.addEventListener("click", addToBasketClick)
    
 }

 function addToBasketClick(event){
    let button = event.target
    let shopItem = button.parentElement
    let title = shopItem.getElementsByClassName("product-name")[0].innerText
    let price = shopItem.getElementsByClassName("product-price")[0].innerText
    let image = shopItem.getElementsByClassName("img")[0].src
    console.log(title, price, image);
    addItemToCart(title, price, image)
    updateTotal();
 }

 function addItemToCart(title, price, image){
    let cartRow = document.createElement("div")
    let carItems = document.getElementsByClassName("cart-items")[0]
    let productName = carItems.getElementsByClassName("cart-item-title")
        for(let i=0; i<productName.length; i++){
            if(productName[i].innerText === title){
                alert("This product already in cart!")
                return;
            }
        }
    let newDiv= `<div class="cart-row">
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
             <span class="cart-item-title">${title}</span>
             </div>
               <span class="cart-price cart-column">${price}</span>
               <div class="cart-quantity cart-column">
             <input class="cart-quantity-input" type="number" value="1">
             <button class="remove" type="button">REMOVE</button>
             </div>`;
        cartRow.innerHTML=newDiv

    carItems.append(cartRow);
    
    // Remove item after puting in cart
    cartRow.getElementsByClassName("remove")[0].addEventListener("click", removeItemFromCart)
    
    // VALIDATION FOR PURCHASE IF QUANTITY IS NOT NULL AND MORE THAN 1 after puting item in Cart
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)

 }


    // Finishing the purchase

    document.getElementsByClassName("purchase")[0].addEventListener("click",clearCart )
    
    
    function clearCart(){
        alert ("thank you for purchase")
        const cart = document.getElementsByClassName("cart-items")[0]
        while(cart.hasChildNodes()){
            cart.removeChild(cart.firstChild)
        }
        updateTotal()
    }

