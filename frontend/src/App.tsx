import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useAuth } from "./context/AuthContext";

function App() {
  const {authUser, isLoading, setAuthUser} = useAuth();
  console.log(authUser);
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
