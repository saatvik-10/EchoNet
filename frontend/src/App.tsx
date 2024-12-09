import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return;
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!authUser ? <SignIn /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
