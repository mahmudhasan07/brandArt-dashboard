"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import logo from "@/assests/logo2.jpg";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useResetPassMutation } from "@/Redux/Api/userApi";
import { useRouter, useSearchParams } from "next/navigation";
import ShowToastify from "@/utils/ShowToastify";

const ResetPass = () => {
  const searchParams = useSearchParams();
  const [submit, setSubmit] = useState("Submit");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");
  const [error, setError] = useState("");
  const [passwordFn] = useResetPassMutation();
  const router = useRouter();

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit("Loading ...");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSubmit("Submit");
      return;
    }

    // Continue with submission
    setError("");
    console.log("Password reset submitted!");

    const { error } = await passwordFn({ newPassword: password });
    if (
      error &&
      typeof error === "object" &&
      !Array.isArray(error) &&
      error !== null &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data
    ) {
      ShowToastify({ error: (error.data as any).message });
      setSubmit("Submit");
      return;
    }

    ShowToastify({ success: "Password reset successfully" });
    setSubmit("Submit");
    setPassword("");
    setConfirmPassword("");
    setShowPass("password");
    setShowConfirmPass("password");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-6">
          <Image src={logo} alt="logo" className="mx-auto" width={150} />
        </div>

        <h2 className="text-4xl text-center my-4">Hi, Welcome Back! 👋</h2>
        <p className="text-center text-gray-600 mb-8">
          If you don't have an account,{" "}
          <Link
            href={"/register"}
            className="font-semibold text-primary text-lg"
          >
            Register Here
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-base font-medium text-gray-700">
              Enter Password
            </label>
            <input
              type={showPass}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border bg-[#FCFCFD] border-gray-300 focus:outline-double rounded-md shadow-sm focus:border-primary"
              placeholder="123456"
            />
            <div className="absolute top-10 text-xl right-3 cursor-pointer">
              {showPass === "password" ? (
                <IoEyeSharp
                  className="cursor-pointer"
                  onClick={() =>
                    setShowPass(showPass === "password" ? "text" : "password")
                  }
                />
              ) : (
                <FaEyeSlash
                  className="cursor-pointer"
                  onClick={() =>
                    setShowPass(showPass === "password" ? "text" : "password")
                  }
                />
              )}
            </div>
          </div>

          <div className="mb-2 relative">
            <label className="block text-base font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPass}
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border bg-[#FCFCFD] border-gray-300 focus:outline-double rounded-md shadow-sm focus:border-primary"
              placeholder="123456"
            />
            <div className="absolute top-10 text-xl right-3 cursor-pointer">
              {showConfirmPass === "password" ? (
                <IoEyeSharp
                  className="cursor-pointer"
                  onClick={() =>
                    setShowConfirmPass(
                      showPass === "password" ? "text" : "password"
                    )
                  }
                />
              ) : (
                <FaEyeSlash
                  className="cursor-pointer"
                  onClick={() =>
                    setShowConfirmPass(
                      showPass === "password" ? "text" : "password"
                    )
                  }
                />
              )}
            </div>
            {error && (
              <span className="text-sm text-red-600 mt-1 block">{error}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary/90 py-2 text-lg font-semibold text-white rounded-lg mt-4"
            disabled={Boolean(error)}
          >
            {submit}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPass;
