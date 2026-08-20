import http from "http";

const server = http.createServer((req,res)=>{
    res.writeHead(200, {"content-type" : "text/html"});
    res.write("<h1>hellooowww</h1>");
    res.write("welcome to my server");
    res.end();
})


server.listen(8080,()=>{
    console.log("server is running on port 8080");
})

