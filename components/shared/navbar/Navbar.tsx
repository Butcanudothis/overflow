import React from "react";
import Link from "next/link";
import Image from "next/image";
import SignedStatus from "@/components/shared/navbar/SignedStatus";
import Theme from "@/components/shared/navbar/Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-5 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="logo"
          width={23}
          height={23}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Re
          <span className="text-primary-500">Stack</span>
        </p>
      </Link>
      Global Search
      <div className="flex-between gap-5">
        <Theme />
        <SignedStatus />
      </div>
    </nav>
  );
};

export default Navbar;
