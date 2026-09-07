import { trust } from "../lib/products";
import { Lock, Return, Support, Truck } from "./icons";
import { Shell } from "./ui";

const ICONS = {
  truck: Truck,
  lock: Lock,
  return: Return,
  support: Support,
} as const;

export default function TrustBar() {
  return (
    <section aria-label="Shipping, payment and returns" className="border-line border-y">
      <Shell>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => {
            const Icon = ICONS[t.icon as keyof typeof ICONS];
            return (
              <li
                key={t.title}
                className="border-line flex items-center gap-3 py-5 pr-4 odd:border-r [&:nth-child(-n+2)]:border-b lg:justify-center lg:border-l lg:px-6 lg:first:border-l-0 lg:odd:border-r-0 lg:[&:nth-child(-n+2)]:border-b-0"
              >
                <Icon className="text-signal size-[22px] shrink-0" />
                <div className="min-w-0">
                  <p className="text-ink truncate text-[13px] leading-tight font-medium">
                    {t.title}
                  </p>
                  <p className="text-ink-soft mt-0.5 truncate text-[11.5px] leading-tight">
                    {t.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}
