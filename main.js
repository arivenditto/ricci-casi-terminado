document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.getElementById('cart-container');
    const cartContent = document.getElementById('cart-content');
    const addProductForm = document.getElementById('add-product-form');
    const checkoutButton = document.getElementById('checkout');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    axios.get('https://api.example.com/products') // URL de ejemplo
        .then(response => {
            console.log('Productos obtenidos:', response.data);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });

    function updateCartContent() {
        if (cart.length === 0) {
            cartContent.textContent = 'Carrito vacío';
            checkoutButton.style.display = 'none';
        } else {
            cartContent.innerHTML = cart.map((product, index) => `
                <div class="cart-item">
                    <span>${product.size} - ${product.frame} - ${product.laminate}</span>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `).join('');
            checkoutButton.style.display = 'block';
        }
    }

    updateCartContent();
    
    cartIcon.addEventListener('click', function() {
        cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    });

    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const size = document.getElementById('size').value;
        const frame = document.getElementById('frame').value;
        const laminate = document.getElementById('laminate').value;

        if (size && frame && laminate) {
            cart.push({ size, frame, laminate });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartContent();
        }
    });

    checkoutButton.addEventListener('click', function() {
        const whatsappMessage = cart.map(product => `${product.size} - ${product.frame} - ${product.laminate}`).join('\n');
        window.open(`https://api.whatsapp.com/send?phone=XXXXXXXXXXX&text=${encodeURIComponent(whatsappMessage)}`);
    });

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartContent();
    };
    });
