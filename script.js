async function loadProducts() {
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");

  try {
    const response = await fetch("products.json");
    const products = await response.json();

    function renderProducts(list) {
      productGrid.innerHTML = "";

      list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <div class="price">$${product.price} MXN</div>
          <div class="status">${product.status}</div>
          <p>${product.description}</p>
          <a class="btn btn-primary" target="_blank" href="https://wa.me/525535094588?text=Hola,%20me%20interesa%20este%20producto%20de%20Once23:%20${encodeURIComponent(product.name)}.%20%C2%BFSigue%20disponible?">Pedir por WhatsApp</a>
        `;

        productGrid.appendChild(card);
      });
    }

    renderProducts(products);

    searchInput.addEventListener("input", () => {
      const text = searchInput.value.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text)
      );
      renderProducts(filtered);
    });

  } catch (error) {
    productGrid.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    console.error(error);
  }
}

loadProducts();
