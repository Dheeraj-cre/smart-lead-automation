import { useState, useEffect } from "react";
import api from "./api/axios";
import "./App.css";

function App() {
  const [names, setNames] = useState("");
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Debug once (optional)
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  const submitHandler = async () => {
    if (!names.trim()) {
      alert("Please enter at least one name");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/api/leads/process", {
        names: names
          .split(",")
          .map(n => n.trim())
          .filter(Boolean)
      });

      setLeads(res.data);
    } catch (err) {
      if (!err.response) {
        alert("Server is waking up. Please try again in a few seconds.");
      } else {
        alert(err.response.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === "All" ? leads : leads.filter(l => l.status === filter);

  return (
    <div className="container">
      <h2>Smart Lead Automation</h2>

      <textarea
        placeholder="Peter, Aditi, Ravi"
        value={names}
        onChange={(e) => setNames(e.target.value)}
      />

      <div className="controls">
        <button onClick={submitHandler} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Verified</option>
          <option>To Check</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Probability</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((l, i) => (
            <tr key={i}>
              <td>{l.name}</td>
              <td>{l.country}</td>
              <td>{(l.probability * 100).toFixed(2)}%</td>
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
