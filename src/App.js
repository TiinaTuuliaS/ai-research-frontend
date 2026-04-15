import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runResearch = async () => {
    if (!topic) return;

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
          language: "suomi"
        })
      });

      const data = await response.json();
      setResult(data.result);

    } catch (error) {
      setResult("Virhe backend-yhteydessä");
    }

    setLoading(false);
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

      {loading && <p>⏳ AI tekee tutkimusta...</p>}

      <div style={{ whiteSpace: "pre-wrap" }}>
        {result}
      </div>
    </div>
  );
}

export default App;
