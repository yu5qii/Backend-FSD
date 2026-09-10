import express from "express";
import fs from "fs";

const app = express();
const PROT = 3000;

app.get("/", (req, res) => {
    fs.readFile("./pages/index.html", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error reading the file");
            return;
        }
        else {
            res.send(data);
        }
    });
})

app.get("/contact", (req, res) => {
    fs.readFile("./pages/contact.html", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error reading the file");
            return;
        }
        else {
            res.send(data);
        }
    });
})

app.get("/about", (req, res) => {
    fs.readFile("./pages/about.html", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error reading the file");
            return;
        }
        else {
            res.send(data);
        }
    });
})
