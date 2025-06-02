import React from 'react';
import { Product } from '../types';

interface AdminProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export const AdminProductCard = ({ product, onEdit, onDelete }: AdminProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            ID: {product.id}
          </span>
        </div>
        
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-32 object-cover rounded mb-3"
        />
        
        <div className="space-y-1 mb-4">
          <p className="text-gray-600 line-clamp-2">{product.description}</p>
          <p className="text-green-600 font-medium">Precio: ${product.price}</p>
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            Stock: {product.stock} unidades
          </p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}; 