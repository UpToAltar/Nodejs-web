const cartValue = document.querySelector(".cart-shop-wrapValue");
const btnAddDetail = document.querySelector(".detail-add-quantity");
const btnDeleteDetail = document.querySelector(".detail-delete-quantity");
const inputDetailQuantity = document.querySelector(".detail-input-quantity");
let value = localStorage.getItem('totalSP') ? JSON.parse(localStorage.getItem('totalSP')) : 0;

const overlayCart = document.querySelector(".overlay")
const cartShop = document.querySelector(".cart-shop")
const shop = document.querySelector(".shop")
const back = document.querySelector(".back-to-shop")
const back2 = document.querySelector(".cart-close")
const totalItem = document.querySelector(".total-item")
const totalItem2 = document.querySelector(".total-item-2");
const cartWrap = document.querySelector(".cart-main-wrap")



function addQuantityDetail(){
    inputDetailQuantity.value++;
}
function deleteQuantityDetail() {
    if(inputDetailQuantity.value > 0){
        inputDetailQuantity.value--;
    }
}

let totalPrice = document.querySelectorAll(".total-price");

let output = ``;
let money = 0;
function renderProduct(){
    localStorage.setItem('totalSP', value)
    let totalsp = JSON.parse(localStorage.getItem('totalSP'))
    let cartObject = JSON.parse(localStorage.getItem("product")) || {};
    let output = ''
    let money = 0;
    for(key in cartObject){
        output += `
        <div class="row main-cart align-items-center border-top">
            <div class="col-2"><img class="img-fluid" src="${cartObject[key].img}"></div>
            <div class="col-3">
                <div class="row item-cart-title">${cartObject[key].title}</div>
                <div class="row item-cart-category">${cartObject[key].category}</div>
            </div>
            <div class="col cart-col">
                <button class="cart-button btn-giam" onclick="deleteQuantity('${cartObject[key].title}')">-</button>
                <input type="text" value="${cartObject[key].quantity}" class="quantity-cart" disabled>
                <button class="cart-button btn-tang" onclick="addQuantity('${cartObject[key].title}')">+</button>
            </div>
            <div class="col cart-col">
                <div class="cart-prices">$ ${cartObject[key].price * cartObject[key].quantity}</div>
                <div class="cart-delete" onclick="deleteCartItem('${cartObject[key].img}','${cartObject[key].title}','${cartObject[key].category}','${cartObject[key].price}',this)">
                    <i class='bx bxs-trash-alt'></i>
                </div>
            </div>
        </div>`;
        money += cartObject[key].price*cartObject[key].quantity;
    }
    const fMoney = Math.floor(money*100);
    console.log(fMoney);
    totalPrice.forEach(item => {
        item.innerHTML = `$ ${fMoney/100}`
    })
    cartWrap.innerHTML = output;
    totalItem.innerHTML = `${value} items`;
    totalItem2.innerHTML = `${value} ITEMS`;
    cartValue.innerHTML = `<input class="cart-shop-value" type="text" value="${totalsp}">`;
}
function addcart(id, img, title, category, price){
    value++;
    
    cartValue.classList.add("has-item");
    let cartObject = JSON.parse(localStorage.getItem("product")) || {};
    
    let totalSP = JSON.parse(localStorage.getItem("totalSP")) || 0;
    if(cartObject[title] == undefined){
        cartObject = {
            ...cartObject,
            [title]: {
                id: id,
                title: title,
                img: img,
                category:category,
                price:price,
                quantity: 1
            }
        }
    } else {
        cartObject[title].quantity ++;
        ;
    }
    localStorage.setItem('product',JSON.stringify(cartObject));
    if(totalSP==0){
        localStorage.setItem("totalSP", value);
    }
    renderProduct()
}

function addcartDetail(id, img, title, category, price){
    value += parseInt(inputDetailQuantity.value);
    console.log(typeof(parseInt(inputDetailQuantity.value)));
    cartValue.classList.add("has-item");
    let cartObject = JSON.parse(localStorage.getItem("product")) || {};
    
    let totalSP = JSON.parse(localStorage.getItem("totalSP")) || 0;
    if(cartObject[title] == undefined){
        cartObject = {
            ...cartObject,
            [title]: {
                id: id,
                title: title,
                img: img,
                category:category,
                price:price,
                quantity: parseInt(inputDetailQuantity.value)
            }
        }
    } else {
        cartObject[title].quantity += parseInt(inputDetailQuantity.value);
        ;
    }
    localStorage.setItem('product',JSON.stringify(cartObject));
    if(totalSP==0){
        localStorage.setItem("totalSP", value);
    }
    renderProduct()
}

function deleteCartItem( img, title, category, price){
    let cartObject = JSON.parse(localStorage.getItem("product"));
    value-=cartObject[title].quantity;
    
    delete cartObject[title]
    localStorage.setItem('product',JSON.stringify(cartObject));
    
    cartValue.classList.add("has-item");
    renderProduct()
}




function addQuantity(title){
    value++
    let cartObject = JSON.parse(localStorage.getItem("product"));
    
    cartObject[title].quantity++;
    localStorage.setItem('product',JSON.stringify(cartObject));
    
    renderProduct()
}
function deleteQuantity(title){
    
    let cartObject = JSON.parse(localStorage.getItem("product"));
    
    if(cartObject[title].quantity>0){
        value--;
        cartObject[title].quantity--;
    } else {
        cartObject[title].quantity = 0;
    }
    localStorage.setItem('product',JSON.stringify(cartObject));
    
    renderProduct()
}


cartShop.onclick = () => {
    shop.classList.remove('display-none')
    overlayCart.classList.remove("display-none");
}
back.onclick = () => {
    shop.classList.add('display-none')
    overlayCart.classList.add("display-none");
}
back2.onclick = () => {
    shop.classList.add("display-none");
    overlayCart.classList.add("display-none");
};

renderProduct()