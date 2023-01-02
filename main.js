let menu=document.querySelector('#menu-bar');
let navbar=document.querySelector('.header__navbar');

menu.onclick =() =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}




let cartBuy=document.querySelector(".cart-buy");  
let cart=document.querySelector(".cart");
let closeCart=document.querySelector("#close-cart");

cartBuy.onclick = () => {
  cart.classList.add("act");
};

closeCart.onclick = () => {
  cart.classList.remove("act");
};

if(document.readyState =='loading'){
  document.addEventListener('DOMContentLoaded',ready);
}else{
  ready();
}

function ready(){
  var removeCartButtons=document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for(var i=0;i<removeCartButtons.length;i++){
    var button =removeCartButtons[i];
    button.addEventListener("click",removeCartItem);
  }

  var numberInputs=document.getElementsByClassName("cart-number");
  for(var i=0;i<numberInputs.length;i++){
    var input=numberInputs[i];
    input.addEventListener("change",numberChanged);
  }

  var addCart=document.getElementsByClassName("add-cart");
  for(var i=0;i<addCart.length;i++){
    var button=addCart[i];
    button.addEventListener("click",addCartClicked);
  }
  
  document.getElementsByClassName('btn-buy')[0].addEventListener("click",buyButtonClicked);
}

function buyButtonClicked(){
  alert('Bạn có chắc chắn không');
  var cartContent=document.getElementsByClassName("cart-content")[0];
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event){
  var buttonClicked=event.target
  buttonClicked.parentElement.remove()
  updateTotal();
}

function numberChanged(event){
  var input=event.target;
  if(isNaN(input.value) ||input.value <=0){
    input.value=1;
  }
  updateTotal();
}

function addCartClicked(event){
  var button=event.target;
  var foodProducts=button.parentElement;
  var title=foodProducts.getElementsByClassName("food-title")[0].innerText;
  var price=foodProducts.getElementsByClassName("food-price")[0].innerText;
  var foodImg=foodProducts.getElementsByClassName("food-img")[0].src;
  addFood(title,price,foodImg);
  console.log(title,price,foodImg);
  updateTotal();
}

function addFood(title,price,foodImg){
  var cartFoodBox=document.createElement("div");
  cartFoodBox.classList.add("cart-box");
  var cartItems=document.getElementsByClassName("cart-content")[0];
  var cartItemsNames=cartItems.getElementsByClassName("cart-product-title");
  for(var i=0;i<cartItemsNames.length;i++){
    if(cartItemsNames[i].innerText==title){
       alert("Thêm vào giỏ hàng thành công");
       return;
    }
   
  }

  var cartBoxContent=` 
<img src="${foodImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-number">
</div>
<i class="fa-regular fa-trash-can cart-remove"></i>    `

cartFoodBox.innerHTML=cartBoxContent;
cartItems.append(cartFoodBox);
cartFoodBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartFoodBox.getElementsByClassName("cart-number")[0].addEventListener("change",numberChanged);
}



function updateTotal(){
  var cartContent=document.getElementsByClassName("cart-content")[0];
  var cartBoxes=cartContent.getElementsByClassName("cart-box");
  var total=0;
  for(var i=0;i<cartBoxes.length;i++){
    var cartBox=cartBoxes[i];
    var priceElement=cartBox.getElementsByClassName("cart-price")[0];
    var numberElement=cartBox.getElementsByClassName("cart-number")[0];
    var price=parseFloat(priceElement.innerText.replace("$", ""));
    var number=numberElement.value;
    total=total+ (price*number);
    
    total=Math.round(total*100)/100
    document.getElementsByClassName("total-price")[0].innerText="$"+total
  }
}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}
