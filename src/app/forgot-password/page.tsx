"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordReset, resetPassword } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [shownDemoCode, setShownDemoCode] = useState<string | null>(null);

  const onRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setInfo(null);
    if (!email.trim()) return setErr("Please enter your email.");
    setBusy(true);
    try {
      const { code, expires } = requestPasswordReset(email.trim().toLowerCase());
      // Demo: show the code on screen (in production, you'd email it)
      setShownDemoCode(code);
      setInfo("A 6-digit reset code has been generated. (Demo: shown below)");
      setStep(2);
    } catch (e: any) {
      setErr(e?.message || "Could not start reset.");
    } finally {
      setBusy(false);
    }
  };

  const onReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setInfo(null);
    if (!code.trim()) return setErr("Please enter the 6-digit code.");
    if (pw.length < 6) return setErr("Password must be at least 6 characters.");
    if (pw !== pw2) return setErr("Passwords do not match.");
    setBusy(true);
    try {
      resetPassword(email.trim().toLowerCase(), code.trim(), pw);
      setInfo("Password updated. Please sign in.");
      setTimeout(() => router.replace("/login"), 900);
    } catch (e: any) {
      setErr(e?.message || "Reset failed. Check your code and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen pt-15 pb-16 bg-brand-cream text-brand-brown px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-gold/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-md relative">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-3 bg-gradient-to-r from-black to-brand-brown bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-600 text-lg">
            {step === 1 ? "Enter your email to get started" : "Enter your reset code and new password"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
              step === 1 ? 'bg-brand-gold text-white shadow-lg' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 transition-all duration-300 ${
              step === 2 ? 'bg-brand-gold' : 'bg-gray-200'
            }`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
              step === 2 ? 'bg-brand-gold text-white shadow-lg' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500">
          {step === 1 ? (
            <form onSubmit={onRequest} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={busy}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ✉️
                  </div>
                </div>
              </div>

              {/* Messages */}
              {err && (
                <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-5 py-4 text-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-500 text-xs">!</span>
                    </div>
                    <span>{err}</span>
                  </div>
                </div>
              )}
              {info && (
                <div className="rounded-2xl border border-green-200 bg-green-50 text-green-700 px-5 py-4 text-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                    <span>{info}</span>
                  </div>
                </div>
              )}

              <button
                disabled={busy}
                className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-3 group active:scale-95"
                type="submit"
              >
                {busy ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending code...</span>
                  </>
                ) : (
                  <>
                    <span>Send reset code</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Remembered it?{" "}
                  <Link href="/login" className="text-brand-gold hover:text-amber-700 font-semibold transition-colors duration-200 hover:underline">
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={onReset} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={busy}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ✉️
                  </div>
                </div>
              </div>

              {/* Demo Code Display */}
              {shownDemoCode && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-center">
                  <div className="text-sm font-semibold text-amber-800 mb-2">Demo Reset Code</div>
                  <div className="text-2xl font-mono font-bold text-brand-gold tracking-widest bg-white/50 py-3 rounded-xl border border-amber-300">
                    {shownDemoCode}
                  </div>
                  <p className="text-xs text-amber-600 mt-2">In production, this would be sent via email</p>
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  6-digit Reset Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 text-center text-black font-mono tracking-widest text-lg"
                    placeholder="123456"
                    maxLength={6}
                    required
                    disabled={busy}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                    type="password"
                    minLength={6}
                    required
                    disabled={busy}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔒
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">Minimum 6 characters required</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                    type="password"
                    minLength={6}
                    required
                    disabled={busy}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔒
                  </div>
                </div>
              </div>

              {/* Messages */}
              {err && (
                <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-5 py-4 text-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-500 text-xs">!</span>
                    </div>
                    <span>{err}</span>
                  </div>
                </div>
              )}
              {info && (
                <div className="rounded-2xl border border-green-200 bg-green-50 text-green-700 px-5 py-4 text-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                    <span>{info}</span>
                  </div>
                </div>
              )}
            <button
            disabled={busy}
            className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-3 group active:scale-95"
            type="submit"
            >
            {busy ? (
                <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Updating password...</span>
                </>
            ) : (
                <>
                <span>Update password</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </>
            )}
            </button>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Wrong email?{" "}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-brand-gold hover:text-amber-700 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Start over
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}