import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { SignInInput } from "../../types/user";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const signin = async (input: SignInInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
      toast.success("Signed in successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { signin, loading };
};

export default useSignIn;
