'use client';
import { useWishlist } from '@/context/WishlistContext';

interface Props {
  product: { id: string; name: string; price: string; image: string };
  className?: string;
  showLabel?: boolean;
}

export default function WishlistButton({ product, className = '', showLabel = false }: Props) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <button
      onClick={(e) => { e.preventDefault(); toggle(product); }}
      aria-label={wishlisted ? 'Hiq nga wishlist' : 'Shto në wishlist'}
      className={`flex items-center justify-center gap-2 transition-colors ${className}`}
    >
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill={wishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {showLabel && (
        <span className="text-xs tracking-[0.2em] uppercase">
          {wishlisted ? 'Në Wishlist ✓' : 'Shto në Wishlist'}
        </span>
      )}
    </button>
  );
}
