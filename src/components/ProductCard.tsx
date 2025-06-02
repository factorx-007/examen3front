import React from 'react';

import { Product } from '../types';  // Asume que crearemos un tipo para Product

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white p-6">
      <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-green-600 mb-2">Precio: ${product.price}</p>
      <p className="text-md text-gray-500 mb-4">Stock: {product.stock}</p>
      <button
        onClick={() => window.location.href = `https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(product.name)}`}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
      >
        Chatea por WhatsApp
      </button>
    </div>
  );
};

export default ProductCard; 