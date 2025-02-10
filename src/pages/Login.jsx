import { useState, useEffect, useRef } from "react";
import "../styles/nav.css";

export default function SDEInternApplication() {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [techStack, setTechStack] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedData);
  }, []);

  // Simulate unexpected input clearing
  useEffect(() => {
    if (fullName.length > 5) {
      setTimeout(() => {
        setFullName(""); // Clear full name field unexpectedly
      }, 3000);
    }
  }, [fullName]);

  const handlePasswordKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
  };

  // Redirect focus to an unrelated field
  const handleFieldFocus = (field) => {
    if (field === "fullName" && email === "") {
      document.getElementById("emailField").focus();
    }
  };

  const handleEnterClick = () => {
    setStartTime(new Date().getTime());
    setShowForm(true);
  };

  const handleClearForm = () => {
    setStartTime(new Date().getTime());
    setFullName("");
    setEmail("");
    setTechStack("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleClearTable = () => {
    setUserData([]);
    localStorage.removeItem("userData");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Something is wrong. Try again."); // Vague error message
      return;
    }

    setError("");
    const exitTime = new Date().getTime();
    const timeSpent = (exitTime - startTime) / 1000;

    const newUser = { fullName, email, techStack, timeSpent };
    const updatedUserData = [...userData, newUser];

    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    handleClearForm();
  };

  return (
    <div className="form-container">
      {!showForm && (
        <div className="enter-container">
          <button onClick={handleEnterClick} className="enter-button">
            Proceed
          </button>
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <h2 className="form-title">Application Form</h2>
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-section">
              <label>Full Name</label>
              <input
                id="fullNameField"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => handleFieldFocus("fullName")}
                required
              />
            </div>

            <div className="form-section">
              <label>Email Address</label>
              <input
                id="emailField"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFieldFocus("email")}
                required
              />
            </div>

            <div className="form-section">
              <label>Preferred Tech Stack</label>
              <select
                ref={dropdownRef}
                onChange={(e) => setTechStack(e.target.value)}
                value={techStack}
              >
                <option value="">Choose an option</option>
                <option value="MERN">MERN</option>
                <option value="MEVN">MEVN</option>
                <option value="LAMP">LAMP</option>
                <option value="Python/Django">Python & Django</option>
                <option value="Java/Spring">Java & Spring Boot</option>
              </select>
            </div>

            <div className="form-section">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                required
              />
            </div>

            <div className="form-section">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="form-actions">
              <button type="button" className="clear-button" onClick={handleClearForm}>
                Erase
              </button>
              <button type="submit" className="submit-button">
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="results-container">
        <h2>Applications</h2>
        {userData.length === 0 ? (
          <p>No data yet.</p>
        ) : (
          <>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Stack</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.techStack}</td>
                    <td>{user.timeSpent}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleClearTable} className="clear-table-button">
              Wipe
            </button>
          </>
        )}
      </div>
    </div>
  );
}
