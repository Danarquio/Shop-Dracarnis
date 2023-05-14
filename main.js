alert("¡Muy buen día, Bienvenido a DRACARNIS!\nFabricación artesanal de productos derivados de la carne.\nCecinas🥓 • Charcutería🥩 • Embutidos🌭 • Fiambres🍖");

let nombreUsuario = prompt("Por favor indíquenos su nombre");

alert(`Muy bien ${nombreUsuario}, tenemos diversidad de productos a tu disposición.
🥩Bondiola
🌭Salame
🍖Jamón Serrano
🥓Charqui

¿Te gustaría ver nuestros precios?`);



// mi array de objetos 
const productos = [
  { nombre: "🥩Bondiola Curada", precio: 3100, cantidad: 5000, categoria: "curados" }, 
  { nombre: "🍖Jamón Serrano", precio: 4200, cantidad: 2000, categoria: "curados" },
  { nombre: "🌭Salame", precio: 1990, cantidad: 8500, categoria: "embutido" },
  { nombre: "🥓Charqui", precio: 1500, cantidad: 5500, categoria: "deshidratados" }
];




//funcion de compra
function pedirCantidad(producto) {
  let cantidad = 0;
  let compra = true;

  do {
    cantidad = prompt("Tenemos " + producto.nombre + " en " + producto.precio + "$ los 100gr\npor favor introduzca la cantidad en gramos que desea\nLa cantidad minima a comprar es 100gr\nSi no desea " + producto.nombre + " presione CANCELAR");
    if (cantidad === null) { 
      break;
    }

    if (cantidad >= 100 && cantidad <= producto.cantidad) {
      alert("Muchas gracias " + nombreUsuario + ", hemos añadido a tu cesta " + cantidad + " gramos de " + producto.nombre + ", por un monto de:\n"+ ((producto.precio * cantidad)/100)+"$");
      producto.cantidad -= cantidad; 
      break;
    } else if (cantidad < 100) {
      alert("Lo sentimos, la cantidad minima de compra son 100 gramos");
    } else {
      alert("Lo sentimos, no tenemos suficiente stock disponible");
    }
  } while (compra);

  return cantidad;
}




const cantidades = productos.map((producto) => pedirCantidad(producto) || 0
);

const productosComprados = productos.filter((producto, index) => {
  return cantidades[index] !== 0;
});



const totalaPagar = productosComprados.reduce(
  (acumulado, producto, index) => {
    const precio = producto.precio * (cantidades[index] / 100);
    return acumulado + precio;
  },
  0
);

let resumenCompra = "Su cesta final tiene los siguientes productos:\n";

productosComprados.forEach((producto, index) => {
  const cantidad = cantidades[index];
  const total = producto.precio * (cantidad / 100);
  resumenCompra += `${producto.nombre} ${cantidad} gr ${total}$\n`;
});

alert(`${resumenCompra}TOTAL A PAGAR: ${totalaPagar}$`);

alert("Esperamos que nuestra atención haya sido de su agrado, su producto será enviado.\nGracias por comprar en DRACARNIS.\nSíguenos en Instagram @Dracarnis"
);

