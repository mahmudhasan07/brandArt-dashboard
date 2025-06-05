"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import logo from "@/assests/logo2.jpg";
import Link from "next/link";
import { useForgetPasswordMutation } from "@/Redux/Api/userApi";
import ShowToastify from "@/utils/ShowToastify";
import { useRouter } from "next/navigation";

const ForgetPass = () => {
  const [submit, setSubmit] = useState("Submit");
  const router = useRouter();

  const [forgetFn] = useForgetPasswordMutation();

  const handleForget = async (e: FormEvent<HTMLFormElement>) => {
    setSubmit("loading ...");
    e.preventDefault();
    const email = e.currentTarget.email.value;

    console.log(email);

    const { data, error } = await forgetFn({ email });
    console.log(error);

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
      return;
    }
    setSubmit("Submit");
    ShowToastify({ success: "Please check your email" });
    router.push(`/verify-otp?email=${data?.data?.userId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 ">
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

        <form onSubmit={handleForget}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-2 border bg-[#FCFCFD] border-gray-300 focus:outline-double rounded-md shadow-sm  focus:border-primary"
              placeholder="georgia.young@example.com"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-primary to-primary/90 py-2 text-lg font-semibold text-white rounded-lg">
            {submit}
          </button>
        </form>
        {/* Register Link */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPass;
