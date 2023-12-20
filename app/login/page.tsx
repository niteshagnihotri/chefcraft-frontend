"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { makeRequest } from "@/lib/make-request";
import Link from "next/link";
import { somethingWrong } from "@/utils/errors";
import Image from "next/image";
import TextInputComponent from "@/components/inputs/text-input.component";
import LoadingSpinner from "@/components/buttons/loading-spinner.component";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  //   const loginStore = useStore((state) => state.login);
  const [submit, setSubmit] = React.useState(false);

  const onSubmit = async (data: any) => {
    console.log("post data : ", data);
    setSubmit(true);
    try {
      const res = await makeRequest("POST", "/api/auth/login", data);
      if (res?.data?.token) {
        Cookie.set("access-token", res?.data?.token);
        router.push("/recipes");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      if(error?.response?.data?.error){
        toast.error(error?.response?.data?.error)
      }
      else{
        toast.error(somethingWrong);
      }
    }
    setSubmit(false);
    reset();
  };

  return (
    <div className="grid grid-cols-2 items-center gap-8 min-h-full">
      <Image
        src={"/assets/chef-2.webp"}
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
          <h1 className="text-xl mt-2 font-semibold"> Welcome Back !</h1>
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
            {submit ? <LoadingSpinner /> : "Login"}
          </button>
        </form>
        <div className="w-full flex items-center justify-center gap-1 mt-2 text-xs lg:text-base text-center">
          <p className="text-[#494949]">Don&apos;t have an account?</p>
          <Link href={"/sign-up"}>
            <p className="text-primary hover:text-slate-800 underline">
              Register
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
