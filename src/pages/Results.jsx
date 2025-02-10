import { useState, useEffect } from "react";
import "../styles/nav.css";

export default function Results() {
  const [userData, setUserData] = useState([]);

  // Load data from localStorage when the page loads
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedData);
  }, []);

  return (
    <div className="results-container">
      <h2>User Submissions</h2>

      {/* If no data, show a message */}
      {userData.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Tech Stack</th>
              <th>Time Spent (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.techStack}</td>
                <td>{user.timeSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

