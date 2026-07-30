//Events
//EventEmitter -> on(), emit()
//emit() -> triggers events/ create event
//on(emit event param, callback) -> register event/ event listener

const EventEmitter = require('events');
const name = "Ridah";
const age = 18;
const event = new EventEmitter();
event.on("greet", (name, age) => {
    console.log("hello {name}. You are {age} years old");
})
event.emit("greet", name, age);
