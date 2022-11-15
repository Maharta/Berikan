import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { RootState } from "./store/store";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { lazy, Suspense } from "react";
import AuthRouteWrapper from "./layout/AuthRouteWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetailPage from "./pages/main/ProductDetailPage";

const HomePage = lazy(() => import("./pages/auth/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const RegisterContinuePage = lazy(
  () => import("./pages/auth/RegisterContinuePage")
);
const RegisterProfilePage = lazy(
  () => import("./pages/auth/RegisterProfilePage")
);
const MainPage = lazy(() => import("./pages/main/MainPage"));
const AccountPage = lazy(() => import("./pages/main/AccountPage"));
const AddItemPage = lazy(() => import("./pages/main/AddProductPage"));

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
    <Suspense
      fallback={
        <div className="gradient-background">
          <MutatingDots wrapperClass="centered" />
        </div>
      }>
      <Routes>
        <Route element={<AuthRouteWrapper />}>
          <Route
            element={<ProtectedRoute isAllowed={!user} redirectPath="/" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/register-continue" element={<RegisterContinuePage />} />
        </Route>
        {/*ContinueRegister Already has navigation guards built in, preventing redirect to main after user register*/}
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/register-profile" element={<RegisterProfilePage />} />
          <Route
            path="/"
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
          <Route
            path="/add-item"
            element={
              <Suspense fallback={<MutatingDots wrapperClass="centered" />}>
                <AddItemPage />
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<MutatingDots wrapperClass="centered" />}>
                <ProductDetailPage />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
}

export default App;
