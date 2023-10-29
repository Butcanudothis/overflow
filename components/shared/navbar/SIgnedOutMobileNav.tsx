import React from "react";
import { SignedOut } from "@clerk/nextjs";
import { SheetClose } from "../../../components/ui/sheet";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

const SignedOutMobileNav = () => {
  return (
    <SignedOut>
      <div className="flex flex-col gap-3">
        <SheetClose asChild>
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient">Sign in</span>
            </Button>
          </Link>
        </SheetClose>
      </div>
    </SignedOut>
  );
};

export default SignedOutMobileNav;
