/* =========================================================
   FABY BOUTIQUE — comportamento geral do site
   ========================================================= */

function fabyToggleMenu() {
  document.querySelector(".nav-links")?.classList.toggle("open");
}

function fabyProductCardHTML(p) {
  const oldPrice = p.oldPrice ? `<span class="price-old">${fabyFormatBRL(p.oldPrice)}</span>` : "";
  const tag = p.tag ? `<span class="card-tag">${p.tag}</span>` : "";
  return `
    <article class="card" data-category="${p.category}">
      <div class="card-media">
        ${tag}
        <a href="produto.html?id=${p.id}">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </a>
        <button class="card-quick" title="Adicionar rápido" onclick="fabyAddToCart('${p.id}','M',1)">＋</button>
      </div>
      <div class="card-body">
        <span class="card-cat">${p.category === "vestidos" ? "Vestidos" : "Conjuntos"}</span>
        <h3 class="card-title"><a href="produto.html?id=${p.id}">${p.name}</a></h3>
        <div class="card-price">
          <span class="price-now">${fabyFormatBRL(p.price)}</span>
          ${oldPrice}
        </div>
        <button class="card-add" onclick="location.href='produto.html?id=${p.id}'">Ver produto</button>
      </div>
    </article>`;
}

function fabyRenderGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (products.length === 0) {
    el.innerHTML = `<div class="empty-msg">Nenhum produto encontrado nesta categoria — em breve novidades por aqui! 💗</div>`;
    return;
  }
  el.innerHTML = products.map(fabyProductCardHTML).join("");
}

// ---------- página de listagem (produtos.html) ----------
function fabyInitProductsPage() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get("categoria") || "todos";

  function apply() {
    let list = FABY_PRODUCTS.slice();
    if (activeCat !== "todos") list = list.filter((p) => p.category === activeCat);

    const sortEl = document.getElementById("sort-select");
    const sortVal = sortEl ? sortEl.value : "relevancia";
    if (sortVal === "menor-preco") list.sort((a, b) => a.price - b.price);
    if (sortVal === "maior-preco") list.sort((a, b) => b.price - a.price);
    if (sortVal === "nome") list.sort((a, b) => a.name.localeCompare(b.name));

    fabyRenderGrid("product-grid", list);

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.cat === activeCat);
    });

    const countEl = document.getElementById("result-count");
    if (countEl) countEl.textContent = `${list.length} peça${list.length === 1 ? "" : "s"}`;
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCat = btn.dataset.cat;
      const url = new URL(window.location);
      if (activeCat === "todos") url.searchParams.delete("categoria");
      else url.searchParams.set("categoria", activeCat);
      history.replaceState(null, "", url);
      apply();
    });
  });

  const sortEl = document.getElementById("sort-select");
  if (sortEl) sortEl.addEventListener("change", apply);

  apply();
}

