class CartItem{
    constructor(item,id) {
        this.id = id;
        this.itemId = item.id
        this.actualPrize = item.actualPrize;
        this.displayPrize = item.displayPrize;
        this.name = item.name;
        this.image = item.image;
        this.discount = item.discount;
    }
    render = function(){
        return`
            <div class = "item-Card" id = '${this.id}' >
            <div class = "item-Container">
            <div class = "img-Container">
                <img src ="./images/${this.image}">
            </div>
            <span class = "item-name">${this.name}</span>
            </div>
            <div class = "IncDecContainer">
                <button class = "addBtn" onclick = "addQuantity(this,'${this.itemId}')">+</button>
                <div class = "quantity">1</div>
                <button class = "minusBtn" onclick = "removeQuantity('${this.id}','${this.itemId}')">-</button>
            </div>
            <div class = "price">${this.actualPrize}</div>
            </div>
        `
    }
}