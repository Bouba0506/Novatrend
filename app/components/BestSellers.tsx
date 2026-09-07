import { bestSellers } from "../lib/products";
import { FeatureCard } from "./ProductCard";
import Reveal from "./Reveal";
import { SectionHead, Shell } from "./ui";

export default function BestSellers() {
  return (
    <section id="best-sellers" className="scroll-mt-24 py-16 lg:py-24">
      <Shell>
        <SectionHead
          eyebrow="Reordered most often"
          title="Best sellers"
          lede="The three things customers come back for — and the three we have never had to redesign."
        />

        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {bestSellers.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 90} className="h-full">
              <FeatureCard product={p} />
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
