const shopBox = document.querySelector(".shop-page__container");
let localArr = [];
let count;
let totalPrice = document.querySelector(".total");
let countPrice = 0;
let priceArr = []
let buyNow = document.querySelector(".buyNow")


localArr = JSON.parse(localStorage.getItem("product")) || [];

function renderCor() {
    let i = 0;
    if (localArr.length === 0) {
        shopBox.innerHTML = "Product si not fefined in local storage"
    }
    shopBox.innerHTML = localArr.map(el => {
        priceArr[i] = `
       <div class="cor">
           <div class="cor-exit" id="${el.id}"></div>
           <img class="cor-img" src="${el.image}" alt="img">
           <h3 class="cor-title">${el.title.length < 40 ? el.title : el.title.slice(0,40) + "..."}</h3>
           <p class="total-price">${(el.price*0.76).toFixed(2)}$</p>
           <div class="cor-block">
             <button class="remove" id="${el.id}">-</button>
             <p class="count-p" id="${el.id}">1</p>
             <button class="add" id="${el.id}">+</button>
           </div>
           <p class="cor-price">${(el.price*0.76).toFixed(2)}$</p>
       </div>
 `
        return priceArr[i++]
    }).join("");
}

renderCor();



function x() {
    countPrice = 0;
    let elementPrice = document.querySelectorAll(".total-price");
    elementPrice.forEach(el => {
        let a = el.textContent.split("");
        let b = a.splice(0, a.length - 1).join("");
        countPrice = Number(countPrice)
        countPrice += Number(b);
    });
    totalPrice.innerHTML = Number(countPrice).toFixed(2)
}

x()

shopBox.addEventListener("click", (e) => {
    if (e.target.className == "add") {

        count = Number(e.target.previousElementSibling.innerHTML);
        count++;
        e.target.previousElementSibling.innerHTML = count;

        let innerEL = e.target.parentElement.nextElementSibling.innerHTML.split("");
        let secArr = innerEL.splice(0, innerEL.length - 1).join("");

        e.target.parentElement.previousElementSibling.innerHTML = (count * Number(secArr)).toFixed(2) + "$";

        x()
    } else if (e.target.className == "remove" && count > 1) {

        count = Number(e.target.nextElementSibling.innerHTML);
        count--;
        e.target.nextElementSibling.innerHTML = count;

        let innerEL = e.target.parentElement.nextElementSibling.innerHTML.split("");
        let secArr = innerEL.splice(0, innerEL.length - 1).join("");

        e.target.parentElement.previousElementSibling.innerHTML = (count * Number(secArr)).toFixed(2) + "$";
        x()
    } else if (e.target.className == "cor-exit") {
        // let num = localArr.findIndex(el => e.target.id == el.id)
        // console.log(num);
        // // let arr2 = localArr.slice(num, 1);
        // console.log(localArr.splice(num + 1, 1));
        let arr2 = [];
        for (let i of localArr) {
            if (e.target.id == i.id) {
                continue;
            }
            arr2.push(i)
        }
        localStorage.setItem('product', JSON.stringify(arr2));
        localArr = JSON.parse(localStorage.getItem("product")) || [];
        renderCor();
        x();
    }
});

buyNow.addEventListener("click", () => {
    alert("Xaridingiz uchun rahmat!!");
    localStorage.clear();
    localArr = JSON.parse(localStorage.getItem("product")) || [];
    renderCor();
    x();
})