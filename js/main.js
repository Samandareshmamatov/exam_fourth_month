const URL_CATEGORY = "https://fakestoreapi.com/products/categories";
const URL_PRODUCTS = "https://fakestoreapi.com/products";
const categories = document.querySelectorAll(".general__link");
const box = document.querySelector(".box");
let shopCart = document.querySelector(".header-top__shop-cart-span");
const learnMore = document.querySelector(".learnMore");
const electronics = document.querySelector(".electronics");
const jewelery = document.querySelector(".jewelery");
const men = document.querySelector(".men");
const women = document.querySelector(".women");
const all = document.querySelector(".all");
const searchInput = document.querySelector(".search-input");
const slick = document.querySelector(".slick");
let copyData = [];

const render = (arr) => {
    learnMore.style.display = "block"
    if (arr.length < 8) learnMore.style.display = "none";
    box.innerHTML = arr.map(el => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr[i] = `<img src='../img/unset-star.svg' alt='img'>`;
            if (Math.round(el.rating.rate) > i) {
                arr[i] = `<img src='../img/star.svg' alt='img'>`;
            }
        }
        return `
      <div class="cart">
        <div class="cart-img-box">
          <img class="cart-img" src="${el.image}" alt="img">
        </div>
        <h3 class="cart-title">${el.title.length < 21 ? el.title : el.title.slice(0,21) + "..."}</h3>
        <p class="rating">${arr.join("")}</p>
        <p class="price">${(el.price*0.76).toFixed(2)}$ <del>${el.price}$</del> <span>24% Off</span></p>
        <div class="cart-box">
          <img class="cart-inner-img" src="../img/hearts.svg" alt="img">
          <img class="cart-inner-img korzinka_btn" id="${el.id}" src="../img/korzinka_2.svg" alt="img">
        </div>
      </div>
    `
    })
}

function getCategory() {
    fetch(URL_CATEGORY).then(res => res.json()).then(data => {
        let count = 0;
        categories.forEach(el => {
            el.style = "text-transform: capitalize"
            el.innerHTML = data[count++];
        })
    })
}

function getProducts() {
    let newArr = [];
    fetch(URL_PRODUCTS).then(res => res.json()).then(data => {
        newArr = data.splice(0, 8);
        copyData = newArr.concat(data);
        render(newArr);
        learnMore.innerHTML = "Load More"
        let count = 0;
        learnMore.addEventListener("click", () => {
            count++;
            if (count % 2 == 1) {
                learnMore.innerHTML = "Exit"
                render(newArr.concat(data))
            } else {
                learnMore.innerHTML = "Load More"
                render(newArr);
            }
        })
    })
}

getCategory();
getProducts();

// slick.innerHTML = render(copyData)
// box.slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
// });

searchInput.addEventListener("keyup", () => {
    learnMore.style.display = "block"
    let newArr = copyData.filter(el => el.title.toLowerCase().includes(searchInput.value.toLowerCase()))
    render(newArr);
    if (newArr.length === 0) {
        box.innerHTML = `<div class="isNotSearch">${searchInput.value} is not defined 😲❗</div>`;
        learnMore.style.display = "none"
    }
})

all.addEventListener("click", () => {
    categories.forEach(el => { el.classList.remove("active-link") })
    all.classList.add("active-link");
    searchInput.value = "";
    getProducts();
});

electronics.addEventListener("click", () => {
    render(copyData.filter(el => el.category == "electronics"))
    categories.forEach(el => { el.classList.remove("active-link") });
    searchInput.value = "";
    all.classList.remove("active-link");
    electronics.classList.add("active-link")
});

jewelery.addEventListener("click", () => {
    render(copyData.filter(el => el.category == "jewelery"))
    categories.forEach(el => { el.classList.remove("active-link") });
    searchInput.value = "";
    all.classList.remove("active-link");
    jewelery.classList.add("active-link")
})

men.addEventListener("click", () => {
    render(copyData.filter(el => el.category == "men's clothing"))
    categories.forEach(el => { el.classList.remove("active-link") });
    searchInput.value = "";
    all.classList.remove("active-link");
    men.classList.add("active-link");
})

women.addEventListener("click", () => {
    render(copyData.filter(el => el.category == "women's clothing"))
    categories.forEach(el => { el.classList.remove("active-link") });
    searchInput.value = "";
    all.classList.remove("active-link");
    women.classList.add("active-link");
});

box.addEventListener("click", (e) => {
    copyData.forEach(item => {
        if (e.target.id == item.id) {
            let arr = JSON.parse(localStorage.getItem("product")) || [];
            if (!arr.find(el => el.id == item.id)) {
                arr.push(item);
                shopCart.innerHTML = arr.length;
            } else {
                alert("Bu oldin qo'shilgan")
            }
            localStorage.setItem('product', JSON.stringify(arr));
        }
    })
})

let arr = JSON.parse(localStorage.getItem("product")) || [];
shopCart.innerHTML = arr.length;