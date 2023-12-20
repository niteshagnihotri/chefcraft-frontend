"use client";
// import { login } from "@/utils/common-apis";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import useStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image'
import { makeRequest } from "@/lib/make-request";
import TextInputComponent from "@/components/inputs/text-input.component";
import LoadingSpinner from "@/components/buttons/loading-spinner.component";
import { somethingWrong } from "@/utils/errors";
import Gallery from "@/public/assets/chef.png";


export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [submit, setSubmit] = React.useState(false);

  const onSubmit = async (data: any) => {
    console.log("post data : ", data);
    setSubmit(true);
    try {
      const res = await makeRequest("POST", "/api/auth/register", data);
      console.log("register response : ", res?.data);
      if (res?.data) {
        toast.success("Account Created Successfully");
        router.push("/login");
      } else {
        toast.error(somethingWrong);
      }
    } catch (error) {
      console.log(error);
      toast.error(somethingWrong);
    }
    setSubmit(false);
    reset();
  };

  return (
    <div className="grid grid-cols-2 items-center gap-8 min-h-full">
       <Image
          src={Gallery}
          className="w-full"
          width={500}
          height={500}
          alt="login-cover"
        />
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8 text-sm shadow-xl shadow-gray-50 rounded-md"
        >
          <h1 className="text-xl mt-2 font-semibold">Let&apos;s get Started !</h1>
          <TextInputComponent
            type="text"
            name="fullName"
            register={register}
            errors={errors}
            label="Full Name"
            placeholder="full name"
            required={true}
          />
          <TextInputComponent
            type="text"
            name="username"
            register={register}
            errors={errors}
            label="Username"
            placeholder="username"
            required={true}
          />
          <TextInputComponent
            type="password"
            name="password"
            register={register}
            errors={errors}
            label="Password"
            placeholder="password"
            required={true}
          />
          <button
            disabled={submit}
            type="submit"
            className="bg-primary text-white w-full px-4 py-2 rounded-sm shadow-sm"
          >
            {submit ? <LoadingSpinner /> : "Register"}
          </button>
        </form>
        <div className="w-full flex items-center justify-center gap-1 mt-2 text-xs lg:text-base text-center">
          <p className="text-[#494949]">Already have an account?</p>
          <Link href={"/login"}>
            <p className="text-primary hover:text-slate-800 underline">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
