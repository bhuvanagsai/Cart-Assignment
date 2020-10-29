import {Card} from './card';
import {CartItem} from './cartItem';

let itemList = {};
let cart = {};
let total = 0;
let priceAmount = 0;

window.onload = function () {
  fetchdata();
};
// fetching data from the json
function fetchdata() {
  fetch("./JsonData/cartData.json")
    .then((response) => response.json())
    .then((data) => {
      cartItems(data);
    });
}

//creating dynamic cards
function cartItems(data) {
  const parent = document.querySelector(".itemsContainer");
  data.items.map((element) => {
    //discount calculation
    let discount;
    discount = Math.round(
      ((parseInt(element.price.display) - parseInt(element.price.actual)) /
        parseInt(element.price.display)) *
        100
    );
    itemList[element.id] = new Card(
      element.id,
      element.name,
      element.image,
      element.price.actual,
      element.price.display,
      discount
    );
    parent.insertAdjacentHTML("beforeend", itemList[element.id].render());
  });

  //adding Event Listener to the button
  document.querySelectorAll(".addToCart").forEach((item) => {
    item.addEventListener("click", (event) => {
      //cart item sucessfully added message
      let message = document.querySelector(".message");
      message.style.display = "block";
      setTimeout(function () {
        message.style.display = "none";
      }, 1000);

      //changing the button style
      event.target.innerHTML = "Added";
      event.target.disabled = true;

      //removing no items title
      if (document.getElementsByClassName("no-items").length) {
        document.getElementsByClassName("no-items")[0].remove();
      }

      //displaying amount container
      document.querySelector(".AmountCalcContainer").style.display = "block";

      let id = event.target.getAttribute("id");
      addingItemToCart(itemList[id]);
    });
  });

}

//adding items to the cart
function addingItemToCart(item) {
  const parent = document.querySelector(".cartList");
  const len = document.querySelectorAll(".item-Card").length;
  cart[item.id] = new CartItem(item, len);
  parent.insertAdjacentHTML("beforeend", cart[item.id].render());
  amountCalculator(cart[item.id].actualPrize,cart[item.id].displayPrize, "initial");
  //update the quantity in the Total amount Container
  itemCountHandler(document.querySelector(".items"));
}

//add quantity (+)
window.addQuantity = function(ele, id) {
  let parent = ele.closest(".item-Card");
  let qty = parent.querySelector(".quantity");
  qty.innerText = parseInt(qty.innerText) + 1;
  let price = parent.querySelector(".price");
  price.innerText = parseInt(itemList[id].actualPrize) * qty.innerText;
  amountCalculator(parseInt(itemList[id].actualPrize),parseInt(itemList[id].displayPrize), "add");
}

// remove the quantity (-)
window.removeQuantity = function(id, itemId) {
  let parent = document.querySelector('.item-Card[id="' + id + '"]');
  let qty = parent.querySelector(".quantity");
  amountCalculator(parseInt(cart[itemId].actualPrize),parseInt(cart[itemId].displayPrize), "sub");
  if (parseInt(qty.innerText) - 1 == 0) {
    parent.remove();
    itemCountHandler(document.querySelector(".items"));
    let btnElement = document.querySelector('.addToCart[id="' + itemId + '"]');
    btnElement.innerText = "Add to Cart";
    btnElement.disabled = false;
  }
  //if the cart is empty
  if (document.querySelector(".cartList").innerText == "") {
    document.querySelector(
      ".cartList"
    ).innerHTML = `<div class = "no-items">No Items added</div>`;
    document.querySelector(".AmountCalcContainer").style.display = "none";
    priceAmount = 0;
    total = 0;
  }
  qty.innerText = parseInt(qty.innerText) - 1;
  let price = parent.querySelector(".price");
  price.innerText =
    parseInt(price.innerText) - parseInt(itemList[itemId].actualPrize);
}

// item Count calculator
function itemCountHandler(count) {
  count.innerText =
    "Items(" + document.querySelectorAll(".item-Card").length + ")";
}
// order total  , discount and actual amount
function amountCalculator(actualPrize,displayPrize ,type) {
  if (type == "add" || type == "initial") {
    priceAmount = priceAmount + actualPrize;
    total = total + displayPrize;
  } else if (type == "sub") {
    priceAmount = priceAmount - actualPrize;
    total = total - displayPrize;
  }
  document.getElementsByClassName("orderTotal")[0].innerHTML =
    "$" + priceAmount;
    document.getElementsByClassName("displayedPrice")[0].innerHTML = "$" + total;
    document.getElementsByClassName("discountAmount")[0].innerHTML =
      "$" + (total - priceAmount);
}
