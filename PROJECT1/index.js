const data= [
    {
        id : 0,
        img : '/images/redmiK20.jpg',
        name : 'Redmi K20',
        price : 190,
        save : 25,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 1,
        img : '/images/samGalaxynote20.jpg',
        name : 'Samsung Galaxy Note 20',
        price : 300,
        save : 50,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 2,
        img : '/images/oppofindX2.jpg',
        name : 'OPPO Find X2',
        price : 240,
        save : 30,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 3,
        img : '/images/realmeX20pro.jpg',
        name : 'Realme X50 Pro',
        price : 285,
        save : 35,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 4,
        img : '/images/redminote8.jpg',
        name : 'Redmi Note 8',
        price : 200,
        save : 15,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 5,
        img : '/images/redminote9.jpg',
        name : 'Redmi Note 9',
        price : 220,
        save : 25,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 6,
        img : '/images/redmi8.jpg',
        name : 'Redmi 8A Dual',
        price : 160,
        save : 20,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 7,
        img : '/images/redmi9.jpg',
        name : 'Redmi 9',
        price : 100,
        save : 10,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
];

let cartList=[]; 

let i;
let detail =document.getElementsByClassName('card-item');
let detailsImg = document.getElementById('details-img')
let detailTitle = document.getElementById('detail-title')
let detailPrice = document.getElementById('detail-price')
let youSave = document.getElementById('you-save');
let detailsPage = document.getElementById('details-page');
let back = document.getElementById('buy')
back.addEventListener('click',refreshPage)
let addToCarts = document.querySelectorAll('#add-to-cart')
let cart = document.getElementById('cart');


cart.addEventListener('click',displayCart)

let carts = document.getElementById('carts');


carts.addEventListener('click',()=>addToCart (getId))

let home = document.getElementById('logo');


home.addEventListener('click',hideCart);


document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        let itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
}

let getId;

addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Price : $ ' +data[getId].price;
    youSave.innerHTML= 'You save : ($ ' + data[getId].save + ')';
}


function addToCart(id) {
    if(!data[id].detailTitle){
        cartList= [...cartList,data[id]];
        addItem()
        
        alert('item added to your cart')

    }
    else{
        alert('your item is already there')
    }
    data[id].itemInCart= false
}

function refreshPage(){
    detailsPage.style.display = 'none'
}

function hideCart(){
    document.getElementById('main').style.display= "block";
    document.getElementById('cart-container').style.display= "none";
}


function displayCart(){
    document.getElementById('main').style.display= "none";
    document.getElementById('details-page').style.display= "none";
    document.getElementById('cart-container').style.display= "block";
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
    else{
        document.getElementById('empty-cart').style.display= "none";
        document.getElementById('cart-with-items').style.display= "block";
        
    }
}

let totalAmount;
let totalItems;
let totalSaving;


function addItem(){
    totalAmount=0;
    totalItems = 0;
    totalSaving=0
    let clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            let cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price;
            totalSaving = totalSaving + cart.save;
            totalItems = totalItems + 1;

            let tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            let listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            let listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            let listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            let listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            let listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
            
        })
        document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
        document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
        document.getElementById('total').style.display= "block";
}



function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}