var xmlhttp = new XMLHttpRequest();
let cartData;
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    cartData = JSON.parse(this.responseText);
    $(".itemsContainer").html("");
    var html = "";
    cartData.items.forEach((element) => {
      let discount;
      discount = Math.round(((parseInt(element.price.display) - parseInt(element.price.actual))/parseInt(element.price.display))*100);
      html =
        html +
        `<div class = 'card-container'><div class = "discount">${discount}%</div><div  class = 'image-container'><img src ="./images/${element.image}" ></div><div class = "productDetailsContainer"><div class = "product-name">${element.name}</div><div class = "detailsContainer"><span style='color:red;text-decoration:line-through'><span style='color:black'>${element.price.display}</span></span><span>${element.price.actual}</span><button class = "addToCart">Add to cart</button></div></div></div>`;
    });
    $(".itemsContainer").html(html);
  }
};
xmlhttp.open("GET", "./JsonData/cartData.json", true);
xmlhttp.send();
let count = 0;
window.onload = function () {
  let ele = document.getElementsByTagName("button");
  for (let i = 0; i < ele.length; i++) {
    ele[i].addEventListener("click", () => {
      let message = document.getElementsByClassName('message');
      message[0].style.display = "block";
      setTimeout(function(){ message[0].style.display = "none"; }, 1000);
      ele[i].setAttribute("data-add", `added${count}`);
      buttonHandler(ele[i], cartData.items[i], count++);
      if (document.getElementsByClassName("no-items").length) {
        document.getElementsByClassName("no-items")[0].remove();
      }
    });
  }
};
let displayData = [];
function buttonHandler(btnElement, e, count) {
  let obj  = {};
  document.getElementsByClassName('AmountCalcContainer')[0].style.display = "block";
  btnElement.innerHTML = "Added";
  btnElement.disabled = true;
  cartListEle = document.getElementsByClassName("cartList");
  cartListEle[0].innerHTML += `<div class = "item-Card">
                                <div class = "item-Container">
                                  <div class = "img-Container">
                                    <img src ="./images/${e.image}">
                                  </div>
                                  <span class = "item-name">${e.name}</span>
                                  </div>
                                  <div class = "IncDecContainer">
                                    <button class = "controlPlusbtn" onclick="addFunction(document.getElementsByClassName('quantity'),'${count}',document.getElementsByClassName('price'),'${e.price.actual}','${e.price.display}')">+</button>
                                    <div class = "quantity">1</div>
                                    <button class = "controlMinusbtn" onclick="minusFunction(document.getElementsByClassName('quantity'),'${count}',document.getElementsByClassName('price'),'${e.price.actual}','${e.price.display}','${e.id}')">-</button>
                                  </div>
                                  <div class = "price">${e.price.actual}</div>
                                </div>`;
                                let itemCount = document.getElementsByClassName('item-Card').length;
                                document.getElementsByClassName('items')[0].innerHTML = "Items"+"("+itemCount+")";
                                amountCalculator(document.getElementsByClassName('price'));
                                obj[`${count}`] = e.price.display
                                displayData.push(obj);
                                totalAmount(displayData);
};
function addFunction(quantity, index, price,actualPrice,displayPrice) {
  let added = 0;
  let add = parseInt(quantity[index].innerHTML) + 1;
  quantity[index].innerHTML = add;
  price[index].innerHTML = parseInt(actualPrice) * add;
  added = added + parseInt(displayPrice) * add;
  displayData[index][index] = added;
  amountCalculator(price);
  totalAmount(displayData);

}

function minusFunction(quantity, index, price,actualPrice,displayPrice, id) {
  price[index].innerHTML =
    parseInt(price[index].innerHTML) - parseInt(actualPrice);
  let minus = parseInt(quantity[index].innerHTML) - 1;
  quantity[index].innerHTML = minus;
  if (minus == 0) {
    document
      .getElementsByClassName("cartList")[0]
      .children.item(parseInt(index))
      .remove();
    document.getElementsByClassName("addToCart")[id].disabled = false;
    document.getElementsByClassName("addToCart")[id].innerHTML = "Add to cart";
    if (document.getElementsByClassName("cartList")[0].children.length == 0) {
      document.getElementsByClassName(
        "cartList"
      )[0].innerHTML = `<div class = "no-items">No Items added</div>`;
      document.getElementsByClassName('AmountCalcContainer')[0].style.display = "none";
    }
    count--;
  }
  displayData[index][index] =  displayData[index][index] - displayPrice;
  amountCalculator(price);
  totalAmount(displayData)

}

let priceAmount = 0;
let dispPrice = 0;
function amountCalculator(price){
  priceAmount = 0;
  for(j=0;j<price.length;j++){
    priceAmount = priceAmount + parseInt(price[j].innerHTML);
  }
  document.getElementsByClassName('orderTotal')[0].innerHTML = '$'+priceAmount; 
}
function totalAmount(data){
  let total = 0;
  for(let k=0;k<data.length;k++){
    total = total +data[k][k];
  }
  document.getElementsByClassName('displayedPrice')[0].innerHTML = '$'+total;
  document.getElementsByClassName('discountAmount')[0].innerHTML = '$'+ (total-priceAmount);
}