'use client';  // Asegúrate de que esta línea esté al inicio del archivo
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Asegúrate de que axios esté instalado
import { useRouter } from 'next/navigation';  // Para redirecciones
import { AdminProductCard } from '@/components/AdminProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://examen3awa.onrender.com';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const apiUrl = `${cleanBaseUrl}${cleanBaseUrl.includes('/api/products') ? '' : '/api/products'}/${id}`;
        
        await axios.delete(apiUrl);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('No se pudo eliminar el producto');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Panel Administrativo</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Productos</h2>
        <button
          onClick={() => router.push('/admin/products/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Crear Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No hay productos registrados</p>
          <button
            onClick={() => router.push('/admin/products/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Crear Primer Producto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <AdminProductCard
              key={product.id}
              product={product}
              onEdit={async () => {
                try {
                  await router.push(`/admin/products/edit/${product.id}`);
                } catch (error) {
                  console.error('Error en redirección:', error);
                }
              }}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 