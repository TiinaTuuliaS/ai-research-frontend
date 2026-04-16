import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // 🔥 JOS EI USER → NÄYTÄ LOGIN
  if (!user) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Kirjaudu sisään</h2>
        <Login setUser={setUser} />
        <Signup />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div style={styles.navbar}>
        
        <div style={styles.left}>
          <Link style={styles.link} to="/">🔎 Tutkimus</Link>
          <Link style={styles.link} to="/history">📜 Historia</Link>
        </div>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null); // 🔥 TÄRKEÄ
          }}
        >
          🚪 Logout
        </button>

      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#fff",
    borderBottom: "1px solid #eee"
  },

  left: {
    display: "flex",
    gap: "20px"
  },

  link: {
    textDecoration: "none",
    color: "#111",
    fontWeight: "500"
  },

  logout: {
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default App;