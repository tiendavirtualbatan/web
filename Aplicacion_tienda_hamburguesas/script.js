let burgerslist = document.querySelector('.burgers');
let orders = document.querySelector('.orderdburgers');
let total = document.getElementById('total');
let subtotal = document.getElementById('subtotal');
let taxtotal = document.getElementById('tax');
let itemnumber = document.getElementById('itemnumber');
let burgers = [{
    name: "Chilli Burger",
    image: "https://www.seriouseats.com/thmb/1aPzR35Sc8-SYDpqlRHm0pNBSkk=/610x458/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2013__06__20130611-burger-week-grilled-burger-variations-13-d5217d9167b54ef5be8f3e4a57442813.jpg",
    price: 55
},
{
    name: "Kubie Burger",
    image: "https://cdn.shopify.com/s/files/1/0372/4188/0621/products/KubbieCooked_1024x1024@2x.jpg?v=1598661751",
    price: 68
},
{
    name: "Nut Burger",
    image: "https://tastykitchen.com/recipes/wp-content/uploads/sites/2/2010/03/Nutburger.jpg",
    price: 80
},
{
    name: "Poached Burger",
    image: "https://i.pinimg.com/originals/78/6b/91/786b91854257472eb586c37111fc6591.jpg",
    price: 98
},
{
    name: "Steamed Cheese Burger",
    image: "https://www.framedcooks.com/wp-content/uploads/2021/07/steamed-cheeseburgers.jpg",
    price: 65
},
{
    name: "Theta Burger",
    image: "https://www.tworows.com/wp-content/uploads/2018/03/theta-burger-restaurants-allen-tx.jpg",
    price: 92
},
{
    name: "Pimento Cheese Burger",
    image: "https://www.belbrandsfoodservice.com/wp-content/uploads/2018/05/recipe-desktop-merkts-pimento-cheese-burger-1100x570.jpg",
    price: 90
},
{
    name: "Green Chile Burger",
    image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-210405-green-chili-cheeseburger-07-landscape-jg-1622216275.jpg?crop=0.634xw:0.632xh;0.164xw,0.211xh&resize=640:*",
    price: 78
}
]
burgers.forEach((element, index) => {
    let newelement = ``;
    newelement = `
                <div class="burger">
                    <div class="image"><img
                            src="${element.image}"
                            alt="">
                    </div>
                    <div class="title">${element.name}</div>
                    <div class="bottom">
                        <div class="price">$${element.price}</div>
                        <div class="cart"><i class="fa-solid fa-cart-plus" id="${index}" onclick="ordernow(this.id)"></i></div>
                    </div>
                </div>
    `
    burgerslist.innerHTML += newelement;
})
let orderedburger = [];
function ordernow(index) {
    orderedburger.push(burgers[index]);
    orders.innerHTML = "";
    orderedburger.forEach((element, index) => {
        let neworder = ``;
        neworder = `
        <div class="burger">
        <div class="icon"><img
                src="${orderedburger[index].image}"
                alt=""></div>
        <div class="title">
            <h1>${orderedburger[index].name}</h1>
            <p>$${orderedburger[index].price}</p>
        </div>
        <div class="delete"><i class="fa-regular fa-circle-xmark" id="${index}" onclick="removeitem(this.id)"></i></div>
    </div>
                    `
    orders.innerHTML+=neworder;
    })
    cashcalc();
}
function removeitem(index){
    orderedburger.splice(index,1);
    orders.innerHTML = "";
    orderedburger.forEach((element, index) => {
        let neworder = ``;
        neworder = `
        <div class="burger">
        <div class="icon"><img
                src="${orderedburger[index].image}"
                alt=""></div>
        <div class="title">
            <h1>${orderedburger[index].name}</h1>
            <p>$${orderedburger[index].price}</p>
        </div>
        <div class="delete"><i class="fa-regular fa-circle-xmark" id="${index}" onclick="removeitem(this.id)"></i></div>
    </div>
                    `
    orders.innerHTML+=neworder;
    })
    cashcalc();
}
function cashcalc(){
    let totalcash =0;
    orderedburger.forEach(element=>{
        totalcash = totalcash + element.price;
    });
    subtotal.innerHTML = `$`+totalcash;
    taxtotal.innerHTML = `$`+(totalcash*10/100);
    total.innerHTML =`$` + (totalcash+(totalcash*10/100));
    itemnumber.innerHTML = orderedburger.length;
}
