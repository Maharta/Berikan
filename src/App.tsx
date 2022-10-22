import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/PrivateRoute";
import ContinueRegister from "./pages/auth/ContinueRegister";
import HomePage from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterProfile from "./pages/auth/RegisterProfile";
import RegisterPage from "./pages/auth/RegisterPage";
import MainPage from "./pages/main/MainPage";
import { RootState } from "./store/store";
import AccountPage from "./pages/auth/AccountPage";

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("re-render");
  return (
    <main>
      <Routes>
        <Route
          element={<ProtectedRoute isAllowed={!user} redirectPath="/main" />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/register-continue" element={<ContinueRegister />} />
        <Route path="/register-profile" element={<RegisterProfile />} />
        {/*Both already has navigation guards built in, preventing jank when user state re-render*/}
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
