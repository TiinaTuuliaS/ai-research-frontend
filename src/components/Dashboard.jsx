import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [researches, setResearches] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p style={{ padding: "30px" }}>⚠️ Kirjaudu uudelleen</p>;
  }

  // 🔥 AGENTIT (päivitetty + trend agent)
  const agents = [
    {
      name: "🔍 Research Agent",
      text: "Etsii ajankohtaista tietoa ja lähteitä"
    },
    {
      name: "📱 Trend Agent",
      text: "Analysoi sosiaalisen median ja hakutrendien suosiota"
    },
    {
      name: "📊 Analyst Agent",
      text: "Tunnistaa trendejä ja tekee johtopäätöksiä"
    },
    {
      name: "🧠 Writer Agent",
      text: "Kirjoittaa selkeää raporttia"
    },
    {
      name: "✨ Editor Agent",
      text: "Viimeistelee ja parantaa luettavuutta"
    }
  ];

  const runResearch = async () => {
    if (!topic) return;

    setLoading(true);
    setResult("");
    setActiveAgent(0);

    // 🔥 pipeline
    const timers = [
      setTimeout(() => setActiveAgent(1), 1200),
      setTimeout(() => setActiveAgent(2), 2400),
      setTimeout(() => setActiveAgent(3), 3600),
      setTimeout(() => setActiveAgent(4), 4800)
    ];

    try {
      const response = await fetch("http://127.0.0.1:8000/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          language: "suomi",
          user_id: user.user_id
        })
      });

      const data = await response.json();
      setResult(data.result);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      setTopic(""); // 🧹 tyhjennä input

    } catch (error) {
      setResult("Virhe backend-yhteydessä");
    }

    setLoading(false);
    timers.forEach(clearTimeout);
  };

  const fetchResearches = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/researches/${user.user_id}`
    );

    const data = await response.json();
    setResearches(data);
  };

  return (
    <div style={styles.page}>
      {showConfetti && (
        <Confetti numberOfPieces={250} gravity={0.25} recycle={false} />
      )}

      <div style={styles.container}>
        <h1 style={styles.title}>
          🤖 AI Markkinatutkimusassistentti 🤖
        </h1>

        {/* 🔍 Search */}
        <motion.div style={styles.card}>
          <input
            style={styles.input}
            placeholder="Tee markkinatutkimus... (esim. ruokatrendit 2026)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <motion.button
            style={styles.primaryButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runResearch}
          >
            🚀 Suorita tutkimus
          </motion.button>
        </motion.div>

        {/* 🔥 AGENT UI */}
        {loading && (
          <div style={styles.agentList}>
            {agents.map((agent, index) => (
              <motion.div
                key={index}
                style={{
                  ...styles.agentItem,
                  background:
                    index === activeAgent
                      ? "rgba(99,102,241,0.15)"
                      : "transparent"
                }}
                animate={{
                  scale: index === activeAgent ? 1.05 : 1,
                  opacity: index <= activeAgent ? 1 : 0.4
                }}
              >
                <div>
                  <div style={styles.agentName}>{agent.name}</div>
                  <div style={styles.agentDesc}>{agent.text}</div>
                </div>

                <div>
                  {index < activeAgent && "✔"}
                  {index === activeAgent && "🔄"}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 📄 Result */}
        {result && (
          <motion.div style={styles.card}>
            <h2>📄 Tulokset</h2>

            <button
              style={styles.secondaryButton}
              onClick={() => alert("PDF backend seuraavaksi 😉")}
            >
              📥 Lataa PDF
            </button>

            <div style={styles.result}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </motion.div>
        )}

        {/* 📜 History */}
        <motion.div style={styles.card}>
          <button style={styles.secondaryButton} onClick={fetchResearches}>
            📜 Näytä aiemmat haut
          </button>

          {researches.map((r) => (
            <motion.div
              key={r.id}
              style={styles.historyItem}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                localStorage.setItem("selectedResearch", JSON.stringify(r));
                navigate("/history");
              }}
            >
              <h3>{r.topic}</h3>
              <p style={styles.linkText}>
                Klikkaa nähdäksesi lisää →
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
    background: "linear-gradient(135deg, #eef2ff, #f0f9ff, #faf5ff)",
    fontFamily: "Inter, sans-serif"
  },

  container: {
    width: "700px"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px"
  },

  card: {
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "15px"
  },

  primaryButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    color: "white",
    border: "none"
  },

  secondaryButton: {
    marginBottom: "10px"
  },

  agentList: {
    padding: "15px",
    borderRadius: "16px",
    marginBottom: "20px",
    background: "rgba(255,255,255,0.7)"
  },

  agentItem: {
    padding: "12px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "10px"
  },

  agentName: {
    fontWeight: "600"
  },

  agentDesc: {
    fontSize: "13px",
    opacity: 0.7
  },

  historyItem: {
    padding: "10px",
    cursor: "pointer"
  },

  linkText: {
    color: "#4f46e5"
  }
};

export default Dashboard;