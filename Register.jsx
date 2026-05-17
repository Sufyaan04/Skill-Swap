import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) return setError("Please fill in all fields.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true); setError("");
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">

        <div className="overflow-hidden rounded-2xl shadow-xl border border-border bg-background flex flex-col md:flex-row">

          {/* Left — Visual Panel */}
          <div className="relative hidden md:flex flex-1 flex-col justify-between bg-zinc-900 p-10 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px"
              }}
            />
            <div className="relative z-10">
              <div className="text-4xl font-bold leading-tight tracking-tight">
                Start your<br />
                <span className="text-emerald-400">skill journey.</span>
              </div>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xs">
                Join hundreds of people already swapping skills. Teach what you know, learn what you don't.
              </p>
            </div>

            {/* Steps */}
            <div className="relative z-10 flex flex-col gap-4 my-6">
              {[
                { step: "01", text: "List your skills" },
                { step: "02", text: "Find a match" },
                { step: "03", text: "Start swapping" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 w-6">{s.step}</span>
                  <span className="text-sm text-zinc-300">{s.text}</span>
                </div>
              ))}
            </div>

            <div className="relative z-10">
              <div className="text-xs text-zinc-500">Completely free. No credit card required.</div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex flex-col gap-6 p-8 md:p-10 flex-1">
            <div className="flex flex-col gap-2">
              <Link to="/" className="flex items-center gap-2 self-start font-semibold text-foreground no-underline">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
                  ⇄
                </div>
                SkillSwap
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
              <p className="text-sm text-muted-foreground">Join the skill exchange community</p>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none">Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : "Create Account"}
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4 hover:text-primary font-medium">
                Sign in
              </Link>
            </p>
          </div>

        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link to="/" className="underline underline-offset-4 hover:text-primary">Terms</Link>
          {" "}and{" "}
          <Link to="/" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
        </p>

      </div>
    </div>
  );
};

export default Register;