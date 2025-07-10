import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Error404 from "./pages/404.jsx";
import Layout from "./pages/Tasks/Layout.jsx";

import { supabase } from "./api/client.js";
import { useEffect } from "react";

function App() {

  const navigate = useNavigate();

   useEffect(() => {
      supabase.auth.onAuthStateChange((event, session) => {
        if (!session) {
          console.log("No session found, redirecting to login.");
        } else {
          console.log("Session found, redirecting to dashboard.");
          navigate("/home");
        }
      });
    }, []);
  

    return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Layout />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
