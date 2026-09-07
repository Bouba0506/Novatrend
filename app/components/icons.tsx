type IconProps = { className?: string };

const S = ({ className = "size-5", children }: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

/* The brand glyph: a four-point burst — the "nova" in Novatrend.
   Reused as the separator in the announcement bar and trust rows. */
export const Nova = ({ className = "size-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 0c.5 6.3 5.7 11.5 12 12-6.3.5-11.5 5.7-12 12-.5-6.3-5.7-11.5-12-12C6.3 11.5 11.5 6.3 12 0Z" />
  </svg>
);

export const Search = (p: IconProps) => (
  <S {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </S>
);

export const Heart = ({ className = "size-5", filled = false }: IconProps & { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 20.5 4.6 13.2a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9a4.6 4.6 0 1 1 6.5 6.5Z" />
  </svg>
);

export const User = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="8.5" r="3.7" />
    <path d="M4.8 20a7.3 7.3 0 0 1 14.4 0" />
  </S>
);

export const Bag = (p: IconProps) => (
  <S {...p}>
    <path d="M5.4 8h13.2l1 12H4.4Z" />
    <path d="M8.7 10.5V6.8a3.3 3.3 0 0 1 6.6 0v3.7" />
  </S>
);

export const Truck = (p: IconProps) => (
  <S {...p}>
    <path d="M2.8 6.5h10.4v9.2H2.8z" />
    <path d="M13.2 9.8h4l3.2 3.1v2.8h-7.2z" />
    <circle cx="7" cy="18" r="1.9" />
    <circle cx="16.8" cy="18" r="1.9" />
  </S>
);

export const Lock = (p: IconProps) => (
  <S {...p}>
    <rect x="4.6" y="10.4" width="14.8" height="9.4" rx="2" />
    <path d="M8.3 10.4V7.8a3.7 3.7 0 0 1 7.4 0v2.6" />
  </S>
);

export const Return = (p: IconProps) => (
  <S {...p}>
    <path d="M4.4 9.6h11.2a4.4 4.4 0 1 1 0 8.8H8.2" />
    <path d="m8 5.4-3.8 4.2L8 13.6" />
  </S>
);

export const Support = (p: IconProps) => (
  <S {...p}>
    <path d="M4.5 14.6v-2.4a7.5 7.5 0 0 1 15 0v2.4" />
    <rect x="2.9" y="13.4" width="4" height="6.2" rx="1.7" />
    <rect x="17.1" y="13.4" width="4" height="6.2" rx="1.7" />
  </S>
);

export const ArrowRight = (p: IconProps) => (
  <S {...p}>
    <path d="M4.5 12h15" />
    <path d="m13.4 5.9 6.1 6.1-6.1 6.1" />
  </S>
);

export const Plus = (p: IconProps) => (
  <S {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </S>
);

export const Check = (p: IconProps) => (
  <S {...p}>
    <path d="m5 12.6 4.6 4.6L19 7.8" />
  </S>
);

export const Menu = (p: IconProps) => (
  <S {...p}>
    <path d="M4 7.5h16M4 12h16M4 16.5h16" />
  </S>
);

export const Close = (p: IconProps) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);

/* Ratings are drawn in the accent, not amber — the page has one colour.
   The half-star gradient is defined once, by StarDefs in the layout. */
export const StarDefs = () => (
  <svg width="0" height="0" aria-hidden="true" className="absolute">
    <defs>
      <linearGradient id="nt-halfstar">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.22" />
      </linearGradient>
    </defs>
  </svg>
);

export const Star = ({ className = "size-3", half = false }: IconProps & { half?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill={half ? "url(#nt-halfstar)" : "currentColor"}
      d="M12 2.4l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.4l1.2-6.5L2.5 9.3l6.6-.9z"
    />
  </svg>
);
