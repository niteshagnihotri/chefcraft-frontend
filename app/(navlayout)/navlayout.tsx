"use client";
import PrimaryBtnComponent from "@/components/buttons/primary-btn.component";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { IoIosLogOut } from "react-icons/io";


const TopNavLayout = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const segments = pathName.split("/");
  const heading = segments[1];
  let cookieExists = !!Cookie.get("access-token");

  const handleLogout = () => {
    Cookie.remove("access-token");
    router.push("/login");
    setIsLogin(false);
  };

  useEffect(() => {
    let cookieExists = !!Cookie.get("access-token");
    setIsLogin(cookieExists);
  }, [cookieExists]);

    return (
      <div className="flex w-full flex-col ">
        <div className="w-full flex justify-between py-7">
          <h1 className="font-semibold text-lg text-red-400">Re<span className="text-gray-500">cipes.com</span></h1>
          {isLogin ? (
            <PrimaryBtnComponent
              type="button"
              text="Logout"
              onClick={handleLogout}
              icon={<IoIosLogOut className="text-xl"/>}
              variant="outline"
              className="rounded-sm px-6 border-slate-600 text-slate-600 shadow-sm  font-medium"
            />
          ) : (
            <PrimaryBtnComponent
              type="button"
              text="Login"
              onClick={() => router.push("/login")}
              variant="outline"
              className="rounded-sm px-8 shadow-sm hover:bg-primary hover:text-white font-medium"
            />
          )}
        </div>

        <div className="w-full ">{children}</div>
      </div>
    );
};

export default TopNavLayout;
