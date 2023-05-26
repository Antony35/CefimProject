import { items } from "../data/items.js";

// Create li element with all data and class of the items

const listItem = document.querySelector(".list-items");

items.forEach((item) => {
  listItem.insertAdjacentHTML(
    "beforeend",
    `<li class="item reveal">
    <p class="item__price">${item.price} €</p>
    <img src="${item.img}">
    <p class="item__name">${item.name}</p>
    <div class="item__button">
      <img id='btn-less' src="../src/assets/remove.png" alt="bouton moins">
      <p id='quantity'>0</p>
      <img id='btn-add' src="../src/assets/add.png" alt="bouton plus">
      <img class='euro' src="../src/assets/euro.png" alt="euro">
      <span class="item__total">0</span>
      <img id='item-bin' src="../src/assets/delete-black.png" alt="bouton supprimer">
    </div>
    <div class="item__stack"></div>
    <p class="item__description">${item.description}</p>
  </li>`
  );
});

//Big ration

const stack5 = "<img src='../src/assets/coin.png' alt='stack'>";
const stack1 = "<img src='../src/assets/coin1.png' alt='stack'>";

const addBigRation = (event) => {
  let quantities = Number.parseInt(
    event.currentTarget.previousElementSibling.innerHTML
  );
  const targetIsStack = event.currentTarget.parentNode.nextElementSibling;

  if (quantities === 5) {
    targetIsStack.innerHTML = "";
    targetIsStack.insertAdjacentHTML("beforeend", `${stack5}`);
  } else if (quantities === 10) {
    targetIsStack.innerHTML = `${stack5}`;
    targetIsStack.insertAdjacentHTML("beforeend", `${stack5}`);
  } else if (quantities === 15) {
    targetIsStack.innerHTML = `${stack5}${stack5}`;
    targetIsStack.insertAdjacentHTML("beforeend", `${stack5}`);
  } else {
    targetIsStack.insertAdjacentHTML("beforeend", `${stack1}`);
  }
};

const removeBigRation = (event) => {
  let quantities = Number.parseInt(
    event.currentTarget.nextElementSibling.innerHTML
  );
  const targetIsStack = event.currentTarget.parentNode.nextElementSibling;

  if (quantities === 4 || quantities === 9 || quantities === 14) {
    targetIsStack.lastElementChild.remove();
    targetIsStack.insertAdjacentHTML(
      "beforeend",
      `${stack1}${stack1}${stack1}${stack1}`
    );
  } else {
    targetIsStack.lastElementChild.remove();
  }
};

const emptyItemBigRation = (event) => {
  event.currentTarget.parentNode.nextElementSibling.innerHTML = "";
};

const stacks = document.querySelectorAll(".item__stack");

const emptyAllBigRation = () => {
  stacks.forEach((stack) => {
    stack.innerHTML = "";
  });
};

/* ------------------------------------------------ */

//Empty Item

const itemsBins = document.querySelectorAll("#item-bin");

const emptyItem = (event) => {
  event.currentTarget.previousElementSibling.innerHTML = 0;
  event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = 0;
  updateCart();
};

itemsBins.forEach((itemBim) => {
  itemBim.addEventListener("click", (event) => {
    emptyItem(event);
    emptyItemBigRation(event);
    limitCart();
    colorPrice();
  });
});

/* ------------------------------------------------ */

//Update Price for each Item

//add
const updateItemPriceUp = (event) => {
  const itemPrice =
    Number.parseInt(event.currentTarget.previousElementSibling.innerHTML, 10) *
    (Number.parseFloat(
      event.currentTarget.parentNode.parentNode.firstElementChild.innerHTML,
      10
    ) *
      100);
  event.currentTarget.nextElementSibling.nextElementSibling.innerHTML =
    itemPrice / 100;
};

//remove

const updateItemPriceDown = (event) => {
  const itemPrice =
    Number.parseInt(event.currentTarget.nextElementSibling.innerHTML, 10) *
    (Number.parseFloat(
      event.currentTarget.parentNode.parentNode.firstElementChild.innerHTML,
      10
    ) *
      100);
  event.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML =
    itemPrice / 100;
};

