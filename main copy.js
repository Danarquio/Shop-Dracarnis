let productos = [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

// Declaracion de variables
const contenedorProductos = document.querySelector("#cuadroventa");




// Función para añadir los productos al html
function cargarProductos() {
  productos.forEach(producto => {

    const div = document.createElement("div")
    div.classList.add("elementodecompra")
    div.innerHTML = `
    <img id="imagen" class="imagencompra" src=" ${producto.imagen} " alt="${producto.nombre}">
    <h2 id="nombre" class="nombreproducto"> ${producto.nombre} </h2>
    <h3 id="precio" class="precioproducto">$${producto.precio} </h3>
    <div id="cantidad" class="cantidad">
        <input class="cantidad__input" type="number" value="100" min="100" max="${producto.stock}" step="100">
    </div>
    <button id="botonagregar" class="botoncompra">AGREGAR AL CARRO</button>
    <h3 id="totalproducto" class="totalproducto">0$</h3>
    <button class="eliminar" id=""><i class="bi bi-trash-fill"></i></button>
        `;

        const botonAgregar = div.querySelector(".botoncompra");
        const totalProducto = div.querySelector(".totalproducto");
        const precioProducto = producto.precio;
    
        
        botonAgregar.addEventListener("click", () => {
          const inputCantidad = div.querySelector(".cantidad__input");
          const cantidad = parseInt(inputCantidad.value);
          const total = calcularTotalProducto(precioProducto, cantidad);
    
          totalProducto.textContent = `${total}$`;
        });

    contenedorProductos.insertAdjacentElement("afterbegin", div); // Insertar al principio del contenedor
  }) ;
}

// Mostrar los productos en el HTML
cargarProductos();


function calcularTotalProducto(precio, cantidad) {
  return precio * (cantidad / 100);
}

