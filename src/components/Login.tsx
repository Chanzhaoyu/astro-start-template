import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/login", { method: "POST" });
      if (!res.ok) {
        throw new Error("Login failed");
      }
      window.location.href = "/protected";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="text-white bg-blue-500 py-2 px-4 rounded-md"
      onClick={onLogin}
    >
      {isLoading ? "Loading..." : "Login"}
    </button>
  );
}
