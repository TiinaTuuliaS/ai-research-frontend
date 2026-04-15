import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  if (!user) {
    return (
      <div>
        <h1>🔐 Kirjaudu</h1>
        <Login setUser={setUser} />
        <Signup />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
      >
        🚪 Logout
      </button>

      <Dashboard />
    </div>
  );
}

export default App;