/* ------------------------------------------------ */

// Update Cart

const cart = document.querySelector("#cart");
const infosQuantities = document.querySelectorAll("#quantity");

const updateCart = () => {
  const totalPrices = [];
  infosQuantities.forEach((quantity) => {
    totalPrices.push(
      Number.parseFloat(
        quantity.parentNode.parentNode.firstElementChild.innerHTML,
        10
      ) *
        100 *
        Number.parseFloat(quantity.innerHTML, 10)
    );
  });
  const totalPrice = totalPrices.reduce((acc, price) => acc + price, 0);
  cart.innerHTML = `${totalPrice / 100} €`;
};

/* ------------------------------------------------ */

//Color Price

const colorPrice = () => {
  const total = Number.parseInt(cart.innerHTML);
  if (total >= 0 && total < 1000) {
    cart.style.backgroundColor = "green";
  } else if (total > 1000 && total < 2000) {
    cart.style.backgroundColor = "orange";
  } else {
    cart.style.backgroundColor = "red";
  }
};

/* ------------------------------------------------ */

// Empty cart

const mainBin = document.querySelector("#main-bin");
const itemsPrices = document.querySelectorAll(".item__total")

const emptyCart = () => {
  infosQuantities.forEach((quantity) => {
    quantity.innerHTML = 0;
  });
  cart.innerHTML = "0.00€";
  itemsPrices.forEach(itemPrice => {
    itemPrice.textContent = '0.00 €'
  })
};

mainBin.addEventListener("click", (event) => {
  emptyCart(event);
  emptyAllBigRation();
  limitCart();
  colorPrice();
});

/* ------------------------------------------------ */

// Add Item

const addsBtns = document.querySelectorAll("#btn-add");

const addItem = (event) => {
  let quantity = Number.parseInt(
    event.currentTarget.previousElementSibling.innerHTML,
    10
  );
  quantity++;
  event.currentTarget.previousElementSibling.innerHTML = quantity;
  updateCart();
};

addsBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", (event) => {
    addItem(event);
    updateItemPriceUp(event);
    addBigRation(event);
    colorPrice();
    limitCart();
  });
});

/* ------------------------------------------------ */

// Remove Item

const removesBtns = document.querySelectorAll("#btn-less");

const removeItem = (event) => {
  let quantity = Number.parseInt(
    event.currentTarget.nextElementSibling.innerHTML,
    10
  );
  if (quantity > 0) {
    quantity--;
  }
  event.currentTarget.nextElementSibling.innerHTML = quantity;
  updateCart();
};

removesBtns.forEach((removeBtn) => {
  removeBtn.addEventListener("click", (event) => {
    removeItem(event);
    updateItemPriceDown(event);
    removeBigRation(event);
    colorPrice();
    limitCart();
  });
});

/* ------------------------------------------------ */

// Limit cart

const limitCart = () => {
  const totalQuantities = [];

  infosQuantities.forEach((quantity) => {
    totalQuantities.push(Number.parseInt(quantity.innerHTML));
  });
  const totalQuantity = totalQuantities.reduce(
    (acc, quantity) => acc + quantity,
    0
  );
  addsBtns.forEach((addBtn) => {
    if (totalQuantity >= 15) {
      addBtn.style.display = "none";
    } else {
      addBtn.style.display = "block";
    }
  });
};

/* ------------------------------------------------ */

// Intersection Observeur

const ratio = 0.5;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, options);

const targets = document.querySelectorAll(".item");

targets.forEach((target) => {
  observer.observe(target);
});

/* ------------------------------------------------ */

const nav = document.querySelector("nav");

const scrolled = () => {
  const currentScroll = document.body.scrollTop || document.documentElement.scrollTop;
  if (currentScroll >= 200) {
    nav.classList.add('fixed')
  } else {
    nav.classList.remove('fixed')
  }
};

addEventListener("scroll", scrolled, false);
