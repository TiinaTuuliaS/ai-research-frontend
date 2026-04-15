import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    alert("Käyttäjä luotu!");
  };

  return (
    <div>
      <h2>Rekisteröidy</h2>

      <input
        placeholder="Käyttäjänimi"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Salasana"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Sign up</button>
    </div>
  );
}

export default Signup;