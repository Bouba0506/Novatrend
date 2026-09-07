# Novatrend — storefront landing page

A single-page e-commerce landing page built with **Next.js 16 (App Router)**,
**React 19** and **Tailwind CSS v4**.

```bash
npm run dev     # http://localhost:4310
npm run build   # production build
npm start       # serve the production build
```

## Design system

Everything is defined as tokens in `app/globals.css` under `@theme`, so
re-skinning the page for a real brand is a one-file change.

| Token | Value | Used for |
| --- | --- | --- |
| `--color-paper` | `#f2f3f5` | page ground (a cool photographic grey, not cream) |
| `--color-surface` | `#ffffff` | cards, product tiles |
| `--color-ink` | `#0c0e14` | headings and body |
| `--color-ink-soft` | `#6a7183` | secondary text |
| `--color-line` | `#e2e4ea` | hairlines and card borders |
| `--color-signal` | `#2a1fe8` | **the single accent** |

`--color-signal` is the only colour on the page. It carries the active nav
link, the primary CTA, badges, star ratings, sale prices, focus rings and the
flash-sale panel — nothing else. Product photography is the only other source
of colour.

**Type** is three roles: `Archivo` 800 for display (`.display`),
`Instrument Sans` for body and UI, and `JetBrains Mono` for anything
machine-true — prices, counts, timers, indices (`.meta`).

## Structure

`app/page.tsx` composes the sections in order:

1. `AnnouncementBar` — three rotating promos
2. `SiteHeader` — sticky, scroll-spy nav, cart badge, mobile drawer
3. `Hero` — annotated photograph (see below)
4. `TrustBar` — shipping, payment, returns, support
5. `Categories` — six tiles, a horizontal snap-scroller on mobile
6. `NewArrivals` — eight product cards
7. `BestSellers` — three feature cards
8. `PromoDuo` — flash sale with a live countdown, plus a seasonal banner
9. `SiteFooter` — reassurance strip, nav columns, newsletter

Content lives in `app/lib/products.ts`. Cart and wishlist state is a small
React context in `app/lib/store.tsx`.

### The hero annotation

The three floating cards are wired to the photograph with leader lines that
land on the actual products in the shot — the sunglasses, the coat and the
glove. Anchor points are percentages of the photo frame
(`callouts[].node` in `app/lib/products.ts`); the line geometry itself is
measured from real DOM rectangles in `Hero.tsx`, so lines stay locked to their
card edges at any viewport width. Below `lg` the annotation is replaced by a
plain scrollable row of the same three products.

If you swap the hero photograph, re-point `node.x` / `node.y` at whatever the
new image actually shows.

## What is real and what is not

Everything works client-side: the promo rotation, scroll-spy, wishlist
toggles, quick-add, the cart badge and running total, the toast, the mobile
drawer and the countdown (which targets 23:59 the coming Sunday and rolls
over weekly).

Not wired to a backend — these are the seams to connect for a real store:

- **Newsletter form** — validates the email and shows a confirmation, but
  sends nothing.
- **Cart** — in-memory only; it resets on reload and there is no checkout.
- **Links** — nav and footer links are in-page anchors; there are no product
  or category routes yet.
- **Search / account** — icon buttons with no panel behind them.

## Placeholder content

Products, prices, ratings, review counts and copy are invented. Photography is
licensed stock from [Unsplash](https://unsplash.com), standing in for a real
catalogue — some of it shows identifiable third-party brands (Nike, Puma,
Ray-Ban), so **replace `public/img/` before this goes anywhere public**. The
footer carries a visible disclosure of this while the placeholders are in use.

## Accessibility

Visible focus rings on `:focus-visible`, `aria-label`/`aria-pressed` on icon
controls, `aria-live` on the announcement bar and cart toast, and a full
`prefers-reduced-motion` opt-out for every animation and scroll behaviour.
