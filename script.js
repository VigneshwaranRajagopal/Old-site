// Language Toggle
const langBtn = document.getElementById("lang-btn");
const currentLang = localStorage.getItem("lang") || "en";
document.documentElement.lang = currentLang;
updateLanguage(currentLang);

langBtn.addEventListener("click", () => {
  const newLang = currentLang === "en" ? "ta" : "en";
  updateLanguage(newLang);
  localStorage.setItem("lang", newLang);
});

function updateLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  langBtn.textContent = lang === "en" ? "🇮🇳 தமிழ்" : "🇬🇧 English";
  document.documentElement.lang = lang;
}

// Mobile Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("active");
});

// Hero Slider
let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".nav-dot");

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  slideIndex = slideIndex >= slides.length ? 1 : slideIndex + 1;
  setTimeout(() => showSlides(slideIndex), 5000);
}

// Products
const products = [
  {
    id: 1,
    name: { en: "Seeraga Samba", ta: "சீரக சம்பா" },
    price: "₹68/kg",
    category: "rice",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: { en: "Ponni Rice", ta: "பொன்னி அரிசி" },
    price: "₹58/kg",
    category: "rice",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: { en: "Country Eggs", ta: "நாட்டு முட்டை" },
    price: "₹11/dozen",
    category: "eggs",
    img: "https://images.unsplash.com/photo-1603048297194-9bef1f845cf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: { en: "White Eggs", ta: "வெள்ளை முட்டை" },
    price: "₹8/dozen",
    category: "eggs",
    img: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: { en: "Kuruvai Rice", ta: "குறுவை அரிசி" },
    price: "₹72/kg",
    category: "rice",
    img: "https://images.unsplash.com/photo-1511699656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

function renderProducts(productsToShow = products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.img}" alt="${product.name.en}">
            <div class="product-info">
                <h3>${product.name[currentLang]}</h3>
                <div class="price">${product.price}</div>
                <a href="https://wa.me/917667424736?text=${encodeURIComponent(
                  `${product.name[currentLang]} - ${product.price}`
                )}" class="btn-order" target="_blank">
                    ${currentLang === "en" ? "Order Now" : "இப்போது ஆர்டர்"}
                </a>
            </div>
        </div>
    `
    )
    .join("");
}

renderProducts();

// Filters
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    e.target.classList.add("active");

    const filter = e.target.dataset.filter;
    let filtered = products;

    if (filter !== "all") {
      filtered = products.filter((p) => p.category === filter);
    }

    renderProducts(filtered);
  });
});

// Search
document.getElementById("search")?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.en.toLowerCase().includes(query) ||
      p.name.ta.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Contact Form
document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  const originalText = btn.textContent;
  btn.textContent = currentLang === "en" ? "Sending..." : "அனுப்புகிறோம்...";
  btn.disabled = true;

  setTimeout(() => {
    alert(
      currentLang === "en"
        ? "Thank you! We will call soon."
        : "நன்றி! விரைவில் போன் செய்கிறோம்."
    );
    e.target.reset();
    btn.textContent = originalText;
    btn.disabled = false;
  }, 1500);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

