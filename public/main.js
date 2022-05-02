const app = Vue.createApp({
    data(){
        return{
            brand:'/img/brand.png',
            showcase1:'/img/Meedee_1.jpg',
            showcase2:'/img/Meedee_2.jpg',
            showcase3:'/img/Meedee_3.jpg',
            cart:'/img/cart.png',
        }
    }
})

let carts = document.querySelectorAll('.add-cart');


let products=[
    {
        name:'เสื้อนักศึกษาชาย',
        price:150,
        number:'p1',
        inCart:0
    },
    {
        name:'เสื้อนักศึกษาหญิง',
        price:150,
        number:'p2',
        inCart:0
    },
    {
        name:'เสื้อช็อป',
        price:150,
        number:'p3',
        inCart:0
    },
    {
        name:'เสื้อและกางเกงพละ',
        price:150,
        number:'p4',
        inCart:0
    },
    {
        name:'กางเกงนักศึกษาชาย',
        price:150,
        number:'p5',
        inCart:0
    },
    {
        name:'กระโปรง',
        price:150,
        number:'p6',
        inCart:0
    },
    {
        name:'เน็คไท',
        price:150,
        number:'p7',
        inCart:0
    },
    {
        name:'เข็มขัด',
        price:150,
        number:'p8',
        inCart:0
    },
    {
        name:'กระดุม',
        price:150,
        number:'p9',
        inCart:0
    },
]


for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems!=null){
        if(cartItems[product.name]==undefined){
            cartItems={
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart+=1;
    }else{
        product.inCart=1;
        cartItems={
            [product.name]: product
        }   
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item=>{
            productContainer.innerHTML+=`
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./img/${item.number}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
               ${item.inCart*item.price} Bath
            </div>
            `
        });
        productContainer.innerHTML+=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    ${cartCost} Bath
                </h4>
        `
    }
}

function clearcart(){
    localStorage.clear();
    location.reload();
}

function confirm(){
    if(localStorage.getItem('productsInCart')!==null){
        localStorage.clear();
        location.reload();
        alert("Payment Complete");
    }else{
        alert("Please Chose Product to Buy first");
    }
}
onLoadCartNumbers();
displayCart();