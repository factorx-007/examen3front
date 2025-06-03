'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';  // Asegúrate de que axios esté instalado
import { Product } from '../../../../../types/index';  // Ajusta la ruta si es necesario, asumiendo que el tipo Product está definido

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : undefined;  // Extrae id y verifica su tipo
  console.log('ID recibido:', id);  // Log para depuración
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://examen3awa.onrender.com';
          const apiUrl = `${baseUrl.endsWith('/api/products') ? baseUrl + `/${id}` : baseUrl + '/api/products/' + id}`;  // Ajuste para evitar duplicaciones y agregar solo lo necesario
          console.log('Intentando fetch a:', apiUrl);  // Log para depuración
          const response = await axios.get(apiUrl);
          setProduct(response.data as Product);
          setError('');
        } catch (err: any) {
          console.error('Error fetching product:', err);
          setError(err.response?.data?.message || 'Error al cargar el producto; verifica el endpoint API y CORS');
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setError('ID de producto no proporcionado');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (product && id) {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://examen3awa.onrender.com';
            // Ensure the URL doesn't have a trailing slash and doesn't contain /api/products already
            const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
            const apiUrl = `${cleanBaseUrl}${cleanBaseUrl.includes('/api/products') ? '' : '/api/products'}/${id}`;
            console.log('Intentando PUT a:', apiUrl);
            const updatedProduct = await axios.put(apiUrl, product);
            alert('Producto actualizado exitosamente');
            router.push('/admin');
          } catch (err) {
            setError('Error al actualizar el producto; verifica CORS y la URL');
          }
        } else {
          setError('No se puede actualizar: ID o producto no disponible');
        }
      }}>
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            value={product.name || ''}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Descripción</label>
          <textarea
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Precio</label>
          <input
            type="number"
            value={product.price || ''}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            value={product.stock || ''}
            onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">URL de la imagen</label>
          <input
            type="url"
            value={product.image_url || ''}
            onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
            className="border p-2 w-full"
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
          {product.image_url && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
              <img 
                src={product.image_url} 
                alt="Vista previa" 
                className="h-20 w-20 object-cover rounded border"
                onError={(e) => {
                  // Si hay un error al cargar la imagen, mostramos un placeholder
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/100';
                }}
              />
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage; 