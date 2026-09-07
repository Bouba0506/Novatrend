import type { ReactNode } from "react";
import { Star } from "./icons";

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[86rem] px-5 sm:px-7 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Rating({
  value,
  reviews,
  size = "sm",
}: {
  value: number;
  reviews: number;
  size?: "sm" | "md";
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="text-signal flex items-center gap-[2px]"
        aria-label={`Rated ${value} out of 5`}
      >
        {stars.map((s) => {
          const filled = value >= s;
          const half = !filled && value > s - 1;
          return (
            <Star
              key={s}
              half={half}
              className={`${size === "md" ? "size-3.5" : "size-3"} ${
                filled || half ? "" : "opacity-[0.22]"
              }`}
            />
          );
        })}
      </div>
      <span
        className={`text-ink-soft font-mono ${size === "md" ? "text-xs" : "text-[11px]"} tabular-nums`}
      >
        {value.toFixed(1)}
        <span className="text-line-strong mx-1">/</span>
        {reviews}
      </span>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="meta text-signal flex items-center gap-2">
      <span className="bg-signal inline-block h-px w-6" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.25rem)]">{title}</h2>
        {lede && <p className="text-ink-soft mt-3 max-w-lg text-[15px] leading-relaxed">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  tone = "signal",
}: {
  children: ReactNode;
  tone?: "signal" | "ink";
}) {
  return (
    <span
      className={`meta inline-flex items-center rounded-full px-2.5 py-1 leading-none ${
        tone === "signal" ? "bg-signal text-white" : "bg-ink text-white"
      }`}
    >
      {children}
    </span>
  );
}
