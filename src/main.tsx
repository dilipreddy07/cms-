import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: "red", fontFamily: "monospace" }}>
          <h1>App crashed:</h1>
          <pre>{this.state.error?.message}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("main.tsx loaded, rendering app...");

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <div style={{ border: "3px solid red", padding: 20, margin: 20 }}>
      <p style={{ fontSize: 24, color: "black" }}>DEBUG: If you see this, React is rendering.</p>
      <App />
    </div>
  </ErrorBoundary>
);
