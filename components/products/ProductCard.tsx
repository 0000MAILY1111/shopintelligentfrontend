import { formatCurrency } from '@/src/utils';
import { Product } from '@/src/schemas';
import Image from 'next/image';
import React from 'react';
import AddProductButton from './AddProductButton';

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
                    priority
                />
            </div>
            
            <div className="p-3 space-y-2">
                <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                <p className="text-gray-500">Disponibles: {product.inventory}</p>
                <p className="text-2xl font-extrabold text-gray-900">
                    {formatCurrency(product.price)}
                </p>
            </div>
            
            <AddProductButton product={product} />
        </div>
    );
}