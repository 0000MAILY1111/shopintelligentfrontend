
import { Product } from '@/src/schemas';
import { formatCurrency } from '@/src/utils';
import Image from 'next/image';
import React from 'react';

export default function ProductCard( {product}: {product: Product} ) {
    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div>
              <Image 
                    ///src = {`${process.env.API_URL}/img/${product.name}`}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/img/${product.image}`}
                    alt = {` Imagen de Producto ${product.image}`}
                    width={400}
                    height={600}
              />
            
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                    <p className="text-gray-500">Disponibles: {product.inventory}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
                </div>
            </div>
            <button type='button' className="absolute top-5 -right-3">
                <div className="absolute bottom-0 left-0 right-0 bg-white p-3 text-center text-gray-600 hover:bg-gray-100">
                    Agregar al carrito
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4m8 0a4 4 0 01-8 0m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2m8-4H6m10-4H6m10-4H6" />
                </svg>
            </button>
        </div>
    )
}