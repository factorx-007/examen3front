import React from 'react';
import { Product } from '../types';

interface ProductFormProps {
  product: Product | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-black">
      <h2 className="text-xl font-semibold mb-4">
        {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            required
            className="border p-3 rounded w-full"
            defaultValue={product?.name || ''}
          />
          <input
            type="text"
            placeholder="Precio"
            name="price"
            required
            className="border p-3 rounded w-full"
            defaultValue={product?.price || ''}
          />
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            required
            className="border p-3 rounded w-full"
            defaultValue={product?.description || ''}
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            required
            className="border p-3 rounded w-full"
            defaultValue={product?.stock || ''}
          />
          <input
            type="text"
            placeholder="URL de imagen"
            name="image_url"
            required
            className="border p-3 rounded w-full"
            defaultValue={product?.image_url || ''}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {product ? 'Actualizar' : 'Crear'} Producto
          </button>
        </div>
      </form>
    </div>
  );
}; 