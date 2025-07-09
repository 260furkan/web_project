const products = [
  {
    id: 1,
    name: "Premium Sneaker",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80",
    category: "Ayakkabı"
  },
  {
    id: 2,
    name: "Oversize T-Shirt",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Giyim"
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Aksesuar"
  },
  {
    id: 4,
    name: "Athletic Hoodie",
    price: 499.90,
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    category: "Giyim"
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 799.50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "Aksesuar"
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 899.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Ayakkabı"
  }
];

let cart = [];

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  
  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">${product.category}</p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text fw-bold mb-0">${product.price.toFixed(2)} ₺</p>
            <button class="btn btn-sm btn-dark btn-add" onclick="addToCart(${product.id})">
              <i class="fas fa-plus me-1"></i> Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  
  // Animasyon efekti
  const btn = document.querySelector(`button[onclick="addToCart(${id})"]`);
  btn.innerHTML = '<i class="fas fa-check me-1"></i> Eklendi';
  btn.classList.remove('btn-dark');
  btn.classList.add('btn-success');
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-plus me-1"></i> Sepete Ekle';
    btn.classList.remove('btn-success');
    btn.classList.add('btn-dark');
  }, 1500);
  
  // Sepeti göster (mobilde)
  if (window.innerWidth < 768) {
    toggleCart();
  }
}

function updateCart() {
  const cartCount = cart.length;
  document.getElementById("cart-count").innerText = cartCount;
  document.getElementById("cart-count-big").innerText = cartCount;
  
  const cartItems = document.getElementById("cart-items");
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  document.getElementById("total-price").innerText = total;
  
  const cartEmpty = document.getElementById("cart-empty");
  
  if (cartCount === 0) {
    cartItems.innerHTML = "";
    cartEmpty.style.display = "flex";
  } else {
    cartEmpty.style.display = "none";
    cartItems.innerHTML = "";
    
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-details">
          <h6 class="cart-item-title">${item.name}</h6>
          <p class="cart-item-price">${item.price.toFixed(2)} ₺</p>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">
            <i class="fas fa-trash me-1"></i> Kaldır
          </button>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const cartSection = document.getElementById("cart-section");
  cartSection.classList.toggle("show");
  
  // Arka planı karartma efekti
  if (cartSection.classList.contains("show")) {
    document.body.style.overflow = "hidden";
    const overlay = document.createElement("div");
    overlay.className = "cart-overlay";
    overlay.onclick = toggleCart;
    document.body.appendChild(overlay);
  } else {
    document.body.style.overflow = "";
    const overlay = document.querySelector(".cart-overlay");
    if (overlay) overlay.remove();
  }
}

document.addEventListener("DOMContentLoaded", displayProducts);