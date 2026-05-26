import { useState, type SyntheticEvent } from "react";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthMode = "login" | "signup";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: AuthUser) => void;
  initialMode: AuthMode;
};

const AuthModal = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode,
}: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";

    const requestBody =
      mode === "login" ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      onAuthSuccess(data);
      onClose();
    } catch (error) {
      console.error("Auth failed", error);
      setError("Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const loginForm = (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>

      <label>
        Email
        <input
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </button>

      <button type="button" onClick={() => setMode("signup")}>
        Need an account?
      </button>
    </form>
  );

  const signupForm = (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        Name
        <input
          type="text"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </button>

      <button type="button" onClick={() => setMode("login")}>
        Already have an account?
      </button>
    </form>
  );

  if (!isOpen) return null;

  // Modal overlay wraps the full screen
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      {/* Modal box */}
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        {mode === "login" ? loginForm : signupForm}
      </div>
    </div>
  );
};

export default AuthModal;
