import Image from "next/image";
import { categories } from "../lib/products";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";
import { SectionHead, Shell } from "./ui";

export default function Categories() {
  return (
    <section id="categories" className="scroll-mt-24 py-16 lg:py-24">
      <Shell>
        <SectionHead
          eyebrow="Six categories"
          title="Everything for a day out of the house"
          lede="Each category is deliberately small. We would rather stock one good shell for six years than four for one season."
          action={
            <a
              href="#new-arrivals"
              className="text-ink hover:text-signal group inline-flex items-center gap-2 text-[14px] font-medium transition-colors"
            >
              All 81 products
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          }
        />

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 sm:-mx-7 sm:scroll-pl-7 sm:px-7 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0">
          {categories.map((c, i) => (
            <Reveal
              as="li"
              key={c.slug}
              delay={i * 60}
              className="w-[46%] min-w-[150px] shrink-0 snap-start lg:w-auto lg:min-w-0"
            >
              <a href="#new-arrivals" className="group block">
                <div className="rounded-tile border-line bg-paper-deep relative aspect-[4/5] overflow-hidden border">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 46vw, 15vw"
                    className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="meta bg-surface/90 text-ink-soft absolute top-3 left-3 rounded-full px-2 py-1 text-[9.5px] tabular-nums backdrop-blur-sm">
                    {c.count}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <h3 className="text-ink text-[15px] font-medium">{c.name}</h3>
                  <span className="text-ink-soft group-hover:text-signal text-[12.5px] transition-colors">
                    Browse
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
