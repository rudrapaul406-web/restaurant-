/* =========================================
   TPR PIAZZA RESTAURANT
   JAVASCRIPT
========================================= */


/* =========================================
   SELECT ELEMENTS
========================================= */

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");

const navLinks = document.querySelectorAll(".nav-link");

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

const favoriteButtons = document.querySelectorAll(".favorite-btn");
const addButtons = document.querySelectorAll(".add-btn");

const cartOverlay = document.getElementById("cartOverlay");
const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const reservationForm = document.getElementById("reservationForm");
const reservationMessage = document.getElementById("reservationMessage");

const backTop = document.getElementById("backTop");

const yearElement = document.getElementById("year");


/* =========================================
   CURRENT YEAR
========================================= */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


/* =========================================
   CLOSE MOBILE NAV AFTER CLICK
========================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn?.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header?.classList.add("scrolled");
    } else {
        header?.classList.remove("scrolled");
    }

});


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   MENU FILTER SYSTEM
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        menuCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 50);

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.8)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =========================================
   FAVORITE BUTTON
========================================= */

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const icon = button.querySelector("i");

        if (button.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =========================================
   SHOPPING CART
========================================= */

let cart = [];


/* =========================================
   ADD PRODUCT TO CART
========================================= */

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        addToCart(name, price);

        openCart();

    });

});


/* =========================================
   ADD TO CART FUNCTION
========================================= */

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div>
                    <i class="fa-solid fa-basket-shopping"
                       style="font-size:45px;margin-bottom:15px;">
                    </i>

                    <p>Your cart is empty.</p>
                    <small>Add something delicious!</small>
                </div>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "$0.00";

        return;
    }


    let total = 0;
    let totalItems = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        totalItems += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>

                <p>
                    $${item.price.toFixed(2)}
                    × ${item.quantity}
                </p>
            </div>

            <button
                class="remove-item"
                data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent = `$${total.toFixed(2)}`;


    /* ---------- REMOVE CART ITEM ---------- */

    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            removeFromCart(index);

        });

    });

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCartPanel() {

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


cartBtn?.addEventListener("click", openCart);

closeCart?.addEventListener("click", closeCartPanel);


/* =========================================
   CLOSE CART BY CLICKING OVERLAY
========================================= */

cartOverlay?.addEventListener("click", event => {

    if (event.target === cartOverlay) {
        closeCartPanel();
    }

});


/* =========================================
   ESC KEY CLOSE CART
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCartPanel();

        navbar?.classList.remove("active");

    }

});


/* =========================================
   CHECKOUT BUTTON
========================================= */

checkoutBtn?.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for your order! 🍕\n\n" +
        "This is a demo checkout system."
    );

});


/* =========================================
   RESERVATION FORM
========================================= */

reservationForm?.addEventListener("submit", event => {

    event.preventDefault();


    const name = document.getElementById("bookingName")?.value.trim();
    const phone = document.getElementById("bookingPhone")?.value.trim();
    const date = document.getElementById("bookingDate")?.value;
    const time = document.getElementById("bookingTime")?.value;
    const guests = document.getElementById("guestCount")?.value;


    if (!name || !phone || !date || !time || !guests) {

        reservationMessage.className = "reservation-message success";

        reservationMessage.textContent =
            "Please complete all required fields.";

        return;
    }


    reservationMessage.className =
        "reservation-message success";

    reservationMessage.textContent =
        `Thank you ${name}! Your table request for ${guests} guest(s) on ${date} at ${time} has been received.`;


    reservationForm.reset();

});


/* =========================================
   SET MINIMUM RESERVATION DATE
========================================= */

const bookingDate = document.getElementById("bookingDate");

if (bookingDate) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    bookingDate.min = `${year}-${month}-${day}`;

}


/* =========================================
   BACK TO TOP BUTTON
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop?.classList.add("show");

    } else {

        backTop?.classList.remove("show");

    }

});


backTop?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   BUTTON RIPPLE EFFECT
========================================= */

document.querySelectorAll(".btn, .add-btn, .filter-btn").forEach(button => {

    button.addEventListener("click", function () {

        this.style.transform = "scale(.96)";

        setTimeout(() => {

            this.style.transform = "";

        }, 120);

    });

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%c🍕 La Piazza Restaurant Website",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Website loaded successfully!"
);


/* =========================================
   INITIAL CART LOAD
========================================= */

updateCart();