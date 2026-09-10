//practice routing using http module
import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type" : "text/html"});
    if (req.url === "/") {
        res.end("<h1>Welcome to home page</h1>");
    }
    else if (req.url === "/contact") {
        res.end("<h1>Welcome to contact page</h1>");
    }
})
server.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
})