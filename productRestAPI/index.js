import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, 'products.json');

// Middleware to parse incoming JSON bodies
app.use(express.json());

// --- 1. Auto-Generate 100 Products ---
function initData() {
    if (!fs.existsSync(dataFile)) {
        const mockProducts = [];
        for (let i = 1; i <= 100; i++) {
            mockProducts.push({
                id: i,
                name: `Product ${i}`,
                price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
                category: "Tech"
            });
        }
        fs.writeFileSync(dataFile, JSON.stringify(mockProducts, null, 2));
        console.log("Created products.json with 100 items.");
    }
}

// Helper functions for file reading/writing
const readData = () => JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

// Initialize the JSON file
initData();

// --- 2. REST API Routes ---

// GET: Retrieve all products
app.get('/api/products', (req, res) => {
    const products = readData();
    res.status(200).json(products);
});

// GET: Retrieve a single product by ID
app.get('/api/products/:id', (req, res) => {
    const products = readData();
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
});

// POST: Create a new product
app.post('/api/products', (req, res) => {
    const products = readData();
    const newProduct = {
        // Auto-increment ID based on the highest existing ID
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category || "General"
    };
    
    products.push(newProduct);
    writeData(products);
    res.status(201).json({ message: "Product created", product: newProduct });
});

// PUT: Update an existing product
app.put('/api/products/:id', (req, res) => {
    const products = readData();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) return res.status(404).json({ message: "Product not found" });
    
    products[index] = {
        ...products[index],
        name: req.body.name || products[index].name,
        price: req.body.price || products[index].price,
        category: req.body.category || products[index].category
    };
    
    writeData(products);
    res.status(200).json({ message: "Product updated", product: products[index] });
});

// DELETE: Remove a product
app.delete('/api/products/:id', (req, res) => {
    const products = readData();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) return res.status(404).json({ message: "Product not found" });
    
    const deletedProduct = products.splice(index, 1);
    writeData(products);
    res.status(200).json({ message: "Product deleted", product: deletedProduct[0] });
});

// --- 3. Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});