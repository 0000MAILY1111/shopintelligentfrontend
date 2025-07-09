"use client";

import { Product } from "@/src/schemas";
import { useStore } from "@/src/store";

export default function AddProductButton({product}: {product: Product}) {

    const addToCart = useStore((state) => state.addToCart);
    
  return (
     <button 
                type='button' 
                className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                aria-label="Agregar al carrito"
                onClick={() => addToCart(product)}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M12 4.5v15m7.5-7.5h-15" 
                    />
                </svg>
            </button>
  );
}