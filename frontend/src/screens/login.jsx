import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser,loginCurrentUser } from "../services/user_service";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) return;

    let response = null;
    if (isLogin) {
      response = await loginCurrentUser(email, password);
    } else {
      response = await createNewUser(name, email, password);
    }

    if (response && response.user_id) {
      navigate("/home", { state: { userId: response.user_id } });
    } else {
      console.log("Auth failed");
    }

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-300 shadow-xl rounded-2xl p-6 w-full max-w-md mt-10 mb-10 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-800 mb-2 block">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-black hover:bg-gray-800 px-6 py-2 text-white font-medium transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-500 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
