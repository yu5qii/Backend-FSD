//event loop
//create one log synch task

console.log("synchronous task");
const f1 = () => {
    console.log("f1");
}
const f2 = () => {
    console.log("f2");
}

function main() {
    console.log("this event loop");
    setTimeout(f1, 2000);
    setTimeout(f2, 3000);
    new Promise((resolve, reject) => {
        resolve("I am promise 1");
    }).then((result) => {
        console.log(result);
    });
    new Promise((resolve, reject) => {
        console.log("I am promise 2");
    }).then((res) => {

    })

}

main();


