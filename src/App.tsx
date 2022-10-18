import { Routes, Route } from "react-router-dom";
import ContinueRegister from "./pages/ContinueRegister";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-continue" element={<ContinueRegister />} />
      </Routes>
    </main>
  );
}

export default App;
