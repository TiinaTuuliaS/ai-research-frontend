import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function History() {
  const [researches, setResearches] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 AINA HOOKIT ENSIN
  useEffect(() => {
    if (!user) return;

    fetch(`http://127.0.0.1:8000/researches/${user.user_id}`)
      .then(res => res.json())
      .then(data => setResearches(data));
  }, [user]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedResearch");
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, []);

  // 🔥 vasta TÄMÄN JÄLKEEN return
  if (!user) {
    return <p style={{ padding: "30px" }}>⚠️ Kirjaudu sisään</p>;
  }

  return (
    <div style={styles.page}>
      <h1>📜 Aiemmat haut</h1>

      {/* 🔥 VALITTU */}
      {selected && (
        <div style={styles.selectedCard}>
          <h2>📄 Valittu raportti</h2>
          <ReactMarkdown>{selected.result}</ReactMarkdown>
        </div>
      )}

      {/* 🔥 LISTA */}
      {researches.map((r) => (
        <motion.div
          key={r.id}
          style={styles.card}
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelected(r)}
          >
          <h3>{r.topic}</h3>
          <p style={{ color: "#4f46e5" }}>
            Klikkaa avataksesi →
          </p>
        </motion.div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    maxWidth: "800px",
    margin: "auto"
  },

  selectedCard: {
    background: "#eef2ff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "2px solid #4f46e5"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    cursor: "pointer"
  }
};

export default History;