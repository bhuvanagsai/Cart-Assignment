export class Card{
    constructor(id, name, image, actual, display, discount) {
        this.id = id;
        this.actualPrize = actual;
        this.displayPrize = display;
        this.name = name;
        this.image = image;
        this.discount = discount;
    }
    render = function(){
        return`
            <div class = 'card-container'>
            <div class = "discount">${this.discount}%</div>
            <div  class = 'image-container'>
            <img src ="./images/${this.image}">
            </div>
            <div class = "productDetailsContainer">
            <div class = "product-name">${this.name}</div>
            <div class = "detailsContainer">
                <span style='color:red;text-decoration:line-through'>
                <span style='color:black'>${this.displayPrize}</span>
                </span>
                <span>${this.actualPrize}</span>
                <button class = "addToCart" id = '${this.id}'>Add to Cart</button>
            </div>
            </div>
        </div>
        `
    }
}