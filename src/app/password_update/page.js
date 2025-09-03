"use client";

import { useEffect, useMemo, useState } from "react";

export default function PasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    pwd: "",
    confirmPwd: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // "success" | "error" | ""
  const [show, setShow] = useState({
    current: false,
    newPwd: false,
    confirm: false,
  });

  // Basic password strength heuristic (client-side)
  const strength = useMemo(() => {
    const p = form.pwd;
    if (!p) return { score: 0, label: "Empty" };
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[a-z]/.test(p)) score += 1;
    if (/\d/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
    return { score, label: labels[score] || "Very weak" };
  }, [form.pwd]);

  const canSubmit =
    form.currentPassword &&
    form.pwd &&
    form.confirmPwd &&
    form.pwd === form.confirmPwd &&
    form.pwd !== form.currentPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validations mirroring PHP
    if (!form.currentPassword || !form.pwd || !form.confirmPwd) {
      setStatus({ type: "error", message: "All fields are required." });
      return;
    }
    if (form.pwd !== form.confirmPwd) {
      setStatus({ type: "error", message: "Passwords must match." });
      return;
    }
    if (form.currentPassword === form.pwd) {
      setStatus({
        type: "error",
        message: "New password should be different from current password.",
      });
      return;
    }

    try {
      setSubmitting(true);
      // 🔒 Replace with your real API route that verifies current password and updates it
      // Example: POST /api/account/password { currentPassword, pwd }
      const res = await fakeUpdatePassword(form); // <-- replace with real fetch
      if (!res.ok) {
        setStatus({ type: "error", message: res.message || "Update failed." });
        return;
      }
      setStatus({ type: "success", message: "Password updated successfully!" });
      setForm({ currentPassword: "", pwd: "", confirmPwd: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-white text-gray-900">
      {/* Topbar (simple) */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-center text-xl font-semibold text-primary">
            Password
          </h1>
          <p className="text-center text-sm text-gray-500">
            Update your profile password
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Status banner (ARIA live) */}
        <div aria-live="polite" className="mb-4 min-h-[1.5rem]">
          {status.type === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <div className="flex items-center gap-2">
                <span aria-hidden>⚠️</span>
                <span>{status.message}</span>
              </div>
            </div>
          )}
          {status.type === "success" && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <span aria-hidden>✅</span>
                <span>{status.message}</span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          noValidate
        >
          {/* Current password */}
          <FormField
            label="Current password"
            htmlFor="currentPassword"
            input={
              <PasswordInput
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter your current password"
                value={form.currentPassword}
                onChange={handleChange}
                show={show.current}
                onToggle={() =>
                  setShow((s) => ({ ...s, current: !s.current }))
                }
                required
                autoComplete="current-password"
              />
            }
          />

          {/* New password */}
          <FormField
            className="mt-4"
            label="New password"
            htmlFor="pwd"
            hint={
              <ul className="ml-5 list-disc text-xs text-gray-500">
                <li>Use at least 8 characters</li>
                <li>Mix upper & lower case, numbers, symbols</li>
                <li>Must be different from your current password</li>
              </ul>
            }
            input={
              <>
                <PasswordInput
                  id="pwd"
                  name="pwd"
                  placeholder="Enter your new password"
                  value={form.pwd}
                  onChange={handleChange}
                  show={show.newPwd}
                  onToggle={() =>
                    setShow((s) => ({ ...s, newPwd: !s.newPwd }))
                  }
                  required
                  autoComplete="new-password"
                  aria-describedby="pwd-strength"
                />
                {/* Strength meter */}
                <div className="mt-2" id="pwd-strength">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(strength.score / 5) * 100}%`,
                        background:
                          strength.score >= 4
                            ? "rgb(34 197 94)" // green-500
                            : strength.score >= 3
                            ? "rgb(59 130 246)" // blue-500
                            : "rgb(239 68 68)", // red-500
                      }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    Strength: {strength.label}
                  </div>
                </div>
              </>
            }
          />

          {/* Confirm password */}
          <FormField
            className="mt-4"
            label="Confirm password"
            htmlFor="confirmPwd"
            input={
              <PasswordInput
                id="confirmPwd"
                name="confirmPwd"
                placeholder="Confirm password"
                value={form.confirmPwd}
                onChange={handleChange}
                show={show.confirm}
                onToggle={() =>
                  setShow((s) => ({ ...s, confirm: !s.confirm }))
                }
                required
                autoComplete="new-password"
                aria-invalid={
                  form.confirmPwd && form.confirmPwd !== form.pwd
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  form.confirmPwd && form.confirmPwd !== form.pwd
                    ? "confirm-error"
                    : undefined
                }
              />
            }
            footer={
              form.confirmPwd && form.confirmPwd !== form.pwd ? (
                <p id="confirm-error" className="mt-2 text-xs text-red-600">
                  Passwords do not match.
                </p>
              ) : null
            }
          />

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-2 text-primary shadow-sm transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ---------- Reusable UI bits (same file, no design system) ---------- */

function FormField({
  label,
  htmlFor,
  input,
  hint,
  footer,
  className = "",
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {hint && <div className="mb-2">{hint}</div>}
      {input}
      {footer}
    </div>
  );
}

function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  ...rest
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 px-4 py-3 shadow-sm outline-none ring-offset-2 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
        {...rest}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

/* ---------- Replace this with real API integration ---------- */
async function fakeUpdatePassword({ currentPassword, pwd }) {
  // Simulate server behavior aligned with your PHP:
  // - validate current password (unknown on client; here we “accept” any non-empty)
  // - ensure new pwd != current
  await new Promise((r) => setTimeout(r, 600));
  if (!currentPassword || !pwd) {
    return { ok: false, message: "All fields required!" };
  }
  if (currentPassword === pwd) {
    return {
      ok: false,
      message: "New password should be different from current password!",
    };
  }
  // On your server: verify MD5($current . SALT) matches, then update to MD5($pwd . SALT)
  return { ok: true };
}
