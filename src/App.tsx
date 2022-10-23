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
import { MutatingDots } from "react-loader-spinner";

function App() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user === undefined) {
    // we don't know if user state is loggedIn or logout yet, will know soon with onAuthStateChanged
    return (
      <div className="gradient-background">
        <div className="centered">
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  }

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
        {/*ContinueRegister Already has navigation guards built in, preventing redirect to main after user register*/}
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/register-profile" element={<RegisterProfile />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
