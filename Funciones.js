let num1 = 10
let num2 = 5

const regularFuncion = function(num1) {
    if (num1 % 2 === 0) {
        return "El número es par"
    } else { 
        return "El número es impar"
    }
}

const arrowFunction = (num2) => {
    if (num2 % 2 === 0) {
        return "El número es par"
    } else { 
        return "El número es impar"
    }
}

console.log(regularFuncion(num1))
console.log(arrowFunction(num2))