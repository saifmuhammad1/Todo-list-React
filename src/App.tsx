import { useEffect, useState } from "react";

import "./index.css";

import todoService from "./service/todoService";
import { Button } from "./components/ui/button";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import TodoList from "./pages/todo/todoList";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" Component={TodoList} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
