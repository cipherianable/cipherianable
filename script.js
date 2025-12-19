let cart = JSON.parse(localStorage.getItem('kaLeahCart')) || [];
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', updateCartUI);

function filterProducts() {
    const searchInput = document.getElementById('productSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const matchesSearch = name.includes(searchInput);
        const matchesCategory = (activeCategory === 'all' || card.classList.contains(activeCategory));
        card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter');
        filterProducts();
    });
});

function addToCart(itemName, element) {
    const variant = element.parentElement.querySelector('.item-variant').value;
    cart.push({ name: itemName, details: variant });
    localStorage.setItem('kaLeahCart', JSON.stringify(cart));
    updateCartUI();
    const btn = event.target;
    btn.innerText = "✓ Added";
    btn.style.background = "#27ae60";
    setTimeout(() => { btn.innerText = "Add to Cart"; btn.style.background = "#0056b3"; }, 800);
}

function updateCartUI() {
    const count = document.getElementById('cart-count');
    const list = document.getElementById('cart-items-list');
    if(count) count.innerText = cart.length;
    if (list) {
        if (cart.length === 0) { list.innerHTML = '<p>Your cart is empty.</p>'; }
        else {
            list.innerHTML = '';
            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `<span><b>${item.name}</b>: ${item.details}</span><button onclick="removeItem(${index})">&times;</button>`;
                list.appendChild(div);
            });
        }
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('kaLeahCart', JSON.stringify(cart));
    updateCartUI();
}

function toggleChat() {
    const card = document.getElementById('chat-card');
    card.style.display = (card.style.display === 'flex') ? 'none' : 'flex';
}

function sendToMessenger() {
    const fbUsername = "16Leah";
    const type = document.getElementById('msgType')?.value || "Order";
    const notes = document.getElementById('extraNotes')?.value || "";
    let orderList = cart.length > 0 ? "\n\nMy List:\n" + cart.map(i => `• ${i.name} - ${i.details}`).join("\n") : "";
    const message = `Hello Ka Leah! [${type}]\n${notes}${orderList}`;
    window.open(`https://m.me/${fbUsername}?text=${encodeURIComponent(message)}`, '_blank');
}