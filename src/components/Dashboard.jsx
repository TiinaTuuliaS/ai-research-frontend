import React, { useState } from "react";

function Dashboard() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [researches, setResearches] = useState([]);

  const runResearch = async () => {
    if (!topic) return;

    const user = JSON.parse(localStorage.getItem("user"));

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:8000/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic: topic,
          language: "suomi",
          user_id: user.user_id   // 🔥 LISÄTTY
        })
      });

      const data = await response.json();
      setResult(data.result);

    } catch (error) {
      setResult("Virhe backend-yhteydessä");
    }

    setLoading(false);
  };

  const fetchResearches = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/researches/${user.user_id}` // 🔥 KORJATTU
      );

      const data = await response.json();
      setResearches(data);

    } catch (error) {
      console.error("Virhe haettaessa hakuja");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🔎 AI Research Assistant</h1>

      <input
        type="text"
        placeholder="Kirjoita tutkimusaihe..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={runResearch}>
        🚀 Suorita
      </button>

      <br /><br />

      <button onClick={fetchResearches}>
        📜 Näytä aiemmat haut
      </button>

      <br /><br />

      {loading && <p>⏳ AI tekee tutkimusta...</p>}

      <div style={{ whiteSpace: "pre-wrap" }}>
        {result}
      </div>

      {researches.map((r) => (
        <div
          key={r.id}
          style={{ marginTop: "20px", borderTop: "1px solid #ccc" }}
        >
          <h3>{r.topic}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{r.result}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;