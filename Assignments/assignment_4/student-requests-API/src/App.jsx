import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Infrastructure",
    priority: "Medium",
    description: "",
  });
  
  // Tracks if we are updating an existing request (holds the ID) or creating a new one (null)
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:3000/api/requests";

  // 1. GET: Fetch all requests
  const getRequests = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    }
  };

  // Run once when the component mounts
  useEffect(() => {
    getRequests();
  }, []);

  // Handle Input Changes seamlessly for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 2 & 3. POST / PUT: Submit new or updated request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        resetForm();
        getRequests(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to save request", error);
    }
  };

  // Setup form for Editing (Uses GET by ID)
  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      
      setFormData({
        name: data.name,
        email: data.email,
        category: data.category,
        priority: data.priority,
        description: data.description,
      });
      setEditingId(data.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch request details", error);
    }
  };

  // 4. DELETE: Remove request
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        getRequests(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete request", error);
      }
    }
  };

  // Helper to clear form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      category: "Infrastructure",
      priority: "Medium",
      description: "",
    });
    setEditingId(null);
  };

  return (
    <div className="container">
      {/* Form Section */}
      <div className="card">
        <h2>{editingId ? "Update Request" : "Submit Campus Request"}</h2>
        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-grid">
            <div className="input-group">
              <label>Student Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="Infrastructure">Infrastructure (Water, AC, etc.)</option>
                <option value="IT Services">IT & Wi-Fi</option>
                <option value="Hostel">Hostel & Mess</option>
                <option value="Academics">Academics & Library</option>
              </select>
            </div>

            <div className="input-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="input-group full-width">
              <label>Problem Description</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">
              {editingId ? "Save Changes" : "Submit Request"}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="card">
        <h2>Recent Requests</h2>
        {requests.length === 0 ? (
          <p className="empty-state">No requests found. Everything is running smoothly!</p>
        ) : (
          <div className="request-list">
            {requests.map((req) => (
              <div key={req.id} className="request-item">
                <div className="request-info">
                  <div className="request-header">
                    <h3>{req.category} Issue</h3>
                    <span className={`badge badge-${req.priority.toLowerCase()}`}>
                      {req.priority}
                    </span>
                  </div>
                  <p className="description">{req.description}</p>
                  <small className="meta">Submitted by {req.name} ({req.email})</small>
                </div>
                <div className="request-actions">
                  <button onClick={() => handleEdit(req.id)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(req.id)} className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;