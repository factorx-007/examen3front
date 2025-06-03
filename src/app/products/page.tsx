'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { SparklesIcon, ShieldCheckIcon, StarIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { Product } from '../../types';

// Carga dinámica del componente ProductCard para mejor rendimiento
const ProductCard = dynamic(() => import('../../components/ProductCard'), {
  loading: () => (
    <div className="h-96 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
  ),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        // Ordenar por precio (de mayor a menor) para destacar productos premium
        const sortedProducts = response.data.sort((a: Product, b: Product) => 
          parseFloat(b.price) - parseFloat(a.price)
        );
        setProducts(sortedProducts);
      } catch (err) {
        setError('Error al cargar nuestra colección exclusiva. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-96 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse"></div>
      ))}
    </div>
  );

  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-center"
    >
      <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/30 text-red-100 px-6 py-8 rounded-2xl max-w-md w-full">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">¡Error de Conexión!</h2>
        <p className="text-red-200 mb-6">{error}</p>
        <motion.button
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center mx-auto"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          Reintentar
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <SparklesIcon className="w-5 h-5 text-amber-400 mr-2" />
            <span className="text-sm font-medium text-amber-200">Colección Exclusiva 2025</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100"
          >
            Descubre el Lujo en Cada Detalle
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Piezas exclusivas seleccionadas meticulosamente para los más exigentes. 
            Calidad y elegancia en cada producto.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <ShieldCheckIcon className="w-5 h-5 text-green-400 mr-2" />
              Garantía de autenticidad
            </div>
            <div className="flex items-center text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <StarIcon className="w-5 h-5 text-amber-400 mr-2" />
              Productos exclusivos
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Nuestra Colección Exclusiva
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Descubre piezas únicas que combinan artesanía excepcional con diseño innovador.
          </motion.p>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : products.length > 0 ? (
          <motion.div 
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: 0.1 * index }}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl inline-block">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Colección en Construcción</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Estamos preparando algo extraordinario para ti. Próximamente nuevos productos exclusivos.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">¿Buscas algo especial?</h3>
            <p className="text-lg text-amber-100 mb-8 max-w-3xl mx-auto">
              Nuestros asesores están listos para ayudarte a encontrar la pieza perfecta que se adapte a tu estilo y necesidades.
            </p>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-amber-900 font-bold rounded-full hover:bg-amber-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.964-.941 1.162-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.795-1.484-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.136-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.624.73.226 1.393.195 1.92.118.57-.085 1.758-.719 2.005-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.346z"/>
                </svg>
                Consulta por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;