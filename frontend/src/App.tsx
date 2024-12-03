import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
