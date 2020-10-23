var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    $(".itemsContainer").html("");
    var html = "";
    data.items.forEach((element) => {
      html =
        html +
        `<div class = 'card-container'><div  class = 'image-container'><img src ="./images/${element.image}" ></div><div class = "productDetailsContainer"><div class = "product-name">${element.name}</div><div class = "detailsContainer"><span style='color:red;text-decoration:line-through'><span style='color:black'>${element.price.display}</span></span><span>${element.price.actual}</span><button>Add to cart</button></div></div></div>`;
    });
    $(".itemsContainer").html(html);
  }
};
xmlhttp.open("GET", "./JsonData/cartData.json", true);
xmlhttp.send();
