import "./App.css";
import Login from "./pages/Login";
import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Context, server } from "./main";
import SignUpForm from "./pages/SignUpForm.jsx";
import axios from "axios";
import Home from "./pages/Home.jsx";
import Manage from "./components/Manage.jsx";

function App() {
  const { setIsAuthenticated, loading, setLoading, setUser } =
    useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/api/v1/auth/authorize`, {
        withCredentials: true,
      })
      .then(res => {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      })
      .catch(err => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar></Navbar>
              <Home></Home>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar></Navbar>
              <Login></Login>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar></Navbar>
              <SignUpForm></SignUpForm>
            </>
          }
        />
        <Route
          path="/manage"
          element={
            <>
              <Navbar></Navbar>
              <Manage></Manage>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
