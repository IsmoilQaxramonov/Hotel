import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../app/store/auth-store";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      let message = "Login xato! Username yoki parol noto‘g‘ri.";

      if (err instanceof Error) {
        message = err.message;
      }

      alert(message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm w-full space-y-5">
      <h1 className="text-4xl font-bold mb-6">Kirish</h1>

      <div>
        <label className="block mb-1 text-sm">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="Username"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2 pr-10"
            placeholder="Password"
            required
          />

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
      >
        {isLoading ? "Yuklanmoqda..." : "Davom etish"}
      </button>
    </form>
  );
};

export default LoginForm;
