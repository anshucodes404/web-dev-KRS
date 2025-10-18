"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export interface signUpUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const [user, setUser] = useState<signUpUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>("")


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user)
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(user)
      }).then(res => res.json())

      console.log(res)
      if(!res.success){
        setError(res?.error)
        setUser(prev => ({...prev, email: ""}))
      }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen bg-white/10 backdrop-blur-[0.5px] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">Sign up for a new account</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={user?.name}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    value={user?.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      id="password"
                      value={user?.password}
                      onChange={(e) => handleChange(e)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 text-gray-900 placeholder-gray-500 pr-12"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                      {showPassword ? (
                        <FaRegEye
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      id="confirm-password"
                      value={user?.confirmPassword}
                      onChange={(e) => handleChange(e)}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 text-gray-900 placeholder-gray-500 pr-12"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                      {showConfirmPassword ? (
                        <FaRegEye
                          onClick={() => {
                            setShowConfirmPassword(false);
                          }}
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => {
                            setShowConfirmPassword(true);
                          }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium text-lg text-white transition-colors hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 bg-[#4A90E2]"
                >
                  Create Account
                </button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-medium hover:underline text-[#4A90E2]"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
