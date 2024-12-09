import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setAuthUser(null);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;