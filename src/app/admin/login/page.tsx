"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login for presentation
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/admin";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sand/20 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 relative">
        {/* Header Section */}
        <div className="bg-charcoal px-8 py-10 text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
          <Link href="/" className="inline-block mb-6">
            <img
              src="/images/srilns_logo_white.png"
              alt="SriLNS Bakti Seva"
              className="h-12 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="font-heading text-2xl text-ivory mb-2">Admin Portal</h1>
          <p className="text-ivory/60 text-sm font-light">Enter your credentials to access the dashboard</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-near-black/30" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-near-black/10 rounded-md text-charcoal bg-sand/10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors sm:text-sm"
                  placeholder="admin@baktiseva.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold tracking-widest uppercase text-near-black/60">
                  Password
                </label>
                <a href="#" className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-near-black/30" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-near-black/10 rounded-md text-charcoal bg-sand/10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 group transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <>
                  Secure Login
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-near-black/10 text-center">
            <p className="text-xs text-near-black/40">
              This is a restricted access portal. Unauthorized entry is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
