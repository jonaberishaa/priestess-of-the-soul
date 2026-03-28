'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Props {
  product: { id: string; name: string; price: string; image: string };
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className="btn-primary w-full text-center">
      {added ? '✓ U shtua në shportë' : 'Shto në Shportë'}
    </button>
  );
}
