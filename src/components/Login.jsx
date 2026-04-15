import React, { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.user_id) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } else {
      alert("Virheellinen kirjautuminen");
    }
  };

  return (
    <div>
      <h2>Kirjaudu</h2>

      <input
        placeholder="Käyttäjänimi"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Salasana"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;