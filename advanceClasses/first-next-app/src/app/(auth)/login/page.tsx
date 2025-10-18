"use client"
import { FormEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, password)
    const res = await fetch("/api/login",
      {
        method: "POST",
        body: JSON.stringify({email, password})
      }
    ).then(res => res.json())

    console.log(res)

    if(!res.success){
      setError(res?.error)
    }
  }


  return (
    <div className="min-h-screen flex flex-col bg-[url('/assets/background.svg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen bg-white/10 backdrop-blur-[0.5px] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  My Journal
                </h2>
                <p className="text-gray-600">Sign in to your account</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 text-gray-900 placeholder-gray-500"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="pass"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="pass"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 text-gray-900 placeholder-gray-500 pr-12"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium text-lg text-white transition-colors hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 bg-[#4A90E2]"
                >
                  Login
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/signup"
                      className="font-medium hover:underline text-[#4A90E2]"
                    >
                      Sign Up
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