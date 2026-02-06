/* Usaré este array para la mayoría de ejemplos  */

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

cantidad = numeros.length;
console.log("Cantidad de elementos en el array: " + cantidad);

primerElemento = numeros.at(0);
console.log("Primer elemento del array: " + primerElemento);

let numeros2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let combinar = numeros.concat(numeros2);
console.log("Arrays combinados: " + combinar);

lista = new Array(5);
console.log("Array construido con 5 elementos" + lista);

copiar = numeros.copyWithin(0, 5);
console.log("Array copiado dentro de el mismo: " + copiar);

entradas = numeros.entries();
console.log("Entradas hechas en el array: " + entradas);

positivos = numeros.every((num) => num > 0);
console.log ("Todos los numeros son positivos?" + positivos);

llenar = numeros.fill(0, 2, 5);
console.log("Array con elementos llenados: " + llenar);

filtro = numeros.filter((num) => num % 2 === 0);
console.log("Array con filtros: " + filtro);

encontrar = numeros.find ((num) => num < 4)
console.log("Numero menor a 4:" + encontrar)

encontrarIndice = numeros.findIndex((num) => num === 2);
console.log("Indice del numero 2:" + encontrarIndice);

encontrarUltimo = numeros.findLast((num) => num === 10);
console.log( + encontrarUltimo);