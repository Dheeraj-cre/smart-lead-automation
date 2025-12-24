import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [names, setNames] = useState("");
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!names.trim()) {
      alert("Please enter at least one name");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/leads/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          names: names.split(",").map(n => n.trim())
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setLeads(data);

    } catch (error) {
      console.error("Error submitting leads:", error);
      alert("Server is waking up. Please try again in a few seconds.");
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
