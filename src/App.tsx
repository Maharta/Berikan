import { Routes, Route } from "react-router-dom";
import ContinueRegister from "./pages/auth/ContinueRegister";
import HomePage from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-continue" element={<ContinueRegister />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </main>
  );
}

export default App;
