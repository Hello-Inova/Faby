/* =========================================================
   FABY BOUTIQUE — carrinho de compras (localStorage)
   O checkout final é feito via WhatsApp: o site monta a
   mensagem com os itens do carrinho e abre uma conversa com
   a loja para fechar o pedido e combinar pagamento/entrega.
   ========================================================= */

/* >>> IMPORTANTE: troque pelo número de WhatsApp real da loja
   no formato DDI+DDD+numero, apenas dígitos. Ex: 55 11 91234-5678 */
const FABY_WHATSAPP = "5511999999999";
const FABY_CART_KEY = "faby_boutique_cart_v1";

function fabyGetCart() {
  try {
    return JSON.parse(localStorage.getItem(FABY_CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function fabySaveCart(cart) {
  localStorage.setItem(FABY_CART_KEY, JSON.stringify(cart));
  fabyUpdateCartCount();
}

function fabyAddToCart(productId, size, qty) {
  const cart = fabyGetCart();
  qty = qty || 1;
  size = size || "Único";
  const existing = cart.find((i) => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size, qty });
  }
  fabySaveCart(cart);
  fabyShowToast(productId);
}

function fabyRemoveFromCart(productId, size) {
  let cart = fabyGetCart();
  cart = cart.filter((i) => !(i.id === productId && i.size === size));
  fabySaveCart(cart);
  if (typeof fabyRenderCartPage === "function") fabyRenderCartPage();
}

function fabyChangeQty(productId, size, delta) {
  const cart = fabyGetCart();
  const item = cart.find((i) => i.id === productId && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    fabyRemoveFromCart(productId, size);
    return;
  }
  fabySaveCart(cart);
  if (typeof fabyRenderCartPage === "function") fabyRenderCartPage();
}

function fabyCartTotal() {
  const cart = fabyGetCart();
  let total = 0;
  cart.forEach((i) => {
    const p = fabyGetProduct(i.id);
    if (p) total += p.price * i.qty;
  });
  return total;
}

function fabyCartCount() {
  return fabyGetCart().reduce((sum, i) => sum + i.qty, 0);
}

function fabyUpdateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = fabyCartCount();
  });
}

function fabyShowToast(productId) {
  const p = fabyGetProduct(productId);
  const toast = document.getElementById("faby-toast");
  if (!toast || !p) return;
  toast.innerHTML = `🛍️ <strong>${p.name}</strong> adicionado à sacola!`;
  toast.classList.add("show");
  clearTimeout(window._fabyToastTimer);
  window._fabyToastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function fabyBuildWhatsAppMessage(nome) {
  const cart = fabyGetCart();
  if (cart.length === 0) return "";
  let msg = `Olá, Faby Boutique! 💗\nGostaria de fazer o seguinte pedido:\n\n`;
  cart.forEach((i) => {
    const p = fabyGetProduct(i.id);
    if (!p) return;
    msg += `• ${p.name} — Tam ${i.size} — Qtd ${i.qty} — ${fabyFormatBRL(p.price * i.qty)}\n`;
  });
  msg += `\nTotal: ${fabyFormatBRL(fabyCartTotal())}`;
  if (nome) msg += `\n\nMeu nome: ${nome}`;
  return msg;
}

function fabyCheckoutWhatsApp() {
  const nomeInput = document.getElementById("checkout-nome");
  const nome = nomeInput ? nomeInput.value.trim() : "";
  const msg = fabyBuildWhatsAppMessage(nome);
  if (!msg) {
    alert("Sua sacola está vazia. Adicione produtos antes de finalizar o pedido.");
    return;
  }
  const url = `https://wa.me/${FABY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", fabyUpdateCartCount);
