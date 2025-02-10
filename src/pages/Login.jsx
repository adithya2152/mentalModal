import { useState, useEffect, useRef } from "react";
import "../styles/nav.css";

export default function SDEInternApplication() {
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [userData, setUserData] = useState([]); // Stores all submitted data
  const [startTime, setStartTime] = useState(null); // Stores entry time
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [techStack, setTechStack] = useState("");
  const dropdownRef = useRef(null);

  // Load previous responses from localStorage when the page loads
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedData);
  }, []);

  // Disable backspace in password field
  const handlePasswordKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
  };

  // Close dropdown too fast
  const handleTechStackFocus = () => {
    if (dropdownRef.current) {
      dropdownRef.current.size = 5;
      setTimeout(() => {
        dropdownRef.current.blur();
        dropdownRef.current.size = 1;
      }, 300);
    }
  };

  // Handle "Enter" click → Start timer & show form
  const handleEnterClick = () => {
    setStartTime(new Date().getTime()); // Store the entry time
    setShowForm(true); // Show the form
  };

  // Handle "Clear Form" click → Reset form fields & start new timer
  const handleClearForm = () => {
    setStartTime(new Date().getTime()); // Reset start time
    setFullName("");
    setEmail("");
    setTechStack("");
    if (dropdownRef.current) {
      dropdownRef.current.value = ""; // Reset dropdown selection
    }
  };

  // Handle "Clear Table" click → Remove all saved data
  const handleClearTable = () => {
    setUserData([]); // Clear table data in state
    localStorage.removeItem("userData"); // Remove saved data
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const exitTime = new Date().getTime(); // Capture exit time
    const timeSpent = (exitTime - startTime) / 1000; // Calculate time spent in seconds

    // Append new data to userData array
    const newUser = { fullName, email, techStack, timeSpent };
    const updatedUserData = [...userData, newUser];

    setUserData(updatedUserData); // Update state
    localStorage.setItem("userData", JSON.stringify(updatedUserData)); // Save to localStorage

    // Clear input fields
    handleClearForm();
  };

  return (
    <div className="form-container">
      {/* Show "Enter" button initially */}
      {!showForm && (
        <div className="enter-container">
          <button onClick={handleEnterClick} className="enter-button">
            Enter
          </button>
        </div>
      )}

      {/* Show form only after "Enter" is clicked */}
      {showForm && (
        <div className="form-card">
          <h2 className="form-title">SDE Intern Application</h2>
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-section">
              <label>Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>

            <div className="form-section">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-section">
              <label>Preferred Tech Stack</label>
              <select ref={dropdownRef} onChange={(e) => setTechStack(e.target.value)} onFocus={handleTechStackFocus} value={techStack}>
                <option value="">Select Tech Stack</option>
                <option value="MERN">MERN</option>
                <option value="MEVN">MEVN</option>
                <option value="LAMP">LAMP</option>
                <option value="Python/Django">Python & Django</option>
                <option value="Java/Spring">Java & Spring Boot</option>
              </select>
            </div>

            <div className="form-section">
              <label>Create a Password (For Job Portal Access)</label>
              <input type="password" onKeyDown={handlePasswordKeyDown} required />
            </div>

            <div className="form-actions">
              <button type="button" className="clear-button" onClick={handleClearForm}>Clear Form</button>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      )}

      {/* Results Table (Always Below the Form) */}
      <div className="results-container">
        <h2>Submitted Users</h2>
        {userData.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <>
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

            {/* Clear Table Button */}
            <button onClick={handleClearTable} className="clear-table-button">
              Clear Table
            </button>
          </>
        )}
      </div>
    </div>
  );
}



