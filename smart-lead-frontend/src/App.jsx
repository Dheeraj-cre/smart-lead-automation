// Import useState hook from React
// It is used to manage component state
import { useState } from "react";
import "./App.css";

function App() {

  // Stores the raw input from the textarea (comma-separated names)
  const [names, setNames] = useState("");

  // Stores the processed lead data returned from the backend
  const [leads, setLeads] = useState([]);

  // Stores the selected filter value (All / Verified / To Check)
  const [filter, setFilter] = useState("All");

  // This function is triggered when the Submit button is clicked
  const submitHandler = async () => {

    // Send a POST request to the backend API
    const response = await fetch(
      "http://localhost:5000/api/leads/process",
      {
        method: "POST",

        // Specify that we are sending JSON data
        headers: { "Content-Type": "application/json" },

        // Convert the comma-separated names into an array
        body: JSON.stringify({
          names: names.split(",").map(n => n.trim())
        })
      }
    );

    // Parse the JSON response from the backend
    const data = await response.json();

    // Update the leads state with processed results
    setLeads(data);
  };

  // Filter logic for the table
  const filtered =
    filter === "All"
      ? leads
      : leads.filter(l => l.status === filter);

  return (
    <div className="container">

      {/* Application title */}
      <h2>Smart Lead Automation</h2>

      {/* Textarea for entering names */}
      <textarea
        placeholder="Peter, Aditi, Ravi"
        onChange={(e) => setNames(e.target.value)}
      />

      {/* Action buttons */}
      <div className="controls">
        <button onClick={submitHandler}>Submit</button>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Verified</option>
          <option>To Check</option>
        </select>
      </div>

      {/* Table to display processed lead data */}
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

// Export the App component
export default App;
