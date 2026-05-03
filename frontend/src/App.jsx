import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        formData
      );

      setResult(response.data.topics);
    } catch (error) {
      alert("Backend connection failed.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#4CAF50" }}>AI DecodeX Hackathon</h1>
      <p>Past Paper Analyzer + Smart Study Planner</p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button
        onClick={handleAnalyze}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Analyze Papers
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>📊 High Frequency Topics</h2>

          {result.map((item, index) => (
            <p key={index}>
              {item.topic} - {item.count}%
            </p>
          ))}

          <h2>📅 Suggested Study Plan</h2>
          <p>Day 1: DBMS</p>
          <p>Day 2: OS</p>
          <p>Day 3: CN</p>
          <p>Day 4: AI</p>

          <h2>📚 Syllabus Coverage Gaps</h2>
          <p>Advanced AI Concepts - Low Coverage</p>
          <p>Network Security - Moderate Coverage</p>

          <h2>📝 Recommended Practice Questions</h2>
          <p>DBMS: Normalization & Transactions</p>
          <p>OS: CPU Scheduling Algorithms</p>
          <p>CN: Network Security Protocols</p>
        </div>
      )}
    </div>
  );
}

export default App;
