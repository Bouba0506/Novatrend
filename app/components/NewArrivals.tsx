import { newArrivals } from "../lib/products";
import { ArrowRight } from "./icons";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { SectionHead, Shell } from "./ui";

export default function NewArrivals() {
  return (
    <section id="new-arrivals" className="bg-surface border-line scroll-mt-24 border-y py-16 lg:py-24">
      <Shell>
        <SectionHead
          eyebrow="Landed this week"
          title="New arrivals"
          lede="Eight pieces added on 2 September. Restocks land on Tuesdays."
          action={
            <a
              href="#best-sellers"
              className="text-ink hover:text-signal group inline-flex items-center gap-2 text-[14px] font-medium transition-colors"
            >
              See everything new
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          }
        />

        <ul className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {newArrivals.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
