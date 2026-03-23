import clsx from "clsx";
import { PropsWithChildren } from "react";
import Image from "next/image";

export async function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center bg-slate-12 backdrop-blur-sm pb-0 overflow-hidden rounded-2xl border border-slate-11/20",
        "shadow-[0px_25px_50px_-12px_rgba(0,_0,_0,_0.25)]"
      )}
    >
      <div className="flex flex-col gap-4 flex-1 w-full p-8 pb-4">
        {/* Logo in top-left */}
        <div className="flex items-center self-start">
          <Image
            src="/vendorledger-logo.png"
            alt="VendorLedger Logo"
            width={64}
            height={64}
            className="rounded-lg"
            priority
          />
        </div>
        {/* Centered title */}
        <h2 className="text-xl font-semibold text-slate-1 text-center">VendorLedger</h2>
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-center items-center w-full self-stretch px-8 py-3 text-sm bg-slate-11/10 border-t border-slate-11/20 overflow-hidden">
        <p className="text-xs text-slate-9">
          Follow VendorLedger on{" "}
          <a
            href="https://instagram.com/vendorledger"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-slate-1 hover:text-primary transition-colors"
          >
            Instagram
          </a>
        </p>
      </footer>
    </div>
  );
}
