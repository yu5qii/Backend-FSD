//PROMISES FOR ASYNCHRONOUS
// new Promise((resolve, reject) => {      //can also store this in a variable
//     console.log("Promise task 1");
//     resolve("promises passed using resolve");
//     let msg = false;
//     if (!msg) {
//         console.log("message using promises failed");
//     }
//     else {
//         console.log("--------error-------");
//     }
//     setTimeout(() => {      //setTimeout() is also asynch
//         console.log("waited for 2 sec");
//     }, 2000)
// }).then((result) => {
//     console.log("result");
// }).catch((error) => {
//     console.log(error);
// })

//ASYNCH AWAIT
console.log("1")
async function test() {
    console.log("2");
    await console.log("3");
    console.log("4");
    console.log("5");
}
test()