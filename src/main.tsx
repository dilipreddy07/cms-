import React from "react";
import { createRoot } from "react-dom/client";

// Temporarily comment out app import to test if React renders at all
// import App from "./app/App.tsx";
// import "./styles/index.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ color: "green", fontSize: 32 }}>React is working!</h1>
      <p>If you see this, the issue is in App.tsx or CSS imports.</p>
    </div>
  );
} else {
  document.body.innerHTML = '<h1 style="color:red">No root element found!</h1>';
}
