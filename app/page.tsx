import { InputForm } from "@/components/waitlist-form"
import { WaitlistWrapper } from "@/components/box"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VendorLedger - Fast POS + Inventory for TCG Vendors",
  description: "A fast, honest, and reliable inventory manager and ledger designed for trading card vendors. Join the waitlist for early access.",
}

export default function Home() {
  return (
    <WaitlistWrapper>
      {/* Heading */}
      <div className="space-y-3 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-1 whitespace-pre-wrap text-balance tracking-tight">
          Striking panic into spreadsheets and notebooks!
        </h1>
        <p className="text-slate-9 tracking-tight text-pretty leading-relaxed">
          VendorLedger is a fast inventory manager and ledger designed for TCG vendors. Track your sealed products and slabs, keep a personal calendar for upcoming events, and switch into ShowDay Mode to instantly log sales, buys, and complex trades in real-time.
        </p>
      </div>
      {/* Form */}
      <div className="px-1 flex flex-col w-full self-stretch">
        <InputForm
          formspreeEndpoint="https://formspree.io/f/mkoqlqwk"
          buttonCopy={{
            idle: "Join Waitlist",
            success: "You're in!",
            loading: "Joining...",
          }}
        />
      </div>
    </WaitlistWrapper>
  )
}
