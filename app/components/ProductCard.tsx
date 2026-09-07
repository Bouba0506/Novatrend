"use client";

import Image from "next/image";
import { currency, discountPct, type Product } from "../lib/products";
import { useStore } from "../lib/store";
import { Heart, Plus } from "./icons";
import { Rating } from "./ui";

export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw",
}: {
  product: Product;
  sizes?: string;
}) {
  const { addToCart, wishlist, toggleWish } = useStore();
  const off = discountPct(product);
  const saved = wishlist.has(product.id);

  return (
    <article className="group flex h-full flex-col">
      <div className="rounded-card border-line bg-surface relative aspect-square overflow-hidden border transition-shadow duration-300 group-hover:shadow-[var(--shadow-lift)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]"
        />

        {/* Badge — one per card, never two */}
        {off > 0 ? (
          <span className="meta bg-signal absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9.5px] leading-none text-white tabular-nums">
            −{off}%
          </span>
        ) : product.isNew ? (
          <span className="meta bg-ink absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9.5px] leading-none text-white">
            New
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWish(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`bg-surface/85 absolute top-2.5 right-2.5 grid size-9 place-items-center rounded-full backdrop-blur-sm transition-colors ${
            saved ? "text-signal" : "text-ink-2 hover:text-ink"
          }`}
        >
          <Heart className="size-[17px]" filled={saved} />
        </button>
      </div>

      <div className="mt-3.5 flex flex-1 flex-col">
        <p className="meta text-ink-soft text-[9.5px]">{product.category}</p>
        <h3 className="text-ink mt-1.5 text-[14.5px] leading-snug font-medium">{product.name}</h3>
        <div className="mt-1.5">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className={`text-[15px] ${off > 0 ? "text-signal" : "text-ink"}`}>
              {currency(product.price)}
            </span>
            {product.wasPrice && (
              <span className="text-ink-soft text-[12px] line-through">
                {currency(product.wasPrice)}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={() => addToCart(product.id, product.name, product.price)}
            aria-label={`Add ${product.name} to cart`}
            className="border-line-strong text-ink hover:border-signal hover:bg-signal grid size-9 shrink-0 place-items-center rounded-full border transition-colors hover:text-white"
          >
            <Plus className="size-[18px]" />
          </button>
        </div>
      </div>
    </article>
  );
}

/** Larger feature card used in Best sellers. */
export function FeatureCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWish } = useStore();
  const saved = wishlist.has(product.id);

  return (
    <article className="group rounded-tile border-line bg-surface flex h-full flex-col overflow-hidden border transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      <div className="bg-paper-deep relative aspect-[5/6] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 32vw"
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
        />
        <span className="meta bg-signal absolute top-4 left-4 rounded-full px-2.5 py-1 text-[9.5px] leading-none text-white">
          Bestseller
        </span>
        <button
          type="button"
          onClick={() => toggleWish(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`bg-surface/85 absolute top-3.5 right-3.5 grid size-9 place-items-center rounded-full backdrop-blur-sm transition-colors ${
            saved ? "text-signal" : "text-ink-2 hover:text-ink"
          }`}
        >
          <Heart className="size-[17px]" filled={saved} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-[19px] tracking-[-0.02em]">{product.name}</h3>
          <p className="text-ink shrink-0 font-mono text-[15px] tabular-nums">
            {currency(product.price)}
          </p>
        </div>
        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} size="md" />
        </div>
        <p className="text-ink-soft mt-3 flex-1 text-[13.5px] leading-relaxed">{product.blurb}</p>

        <button
          type="button"
          onClick={() => addToCart(product.id, product.name, product.price)}
          className="border-line-strong text-ink hover:border-signal hover:bg-signal mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border text-[14px] font-medium transition-colors hover:text-white"
        >
          Quick add
        </button>
      </div>
    </article>
  );
}