// ---------- página de produto (produto.html) ----------
function fabyInitProductPage() {
  const wrap = document.getElementById("product-detail");
  if (!wrap) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = fabyGetProduct(id);

  if (!p) {
    wrap.innerHTML = `<div class="empty-msg">Produto não encontrado. <a href="produtos.html">Voltar para a loja</a>.</div>`;
    return;
  }

  document.title = `${p.name} · Faby Boutique`;

  let selectedSize = p.sizes[0];
  let qty = 1;

  const oldPrice = p.oldPrice ? `<span class="price-old">${fabyFormatBRL(p.oldPrice)}</span>` : "";
  const detailsList = p.details.map((d) => `<li>• ${d}</li>`).join("");

  wrap.innerHTML = `
    <div class="pd-gallery">
      <img id="pd-main-img" src="${p.img}" alt="${p.name}">
    </div>
    <div class="pd-info">
      <span class="eyebrow">${p.category === "vestidos" ? "Vestidos" : "Conjuntos"}</span>
      <h1>${p.name}</h1>
      <div class="pd-price">
        <span class="price-now">${fabyFormatBRL(p.price)}</span>
        ${oldPrice}
      </div>
      <p class="pd-desc">${p.description}</p>

      <div class="pd-option">
        <label>Tamanho</label>
        <div class="size-row" id="size-row">
          ${p.sizes.map((s, i) => `<button class="size-btn ${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>

      <div class="qty-row">
        <label style="font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;font-weight:600;">Quantidade</label>
        <div class="qty-control">
          <button id="qty-minus">−</button>
          <span id="qty-val">1</span>
          <button id="qty-plus">+</button>
        </div>
      </div>

      <div class="pd-actions">
        <button class="btn btn-primary" id="add-to-cart-btn">Adicionar à sacola</button>
        <button class="btn btn-whats" id="buy-whatsapp-btn">Comprar pelo WhatsApp</button>
      </div>

      <ul class="pd-meta">
        ${detailsList}
        <div>🚚 Consulte prazos e frete pelo WhatsApp</div>
        <div>↩️ Troca em até 7 dias corridos, mediante contato prévio</div>
      </ul>
    </div>`;

  document.querySelectorAll("#size-row .size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#size-row .size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
    });
  });

  document.getElementById("qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    document.getElementById("qty-val").textContent = qty;
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qty = qty + 1;
    document.getElementById("qty-val").textContent = qty;
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    fabyAddToCart(p.id, selectedSize, qty);
  });

  document.getElementById("buy-whatsapp-btn").addEventListener("click", () => {
    fabyAddToCart(p.id, selectedSize, qty);
    setTimeout(fabyCheckoutWhatsApp, 300);
  });

  // relacionados: mesma categoria, exceto o próprio
  const related = FABY_PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  fabyRenderGrid("related-grid", related);
}

// ---------- página do carrinho (carrinho.html) ----------
function fabyRenderCartPage() {
  const wrap = document.getElementById("cart-items");
  if (!wrap) return;
  const cart = fabyGetCart();
  const emptyEl = document.getElementById("cart-empty");
  const layoutEl = document.getElementById("cart-layout");

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = "block";
    if (layoutEl) layoutEl.style.display = "none";
    return;
  }
  if (emptyEl) emptyEl.style.display = "none";
  if (layoutEl) layoutEl.style.display = "grid";

  wrap.innerHTML = cart
    .map((item) => {
      const p = fabyGetProduct(item.id);
      if (!p) return "";
      return `
        <div class="cart-item">
          <a href="produto.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"></a>
          <div>
            <h4>${p.name}</h4>
            <div class="meta">Tamanho: ${item.size}</div>
            <div class="cart-qty">
              <button onclick="fabyChangeQty('${p.id}','${item.size}',-1)">−</button>
              <span>${item.qty}</span>
              <button onclick="fabyChangeQty('${p.id}','${item.size}',1)">+</button>
            </div>
            <button class="remove-btn" onclick="fabyRemoveFromCart('${p.id}','${item.size}')">Remover</button>
          </div>
          <div class="line-price">${fabyFormatBRL(p.price * item.qty)}</div>
        </div>`;
    })
    .join("");

  const total = fabyCartTotal();
  const totalEl = document.getElementById("cart-total");
  const subtotalEl = document.getElementById("cart-subtotal");
  if (totalEl) totalEl.textContent = fabyFormatBRL(total);
  if (subtotalEl) subtotalEl.textContent = fabyFormatBRL(total);
}

// ---------- formulário de contato (contato.html) ----------
function fabyInitContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("c-nome").value.trim();
    const msgTxt = document.getElementById("c-mensagem").value.trim();
    const msg = `Olá, Faby Boutique! Meu nome é ${nome}.\n\n${msgTxt}`;
    window.open(`https://wa.me/${FABY_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

// ---------- newsletter (rodapé) ----------
function fabyInitNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const toast = document.getElementById("faby-toast");
    if (toast) {
      toast.innerHTML = `💌 Obrigada por assinar! Em breve você recebe nossas novidades.`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2600);
    }
    form.reset();
  });
}

// ---------- marca link ativo no menu ----------
function fabyMarkActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    if (a.dataset.page === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fabyMarkActiveNav();
  fabyInitProductsPage();
  fabyInitProductPage();
  fabyRenderCartPage();
  fabyInitContactForm();
  fabyInitNewsletter();

  const burger = document.querySelector(".burger");
  if (burger) burger.addEventListener("click", fabyToggleMenu);

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => document.querySelector(".nav-links")?.classList.remove("open"));
  });
});
