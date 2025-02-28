import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { SignupInput } from "../../types/user";
import { toast } from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const signup = async (input: SignupInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
      toast.success("Signed up successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default useSignUp;
