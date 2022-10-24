import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { RootState } from "./store/store";
import ProtectedRoute from "./components/PrivateRoute";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/auth/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const RegisterProfile = lazy(() => import("./pages/auth/RegisterProfile"));
const MainPage = lazy(() => import("./pages/main/MainPage"));
const AccountPage = lazy(() => import("./pages/main/AccountPage"));
const ContinueRegister = lazy(() => import("./pages/auth/ContinueRegister"));

function App() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user === undefined) {
    // we don't know if user state is loggedIn or logout yet, will know soon with onAuthStateChanged
    return (
      <div className="gradient-background">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass="centered"
          visible={true}
        />
      </div>
    );
  }

  return (
    <main>
      <Suspense
        fallback={
          <div className="gradient-background">
            <MutatingDots wrapperClass="centered" />
          </div>
        }
      >
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
            <Route
              path="/main"
              element={
                <Suspense fallback={<MutatingDots wrapperClass="centered" />}>
                  <MainPage />
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<MutatingDots wrapperClass="centered" />}>
                  <AccountPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
