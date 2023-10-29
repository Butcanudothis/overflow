import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../../../components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import SignedOutMobileNav from "../../../components/shared/navbar/SIgnedOutMobileNav";

const NavContent = () => {
  return <div className="mt-10 flex flex-col gap-5">helo</div>;
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="more"
          width={20}
          height={20}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            alt="logo"
            width={23}
            height={23}
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
            Re
            <span className="text-primary-500">Stack</span>
          </p>
        </Link>
        <SheetClose asChild>
          <NavContent />
        </SheetClose>
        <SignedOutMobileNav />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
