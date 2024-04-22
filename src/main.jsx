import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TodoList from "./TodoList.jsx";
import Header from "./Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <TodoList />
  </React.StrictMode>
);
