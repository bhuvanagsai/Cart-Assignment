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
  amountCalculator(cart[item.id].actualPrize, "initial");
  totalAmount(cart[item.id].displayPrize, "initial");
  //update the quantity in the Total amount Container
  itemCountHandler(document.querySelector(".items"));
}

//add quantity (+)
function addQuantity(ele, id) {
  let parent = ele.closest(".item-Card");
  let qty = parent.querySelector(".quantity");
  qty.innerText = parseInt(qty.innerText) + 1;
  let price = parent.querySelector(".price");
  price.innerText = parseInt(itemList[id].actualPrize) * qty.innerText;
  amountCalculator(parseInt(itemList[id].actualPrize), "add");
  totalAmount(parseInt(itemList[id].displayPrize), "add");
}

// remove the quantity (-)
function removeQuantity(id, itemId) {
  let parent = document.querySelector('.item-Card[id="' + id + '"]');
  let qty = parent.querySelector(".quantity");
  amountCalculator(parseInt(cart[itemId].actualPrize), "sub");
  totalAmount(parseInt(cart[itemId].displayPrize), "sub");
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
    parseInt(price.innerText) - parseInt(itemList[id].actualPrize);
}

// item Count calculator
function itemCountHandler(count) {
  count.innerText =
    "Items(" + document.querySelectorAll(".item-Card").length + ")";
}
//Total with discount
function amountCalculator(price, type) {
  if (type == "add" || type == "initial") {
    priceAmount = priceAmount + price;
  } else if (type == "sub") {
    priceAmount = priceAmount - price;
  }
  document.getElementsByClassName("orderTotal")[0].innerHTML =
    "$" + priceAmount;
}

//Total without discount
function totalAmount(price, type) {
  if (type == "add" || type == "initial") {
    total = total + price;
  } else if (type == "sub") {
    total = total - price;
  }
  document.getElementsByClassName("displayedPrice")[0].innerHTML = "$" + total;
  document.getElementsByClassName("discountAmount")[0].innerHTML =
    "$" + (total - priceAmount);
}
