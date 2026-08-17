import { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import ApiError from "../ui/ApiError";

export default function AuthModal({ mode, onModeChange, onClose, onSubmit, loading, error }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  useEffect(() => setForm({ fullName: "", email: "", password: "" }), [mode]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 text-muted transition hover:text-sand" aria-label="Close authentication dialog"><X size={18} /></button>
        <p className="eyebrow">Welcome to Trippoma</p>
        <h2 id="auth-title" className="mt-3 font-display text-4xl text-sand">{mode === "login" ? "Log in" : "Create an account"}</h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{mode === "login" ? "Pick up where your next journey begins." : "Save places and build your own Oman shortlist."}</p>
        {error && <div className="mt-5"><ApiError message={error} /></div>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "register" && <label className="block text-sm text-muted">Full name<input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} required maxLength={150} autoComplete="name" className="mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-sand outline-none transition focus:border-gold" /></label>}
          <label className="block text-sm text-muted">Email<input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required autoComplete="email" className="mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-sand outline-none transition focus:border-gold" /></label>
          <label className="block text-sm text-muted">Password<input type="password" value={form.password} onChange={(event) => update("password", event.target.value)} required minLength={mode === "register" ? 6 : undefined} autoComplete={mode === "login" ? "current-password" : "new-password"} className="mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-sand outline-none transition focus:border-gold" /></label>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-clay px-4 py-3 text-sm font-medium text-sand transition hover:bg-gold hover:text-night disabled:cursor-not-allowed disabled:opacity-60">{loading && <LoaderCircle size={16} className="animate-spin" />}{mode === "login" ? "Log in" : "Create account"}</button>
        </form>
        <button type="button" onClick={() => onModeChange(mode === "login" ? "register" : "login")} className="mt-5 w-full text-center text-xs text-muted transition hover:text-gold">{mode === "login" ? "No account? Create one" : "Already have an account? Log in"}</button>
      </div>
    </div>
  );
}
