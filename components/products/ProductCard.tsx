import { formatCurrency } from '@/src/utils';
import { Product } from '@/src/schemas';
import Image from 'next/image';
import React from 'react';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className='rounded bg-white shadow relative p-5'>
            <div className="relative w-full h-64 mb-4">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/img/${product.image}`}
                    alt={`Imagen de Producto ${product.name}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-3 space-y-2">
                <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                <p className="text-gray-500">Disponibles: {product.inventory}</p>
                <p className="text-2xl font-extrabold text-gray-900">
                    {formatCurrency(product.price)}
                </p>
            </div>
            <button 
                type='button' 
                className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                aria-label="Agregar al carrito"
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
        </div>
    );
}