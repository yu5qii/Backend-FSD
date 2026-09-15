import express from'express';
import cors from 'cors';
import fs from 'fs';
// import product from './product.json' with { type: 'json' };

const app = express();

app.use(cors());
app.use(express.json());

//GET
app.get('/products', (req, res) => {
    const data = fs.readFile("product.json", "utf-8");
    const products = JSON.parse(data);
    res.json(products);
})

app.listen(4000, () => {
    console.log("app running on port: https://localhost: 4000");
})