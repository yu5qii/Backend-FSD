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
// console.log("1")
// async function test() {
//     console.log("2");
//     await console.log("3");
//     console.log("4");
//     console.log("5");
// }
// test();

//create promises that will print username and password using ___
//and if username and password are not found then it will call call
//reject state and print error

// const checkCredentials = (username, password) => {
//   return new Promise((resolve, reject) => {
//     const isFound = (username && password) ? true : false;

//     if (isFound) {
//       resolve({ user: username, pass: password });
//     } else {
//       reject(new Error("Error: Username and password not found."));
//     }
//   });
// };

// checkCredentials("Ridah", "123123")
//   .then((data) => {
//     console.log(`Username: ${data.user}, Password: ${data.pass}`);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

// checkCredentials("", null)
//   .then((data) => {
//     console.log(`Username: ${data.user}, Password: ${data.pass}`);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

async function test(){
    console.log("message: 1");
    const response = await fetch("./student_data.json");
    console.log(response.status)
    const std = await response.json();
    return std;
    console.log("message: 3");
}
test().then((res) => {
    console.log(res);
}).catch((error) => {
    console.error("error: ", error);
});