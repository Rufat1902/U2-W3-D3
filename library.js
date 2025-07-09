const endpoint = "https://striveschool-api.herokuapp.com/books";
const cartList = document.getElementById("cartList");
function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(book) {
  const cart = getCart();
  cart.push(book);
  saveCart(cart);
  renderCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<li class="list-group-item">Your cart is empty</li>`;
    return;
  }

  cart.forEach((book, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
          <span>${book.title} - €${book.price}</span>
          <button class="btn btn-sm btn-outline-danger">Remove</button>
        `;
    li.querySelector("button").addEventListener("click", () =>
      removeFromCart(index)
    );
    cartList.appendChild(li);
  });
}

fetch(endpoint)
  .then((res) => res.json())
  .then((books) => {
    const container = document.getElementById("booksContainer");

    books.forEach((book) => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = `
            <div class="card h-100 shadow-sm">
              <img src="${book.img}" class="card-img-top" alt="Book cover">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text text-success fw-bold">💵 ${book.price} €</p>
                <div class="mt-auto d-flex justify-content-between gap-2">
                  <button class="btn btn-danger btn-sm discard-btn">Scarta</button>
                  <button class="btn btn-primary btn-sm buy-btn">Compra ora</button>
                </div>
              </div>
            </div>
          `;
      col
        .querySelector(".discard-btn")
        .addEventListener("click", () => col.remove());
      col
        .querySelector(".buy-btn")
        .addEventListener("click", () => addToCart(book));

      container.appendChild(col);
    });
  })
  .catch((err) => console.error("Error:", err));
renderCart();
