

alert ("¡Muy buen dia, Bienvenido a DRACARNIS!\nFabricación artesanal de productos derivados de la carne.\nCecinas🥓 • Charcutería🥩 • Embutidos🌭 • Fiambres🍖")

let nombreUsuario = prompt("Por favor indiquenos su nombre")

alert ("Muy bien " + nombreUsuario + " tenemos diversidad de productos a tu disposición.\n🥩Bondiola\n🌭Salame\n🍖Jamón Serrano\n🥓Charqui\n\n¿Te gustaria ver nuestros precios?")

let precioBondiola  = 3100
let precioJamonserrano= 4200
let precioSalame    = 1990
let precioCharqui   = 1500



function pedirCantidad(producto , precio) {
let cantidad = 0
let compra = true
do {
    cantidad = prompt("Tenemos " + producto + " en " + precio + "$ los 100gr\npor favor introduzca la cantidad en gramos que desea\nLa cantidad minima a comprar es 100gr\nSi no desea " + producto + " presione CANCELAR" )
    if (cantidad === null) { 
        break
    }

 if ( cantidad >= 100) {
    alert("Muchas gracias " + nombreUsuario + " , hemos añadido a tu cesta " + cantidad + " gramos de " + producto + ", por un monto de:\n"+ (( precio * cantidad)/100)+"$")
    {break}
} else {
    alert( "Lo sentimos, la cantidad minima de compra son 100 gramos")
}
}while (compra)
return cantidad
}


let cantidadBondiola = pedirCantidad("🥩Bondiola Curada", precioBondiola)
let cantidadJamonserrano = pedirCantidad("🍖Jamón Serrano", precioJamonserrano)
let cantidadSalame = pedirCantidad("🌭Salame", precioSalame)
let cantidadCharqui = pedirCantidad("🥓Charqui", precioCharqui)



let totalBondiola = (cantidadBondiola * precioBondiola)/100
let totalJamonserrano = (cantidadJamonserrano * precioJamonserrano)/100
let totalSalame = (cantidadSalame * precioSalame)/100
let totalCharqui = (cantidadCharqui * precioCharqui)/100
let totalapagar = totalBondiola + totalJamonserrano + totalSalame + totalCharqui

alert ( "Su cesta final tiene los siguientes productos\n🥩BONDIOLA CURADA " + cantidadBondiola + "gr " + totalBondiola + "$\n🍖JAMÓN SERRANO " + cantidadJamonserrano + "gr " + totalJamonserrano + "$\n🌭SALAME " + cantidadSalame + "gr " + totalSalame + "$\n🥓CHARQUI " + cantidadCharqui + "gr " + totalCharqui + "$" + "\nTOTAL A PAGAR: " + totalapagar + "$") 

alert ( "Esperamos que nuestra atención haya sido de su agrado, su producto sera enviado.\n Gracias por comprar en DRACARNIS\n siguenos en instagram @Dracarnis")