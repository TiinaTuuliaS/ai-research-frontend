import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!email || !password) {
      alert("Täytä kaikki kentät");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      console.log("status:", res.status);

      // 🔥 jos backend kaatuu eikä palauta JSONia
      let data = {};
      try {
        data = await res.json();
      } catch {
        console.warn("Ei JSON vastausta");
      }

      console.log("data:", data);

      if (!res.ok) {
        alert(data.error || "Signup epäonnistui");
        return;
      }

      alert("Tili luotu! Voit kirjautua.");

      // 🔥 tyhjennetään kentät
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("FETCH ERROR:", error);
      alert("Ei yhteyttä backendiin");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>✨ Luo tili</h2>

        <input
          style={styles.input}
          placeholder="Sähköposti tai käyttäjätunnus"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={signup}>
          Rekisteröidy
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    width: "320px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Signup;