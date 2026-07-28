//SYNCHRONOUS AND ASYNCHRONOUS

//SYNCHRONOUS: also called blocking
// console.log("task3");
// function hello(){
//     console.log("task1");
// }
// hello();
// console.log("task2");


//ASYNCHRONOUS: also called non-blocking
//CALLBACK: passing function as a parameter
// function hello() {
//     console.log("task1");
//     setTimeout(function() {
//         console.log("task2");
//     }, 2000)
// }
// hello();
// console.log("task3");

function hello(n1, n2, callback) {
    console.log("task1");
}

let a = 10;
let b = 20;
hello(a,b,hi());

function hi() {
    console.log("say hi");
}

function display() {
    console.log("Leaarning FSD");
}
display();

