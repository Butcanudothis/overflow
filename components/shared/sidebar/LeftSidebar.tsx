"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignedOut, useAuth } from "@clerk/nextjs";

const LeftSideBar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <>
      <div className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;
            if (item.route === "/profile") {
              if (userId) {
                item.route = `/profile/${userId}`;
              } else {
                item.route = "/sign-in";
              }
            }
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  alt="sign-in"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign in
                </span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="small-medium btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="sign-in"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="text-dark500_light500 max-lg:hidden">
                  Sign up
                </span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </>
  );
};

export default LeftSideBar;
