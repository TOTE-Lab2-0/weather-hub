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

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
      resetForm();
      onClose();
    } catch (error) {
      console.error("Auth failed", error);
      setError("Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const loginForm = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-2">
        <p className="text-xs font-semibold tracking-widest text-gray-500 mb-1">
          WELCOME BACK
        </p>
        <h2 className="text-2xl font-black text-gray-900">Log In</h2>
        <p className="text-sm text-gray-500 mt-1">
          Access your saved weather locations.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Email
        <input
          className="rounded-lg border border-gray-300 px-3 py-2"
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Password
        <input
          className="rounded-lg border border-gray-300 px-3 py-2"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {error && <p>{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-[#09b8d4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#09b8d4]/80 disabled:bg-gray-300"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>

      <button
        type="button"
        className="text-sm font-semibold text-[#09b8d4] hover:text-[#09b8d4]/80 cursor-pointer"
        onClick={() => {
          resetForm();
          setMode("signup");
        }}
      >
        Need an account?
      </button>
    </form>
  );

  const signupForm = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-2">
        <p className="text-xs font-semibold tracking-widest text-gray-500 mb-1">
          GET STARTED
        </p>
        <h2 className="text-2xl font-black text-gray-900">Create Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Save your favorite weather locations.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Name
        <input
          className="rounded-lg border border-gray-300 px-3 py-2"
          type="text"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Email
        <input
          className="rounded-lg border border-gray-300 px-3 py-2"
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Password
        <input
          className="rounded-lg border border-gray-300 px-3 py-2"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {error && <p>{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-[#09b8d4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#09b8d4]/80 disabled:bg-gray-300 cursor-pointer"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>

      <button
        type="button"
        className="text-sm font-semibold text-[#09b8d4] hover:text-[#09b8d4]/80 cursor-pointer"
        onClick={() => {
          resetForm();
          setMode("login");
        }}
      >
        Already have an account?
      </button>
    </form>
  );

  if (!isOpen) return null;

  // Modal overlay wraps the full screen
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
      {/* Modal box */}
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-[#09b8d4] w-full max-w-sm"
      >
        <button
          type="button"
          onClick={handleClose}
          className="ml-auto block text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          Cancel
        </button>
        {mode === "login" ? loginForm : signupForm}
      </div>
    </div>
  );
};

export default AuthModal;
