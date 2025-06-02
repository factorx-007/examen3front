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
            const apiUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.endsWith('/') ? process.env.NEXT_PUBLIC_API_URL.slice(0, -1) + `/api/products/${id}` : process.env.NEXT_PUBLIC_API_URL + `/api/products/${id}` : `/api/products/${id}`;
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProductPage; 