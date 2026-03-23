import { basehub } from "basehub";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { ThemeSwitcher } from "../switch-theme";
import Image from "next/image";

export async function WaitlistWrapper({ children }: PropsWithChildren) {
  const {
    footer: { showThemeSwitcher },
    settings: { forcedTheme },
  } = await basehub().query({
    footer: {
      showThemeSwitcher: true,
    },
    settings: { forcedTheme: true },
  });

  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center bg-slate-1/95 backdrop-blur-sm pb-0 overflow-hidden rounded-2xl border border-slate-5/50",
        "shadow-[0px_25px_50px_-12px_rgba(0,_0,_0,_0.15)]"
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/vendorledger-logo.png"
            alt="VendorLedger Logo"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <span className="text-xl font-semibold text-slate-12">VendorLedger</span>
        </div>
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-slate-3/50 border-t border-slate-5/50 overflow-hidden">
        <p className="text-xs text-slate-10">
          Follow VendorLedger on{" "}
          <a
            href="https://instagram.com/vendorledger"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-slate-12 hover:text-primary transition-colors"
          >
            Instagram
          </a>
        </p>
        {Boolean(showThemeSwitcher && !forcedTheme) ? <ThemeSwitcher /> : null}
      </footer>
    </div>
  );
}
