console.log(a);
var a = 5;
console.log(a)

x = 88;
var x;
console.log(x)

// console.log(b); from here the execution will stop once 
let b = 90;
console.log(b);


// TDZ - temporal dead zone
// let and const are also hoisted we can't block them from hoisting but JS put them in TDZ before assignment
console.log(x)
var x = 90;
console.log(x);

greet()

function greet() {
    console.log("Hello World")
}

let hello = () => {
    console.log("I am arrow") //hoisted as temporal dead zone means error will be cannot use before initialization
}

var hello2 = () => {
    console.log("I am var arrow") //hoisted as undefined function so error will be not a function
}

hello();

var c = 8;

greet2();

var d = 9;


function greet2() {
    console.log(c) //calue is there
    console.log(d) //undefined b/c d is assigned after greet2 is called
    // greet2()
}

var g = 10;

for (let i = 0; i < 2; i++){
    console.log(g);
}

console.log(i)

