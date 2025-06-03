'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AdminProductCard } from '@/components/AdminProductCard';
import AuthGuard from '@/components/AuthGuard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartBarIcon, CubeIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, HomeIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  category: string;
}

type TabType = 'dashboard' | 'products';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Datos de ejemplo para las gráficas
const generateChartData = (products: Product[]) => {
  // Gráfica de barras: Productos por categoría
  const categoryData = products.reduce((acc: {[key: string]: number}, product) => {
    const category = product.category || 'Sin categoría';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Gráfica circular: Stock por producto
  const stockData = products.slice(0, 5).map(product => ({
    name: product.name,
    value: product.stock,
    stock: product.stock
  }));

  return {
    categoryData: Object.entries(categoryData).map(([name, value]) => ({
      name,
      value,
      count: value
    })),
    stockData
  };
};

function AdminContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const router = useRouter();
  
  const { categoryData, stockData } = generateChartData(products);
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const categories = [...new Set(products.map(p => p.category))].length;

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
    if (!id) {
      console.error('No se proporcionó un ID de producto válido');
      alert('Error: No se pudo identificar el producto a eliminar');
      return;
    }

    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        // URL directa sin usar variables de entorno para pruebas
        const apiUrl = 'https://examen3awa.onrender.com/api/products';
        
        console.log('Eliminando producto con ID:', id, 'URL:', `${apiUrl}/${id}`);
        
        // Hacer la petición DELETE directamente a la URL completa
        await axios.delete(`${apiUrl}/${id}`);
        
        // Actualizar el estado local eliminando el producto
        setProducts(products.filter(p => p.id !== id));
        alert('Producto eliminado correctamente');
      } catch (error: unknown) {
        console.error('Error al eliminar el producto:', error);
        let errorMessage = 'Error desconocido al eliminar el producto';
        
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        alert(`Error al eliminar el producto: ${errorMessage}`);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div>Cargando...</div></div>;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div>Cargando...</div></div>;

  return (
    <div className="container mx-auto bg-gray-50">
      {/* Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-amber-700">
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-amber-800">
              <h1 className="text-white text-xl font-bold">Tienda Lujosa</h1>
            </div>
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left ${
                    activeTab === 'dashboard' 
                      ? 'bg-amber-800 text-white' 
                      : 'text-amber-100 hover:bg-amber-600 hover:bg-opacity-75'
                  }`}
                >
                  <ChartBarIcon className="mr-3 h-6 w-6" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left ${
                    activeTab === 'products' 
                      ? 'bg-amber-800 text-white' 
                      : 'text-amber-100 hover:bg-amber-600 hover:bg-opacity-75'
                  }`}
                >
                  <CubeIcon className="mr-3 h-6 w-6" />
                  Productos
                </button>
              </nav>
            </div>
            <div className="p-4 border-t border-amber-600">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-amber-100 hover:bg-amber-600 rounded-md"
              >
                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Navigation */}
          <div className="bg-white shadow-sm">
            <div className="px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab === 'dashboard' ? 'Dashboard' : 'Gestión de Productos'}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Admin</span>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {activeTab === 'dashboard' ? (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                          <CubeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Productos Totales
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {totalProducts}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                          <CubeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Stock Total
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {totalStock}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <CubeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Categorías
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {categories}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Productos por Categoría</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" fill="#F59E0B" name="Productos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Stock por Producto</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stockData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="stock"
                            nameKey="name"
                            label={({ name, percent }) => 
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {stockData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">Gestión de Productos</h2>
                  <button
                    onClick={() => router.push('/admin/products/create')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    + Nuevo Producto
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
                    <p className="text-gray-500">No hay productos registrados</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <AdminProductCard
                        key={product.id}
                        product={product}
                        onDelete={handleDelete}
                        onEdit={async () => {
                          try {
                            await router.push(`/admin/products/edit/${product.id}`);
                          } catch (error) {
                            console.error('Error en redirección:', error);
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminContent />
    </AuthGuard>
  );
} 