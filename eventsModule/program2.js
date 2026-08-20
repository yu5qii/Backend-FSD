const { log } = require('console');
const eventEmitter = require('events');
const emitter = new eventEmitter();

emitter.on("click", () => {
    console.log('click event triggered');
});
emitter.emit('mouseover', () => {
    console.log('mouseover event triggered');
});

emitter.emit('click', (name) => {
    console.log("")
});
