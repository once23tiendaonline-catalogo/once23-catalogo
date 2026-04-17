async function loadProducts() {
  try {
    const response = await fetch("products.json");
    const products = await response.json();

    function crearTarjeta(product) {
      return `
        <div class="product-card">
          <img src="${product.images[0]}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <div class="price">$${product.price} MXN</div>
          <div class="status">${product.status}</div>
          <p>${product.description}</p>
          <a class="btn btn-whatsapp" target="_blank" href="https://wa.me/525535094588?text=Hola,%20me%20interesa%20este%20producto%20de%20Once23:%20${encodeURIComponent(product.name)}.%20%C2%BFSigue%20disponible?">Comprar por WhatsApp</a>
        </div>
      `;
    }

    function renderCategoria(nombreCategoria, gridId) {
      const grid = document.getElementById(gridId);
      if (!grid) return;

      const filtrados = products.filter(
        product => product.category === nombreCategoria
      );

      grid.innerHTML = filtrados.map(crearTarjeta).join("");
    }

    renderCategoria("Nuevo", "nuevoGrid");
    renderCategoria("Dulces y snacks", "dulcesGrid");
    renderCategoria("Hogar", "hogarGrid");
    renderCategoria("Ofertas", "ofertasGrid");

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

loadProducts();
