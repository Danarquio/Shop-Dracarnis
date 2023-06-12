// CARRITO DE COMPRA v3.0 by @Danarquio

let productos = [];

fetch("./productos.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then(data => {
    productos = data;
    cargarProductos(productos);
    actualizarPrecioTotal(); 
    restaurarCarrito(); 
  })
  .catch(error => {
    console.error(error);
    Swal.fire({
      title: 'NO TENEMOS PRODUCTOS',
      text: 'Lamentamos las molestias, en este momento no contamos con productos disponibles',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  });





// Declaracion de variables
const contenedorProductos = document.querySelector("#cuadroventa");
const precioTotalElement = document.querySelector("#totalprecio");
const botonCarrito = document.querySelector("#botoncarrito");


// Función para añadir los productos al html
function cargarProductos() {
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("elementodecompra");



    // Plantilla de producto para el html
    div.innerHTML = ` 
      <img class="imagencompra" src="${producto.imagen}" alt="${producto.nombre}">
      <h2 class="nombreproducto">${producto.nombre}</h2>
      <h3 class="precioproducto">$${producto.precio}</h3>
      <div class="cantidad">
        <input id="cantidad-${producto.nombre}" class="cantidad__input" type="number" value="100" min="${producto.minimo}" max="${producto.stock}" step="${producto.minimo}">
        <h4>gramos<h4>
      </div>
      <button class="botoncompra">AGREGAR AL CARRO</button>
      <h3 class="totalproducto">0$</h3>
      <button class="eliminar"><i class="bi bi-trash-fill"></i></button>
    `;



    const botonAgregar = div.querySelector(".botoncompra");
    const totalProducto = div.querySelector(".totalproducto");
    const precioProducto = producto.precio;
    const botonEliminar = div.querySelector(".eliminar");


    botonAgregar.addEventListener("click", () => {
      const inputCantidad = div.querySelector(".cantidad__input");
      const cantidad = parseInt(inputCantidad.value);
      const total = calcularTotalProducto(precioProducto, cantidad);

      totalProducto.textContent = `${total}$`;
      actualizarPrecioTotal(); // Actualizar el precio total al agregar un producto
      guardarCarrito(); // Guardar los datos del carrito en el localStorage
    });

    botonEliminar.addEventListener("click", () => {
      const inputCantidad = div.querySelector(".cantidad__input");
      inputCantidad.value = "0"; // Reiniciar el valor del contador a 0
      const total = calcularTotalProducto(precioProducto, 0);
      totalProducto.textContent = `${total}$`;
      actualizarPrecioTotal(); // Actualizar el precio total al eliminar un producto
      guardarCarrito(); // Guardar los datos del carrito en el localStorage
    });

    contenedorProductos.insertAdjacentElement("afterbegin", div); // para que quede al principio del div
  });
}
// mostrar los productos en el HTML
cargarProductos();



// Funcion para calcular precio de producto x cantidad en gramos
function calcularTotalProducto(precio, cantidad) {
  return precio * (cantidad / 100);
}


// funcion para para actualizar y sumar el precio total de todos los productos
function actualizarPrecioTotal() {
  const productosAgregados = Array.from(document.querySelectorAll(".totalproducto"));
  const precioTotal = productosAgregados.reduce((total, producto) => {
    const precio = parseFloat(producto.textContent.replace("$", ""));
    return total + precio;
  }, 0);
  precioTotalElement.textContent = `$${precioTotal}`;
}


// funcion para guardar el carrito en el localstorage
function guardarCarrito() {
  const productosAgregados = Array.from(document.querySelectorAll(".elementodecompra"));
  const carrito = productosAgregados.map(producto => {
    const nombre = producto.querySelector(".nombreproducto").innerText;
    const cantidad = parseInt(producto.querySelector(".cantidad__input").value);
    return { nombre, cantidad };
  });
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



// funcion para restarar el carrito desde el localstorage
function restaurarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const carrito = JSON.parse(carritoGuardado);
    
    carrito.forEach(item => {
      const producto = productos.find(p => p.nombre === item.nombre);
      if (producto) {
        const div = Array.from(contenedorProductos.children).find(child => child.querySelector(".nombreproducto").innerText === item.nombre);
        
        if (div) {
          const inputCantidad = div.querySelector(".cantidad__input");
          inputCantidad.value = item.cantidad;
          const total = calcularTotalProducto(producto.precio, item.cantidad);
          div.querySelector(".totalproducto").textContent = `${total}$`;
        }
      }
    });
    
    actualizarPrecioTotal();
  }
}

// funcion para reiniciar todos los contadores
function reiniciarCantidadProductos() {
  const productos = document.querySelectorAll(".elementodecompra");
  productos.forEach(producto => {
    const inputCantidad = producto.querySelector(".cantidad__input");
    inputCantidad.value = "0";

    const botonCompra = producto.querySelector(".botoncompra");
    botonCompra.click();
  });
}




// funcion alert final al comprar
const botonComprar = document.querySelector("#botoncarrito");
botonComprar.addEventListener("click", () => {
  const precioTotal = parseFloat(precioTotalElement.textContent.replace("$", ""));
  Swal.fire({
    title: 'TOTAL A PAGAR: $' + precioTotal,
    text: 'Esperamos que nuestra atención haya sido de su agrado. Su producto será enviado.\nGracias por comprar en DRACARNIS.\nSíguenos en Instagram @Dracarnis',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      reiniciarCantidadProductos(); // Reinicia las cantidades de productos a cero
    }
  });
});



