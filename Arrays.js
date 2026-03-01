/* Usaré este array para la mayoría de ejemplos  */

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Array original: " + numeros);

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

encontrarUltimoIndice = numeros.findLastIndex((num) => num === 10);
console.log("Indice del ultimo numero " + encontrarUltimoIndice);

anidado = [1,2,[3,4]];
aplanado = anidado.flat();
console.log("Array aplanado: " + aplanado);

duplicados = numeros.flatMap(function(n) { return [n, n];});
console.log("Array usando flatMap (duplicando valores): " + duplicados);

numeros.forEach(function(n) { console.log("(For Each - Número: " + n) });

incluyeCinco = numeros.includes(5);
console.log("¿El array incluye el número 5?: " + incluyeCinco);

posicionOcho = numeros.indexOf(8);
console.log("Posición del número 8: " + posicionOcho);

arrayTexto = numeros.join("-");
console.log("Array unido con guiones: " + arrayTexto);

llaves = Array.from(numeros.keys());
console.log("Llaves del array: " + llaves);

ultimaPosicionDies = numeros.lastIndexOf(10);
console.log("Última posición del número 10: " + ultimaPosicionDies);

multiplicadosPorDos = numeros.map(function(n) { return n * 2 });
console.log("Array multiplicado por 2: " + multiplicadosPorDos);

ultimoElemento = numeros.pop();
console.log("Elemento eliminado con pop: " + ultimoElemento);
console.log("Array después de pop: " + numeros);

numeros.push(11);
console.log("Al agregar 11 con push: " + numeros);

sumaTotal = numeros.reduce(function(acumulador, n) { return acumulador + n }, 0);
console.log("Suma total del array: " + sumaTotal);

resta = numeros.reduceRight(function(acumulador, n) {return acumulador - n });
console.log("Resultado usando reduceRight (resta): " + resta);

numeros.reverse();
console.log("Array invertido: " + numeros);

Eliminado1 = numeros.shift();
console.log("Elemento eliminado con shift: " + eliminado1);
console.log("Array después de shift: " + numeros);

parteArray = numeros.slice(2, 5);
console.log("Slice desde 2 hasta 5: " + parteArray);

Mayores7 = numeros.some(function(n) { return n > 7 });
console.log("¿Hay números mayores a 7?: " + Mayores7);

numerosDesordenados = [5, 1, 8, 3, 2];
console.log("Array desordenado: " + numerosDesordenados);
numerosDesordenados.sort(function(a, b) { return a - b });
console.log("Array ordenado: " + numerosDesordenados);

eliminados = numeros.splice(3, 2);
console.log("Elementos eliminados con splice: " + eliminados);
console.log("Array después de splice: " + numeros);

arrayEnTexto = numeros.toLocaleString();
console.log("Array convertido con toLocaleString: " + arrayEnTexto);

arrayTexto2 = numeros.toString();
console.log("Array convertido a texto con toString: " + arrayTexto2);

numeros.unshift(0);
console.log("Array después de agregar 0 con unshift: " + numeros);

valores = Array.from(numeros.values());
console.log("Valores del array: " + valores);