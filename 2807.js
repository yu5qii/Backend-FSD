//PROMISES FOR ASYNCHRONOUS
const promiseOne = new Promise((resolve, reject) => {
    console.log("Promise task 1");
    resolve("promises passed using resolve");
    let msg = false;
    if (!msg) {
        console.log("message using promises failed");
    }
    else {
        console.log("--------error-------");
    }
    setTimeout(() => {      //setTimeout() is also asynch
        console.log("waited for 2 sec");
    }, 2000)
});
promiseOne.then((result) => {
    console.log("result");
}).catch((error) => {
    console.log(error);
})