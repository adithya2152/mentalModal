import { useState, useRef } from "react";
import "../styles/nav.css"; // Ensure styles are correctly linked

export default function SDEInternApplication() {
  const [techStack, setTechStack] = useState("");
  const dropdownRef = useRef(null);

  // Disable backspace in the password field
  const handlePasswordKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
  };

  // Close dropdown too quickly (violates mental model)
  const handleTechStackFocus = () => {
    if (dropdownRef.current) {
      dropdownRef.current.size = 5;
      setTimeout(() => {
        dropdownRef.current.blur();
        dropdownRef.current.size = 1;
      }, 300);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">SDE Intern Application</h2>
        <p className="form-subtitle">Please fill out this form to apply for the Software Development Engineer Internship position.</p>
        <form className="form-content">
          {/* Full Name */}
          <div className="form-section">
            <label>Full Name</label>
            <input type="text" required />
          </div>

          {/* Email */}
          <div className="form-section">
            <label>Email Address</label>
            <input type="email" required />
          </div>

          {/* Preferred Tech Stack */}
          <div className="form-section">
            <label>Preferred Tech Stack (Dropdown closes too fast!)</label>
            <select ref={dropdownRef} onChange={(e) => setTechStack(e.target.value)} onFocus={handleTechStackFocus} value={techStack}>
              <option value="">Select Tech Stack</option>
              <option value="MERN">MERN (MongoDB, Express, React, Node.js)</option>
              <option value="MEVN">MEVN (MongoDB, Express, Vue, Node.js)</option>
              <option value="LAMP">LAMP (Linux, Apache, MySQL, PHP)</option>
              <option value="Python/Django">Python & Django</option>
              <option value="Java/Spring">Java & Spring Boot</option>
              <option value="Go/Gin">Go & Gin Framework</option>
            </select>
          </div>

          {/* Password for Authentication or Job Portal Access */}
          <div className="form-section">
            <label>Create a Password (For Job Portal Access)</label>
            <input type="password" onKeyDown={handlePasswordKeyDown} required />
          </div>

          {/* Resume Upload */}
          <div className="form-section">
            <label>Upload Resume (PDF only)</label>
            <input type="file" accept=".pdf" />
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="reset" className="clear-button">Clear form</button>
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}







