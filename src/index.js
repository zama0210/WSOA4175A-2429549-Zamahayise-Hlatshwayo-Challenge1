import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import "./index.css";
import RecipeBook from "./recipebook";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return <RecipeBook />;
}
