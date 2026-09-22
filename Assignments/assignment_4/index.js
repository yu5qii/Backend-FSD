import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;
const FILE_PATH = "requests.json";

app.use(cors());
app.use(express.json());

// Serve the frontend files from the "public" folder
app.use(express.static("public"));

// Helper functions for safe file handling
const readRequests = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return data ? JSON.parse(data) : [];
};

const writeRequests = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

// 1. GET all requests
app.get("/api/requests", (req, res) => {
  res.json(readRequests());
});

// 2. GET a single request by ID
app.get("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const request = requests.find((r) => r.id === parseInt(req.params.id));
  
  if (!request) return res.status(404).json({ message: "Request not found" });
  res.json(request);
});

// 3. POST a new request
app.post("/api/requests", (req, res) => {
  const requests = readRequests();
  const newRequest = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
    status: "Pending" // Default status for new problems
  };

  requests.push(newRequest);
  writeRequests(requests);
  res.status(201).json(newRequest);
});

// 4. PUT (Update) an existing request
app.put("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const index = requests.findIndex((r) => r.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Request not found" });

  // Update the fields while preserving the ID and status
  requests[index] = { ...requests[index], ...req.body, id: requests[index].id };
  
  writeRequests(requests);
  res.json(requests[index]);
});

// 5. DELETE a request
app.delete("/api/requests/:id", (req, res) => {
  let requests = readRequests();
  const filteredRequests = requests.filter((r) => r.id !== parseInt(req.params.id));

  writeRequests(filteredRequests);
  res.json({ message: "Request deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});