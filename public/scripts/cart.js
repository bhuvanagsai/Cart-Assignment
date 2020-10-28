let count = 0;
let datas = [];
let displayData = [];
let priceAmount = 0;
window.onload = function () {
  fetchdata();
}

// fetching data from the json
function fetchdata(){
  fetch('./JsonData/cartData.json')
  .then(response => response.json())
  .then(data =>{
    datas.push(data);
    cartItems(data);
  } );
}

//creating dynamic cards
function cartItems(data){
  $(".itemsContainer").html("");
    var html = "";
    data.items.forEach((element) => {
      let discount;
      discount = Math.round(((parseInt(element.price.display) - parseInt(element.price.actual))/parseInt(element.price.display))*100);
      html =
        html +
        `<div class = 'card-container'>
            <div class = "discount">${discount}%</div>
            <div  class = 'image-container'>
              <img src ="./images/${element.image}">
            </div>
            <div class = "productDetailsContainer">
              <div class = "product-name">${element.name}</div>
              <div class = "detailsContainer">
                <span style='color:red;text-decoration:line-through'>
                  <span style='color:black'>${element.price.display}</span>
                </span>
                <span>${element.price.actual}</span>
                <button class = "addToCart" onclick="buttonHandler(this,${element.id})">Add to cart</button>
              </div>
            </div>
          </div>`;
    });
    $(".itemsContainer").html(html);
}
//adding items to the cart
function buttonHandler(btnElement,id){
  let obj  = {};
  let message = document.getElementsByClassName('message');
  message[0].style.display = "block";
  setTimeout(function(){ message[0].style.display = "none"; }, 1000);
  if (document.getElementsByClassName("no-items").length) {
    document.getElementsByClassName("no-items")[0].remove();
  }
  document.getElementsByClassName('AmountCalcContainer')[0].style.display = "block";
  btnElement.innerHTML = "Added";
  btnElement.disabled = true;
  cartListEle = document.getElementsByClassName("cartList");
  cartListEle[0].innerHTML += `<div class = "item-Card">
                                <div class = "item-Container">
                                  <div class = "img-Container">
                                    <img src ="./images/${datas[0].items[id].image}">
                                  </div>
                                  <span class = "item-name">${datas[0].items[id].name}</span>
                                  </div>
                                  <div class = "IncDecContainer">
                                    <button class = "controlPlusbtn" onclick="addQuantity('${count}','${datas[0].items[id].price.actual}','${datas[0].items[id].price.display}')">+</button>
                                    <div class = "quantity">1</div>
                                    <button class = "controlMinusbtn" onclick="removeQuantity('${count}','${datas[0].items[id].price.actual}','${datas[0].items[id].price.display}','${datas[0].items[id].id}')">-</button>
                                  </div>
                                  <div class = "price">${datas[0].items[id].price.actual}</div>
                                </div>`;
                                let itemCount = document.getElementsByClassName('item-Card').length;
                                document.getElementsByClassName('items')[0].innerHTML = "Items"+"("+itemCount+")";
                                amountCalculator(document.getElementsByClassName('price'));
                                obj[`${count}`] = datas[0].items[id].price.display
                                displayData.push(obj);
                                totalAmount(displayData);
                                count++;
}

function addQuantity(index,actualPrice,displayPrice) {
  let quantityEle = document.getElementsByClassName('quantity');
  let priceEle = document.getElementsByClassName('price');
  let added = 0;
  let add = parseInt(quantityEle[index].innerHTML) + 1;
  quantityEle[index].innerHTML = add;
  priceEle[index].innerHTML = parseInt(actualPrice) * add;
  added = added + parseInt(displayPrice) * add;
  displayData[index][index] = added;
  amountCalculator(priceEle);
  totalAmount(displayData);

}

function removeQuantity(index,actualPrice,displayPrice,id) {
  let quantityEle = document.getElementsByClassName('quantity');
  let priceEle = document.getElementsByClassName('price');
  priceEle[index].innerHTML =
  parseInt(priceEle[index].innerHTML) - parseInt(actualPrice);
  console.log(priceEle[index].innerHTML)
  let minus = parseInt(quantityEle[index].innerHTML) - 1;
  quantityEle[index].innerHTML = minus;
  //removing the element if it reach 0 quantity
  if (minus == 0) {
    document
      .getElementsByClassName("cartList")[0]
      .children.item(parseInt(index))
      .remove();
    document.getElementsByClassName("addToCart")[id].disabled = false;
    document.getElementsByClassName("addToCart")[id].innerHTML = "Add to cart";
    //diplaying the No Items when no items in the cart
    if (document.getElementsByClassName("cartList")[0].children.length == 0) {
      document.getElementsByClassName(
        "cartList"
      )[0].innerHTML = `<div class = "no-items">No Items added</div>`;
      document.getElementsByClassName('AmountCalcContainer')[0].style.display = "none";
      displayData = [];
    }
    count--;
  }
  if(displayData.length !==0){
    displayData[index][index] =  displayData[index][index] - displayPrice;
    amountCalculator(priceEle);
    totalAmount(displayData)
}
}
//Total with discount
function amountCalculator(price){
  priceAmount = 0;
  for(j=0;j<price.length;j++){
    priceAmount = priceAmount + parseInt(price[j].innerHTML);
  }
  document.getElementsByClassName('orderTotal')[0].innerHTML = '$'+priceAmount; 
}

//Total without discount
function totalAmount(data){
  if(data[0][0] !== 0){
    let total = 0;
    for(let k=0;k<data.length;k++){
      total = total +data[k][k];
    }
  document.getElementsByClassName('displayedPrice')[0].innerHTML = '$'+total;
  document.getElementsByClassName('discountAmount')[0].innerHTML = '$'+ (total-priceAmount);
  }
}