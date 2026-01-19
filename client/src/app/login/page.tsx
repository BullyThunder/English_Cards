"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import { IAuthError } from "@/src/types/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState<Record<string, string[]>>({});
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await authService.login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError<IAuthError>(err)) {
        const serverError = err.response?.data?.errors;
        if (serverError) {
          setFieldError(serverError);
        }
        const commonMessage =
          err.response?.data?.message || "Something went wrong";
        setError(commonMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Заголовок */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Create new Person
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldError({ ...fieldError, email: [] });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldError.password) {
                    setFieldError({ ...fieldError, password: [] });
                  }
                }}
              />
            </div>
          </div>

          {/* Блок ошибки */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md`}
            >
              {isLoading ? "Is logging..." : "Enter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
