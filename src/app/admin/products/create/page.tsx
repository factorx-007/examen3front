'use client';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/ProductForm';
import axios from 'axios';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());

    try {
      await axios.post('/api/products', productData);
      router.push('/admin');
      router.refresh();
    } catch (error) {
      alert('Error al crear el producto');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
      <p className="text-gray-600 mb-6">Llena el formulario - - La URL puede ser cualquier cosa sera obtenida automáticamente una imagen desde una API externa.</p>
      <ProductForm 
        product={null} 
        onSubmit={handleSubmit} 
        onCancel={() => router.push('/admin')}
      />
    </div>
  );
} 