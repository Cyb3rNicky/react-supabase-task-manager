import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Error404 from "./pages/404.jsx";
import Tasks from "./pages/Tasks/Tasks.jsx";
import CreateTask from "./pages/Tasks/CreateTask.jsx";
import EditTask from "./pages/Tasks/EditTask.jsx";

function App() {

    return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Tasks />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
