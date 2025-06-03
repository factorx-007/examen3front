import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, ArrowRightIcon, CheckIcon, XMarkIcon, InformationCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const ProductCard = ({ product }: { product: Product }) => {
  const handleWhatsAppClick = () => {
    const message = `¡Hola! Estoy interesado en el producto: ${product.name} - ${window.location.origin}/productos/${product.id}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative group">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img 
            src={product.image_url || 'https://via.placeholder.com/400x400?text=Sin+imagen'} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
            }}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Agotado
              </span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <motion.div 
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.stock > 10 ? 'bg-green-100 text-green-800' : 
              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {product.stock > 10 ? 'Disponible' : product.stock > 0 ? 'Últimas unidades' : 'Agotado'}
          </motion.div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <div className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <ShoppingBagIcon className="w-3.5 h-3.5 mr-1" />
            {product.id}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-12">
          {product.description || 'Sin descripción disponible'}
        </p>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-2xl font-bold text-green-600">
              ${parseFloat(product.price).toFixed(2)}
            </p>
            <p className={`text-sm flex items-center ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <InformationCircleIcon className="w-4 h-4 mr-1" />
              {product.stock > 0 ? `Disponible (${product.stock})` : 'Sin stock'}
            </p>
          </div>
        </div>

        <motion.button
          onClick={handleWhatsAppClick}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
            product.stock > 0 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={product.stock > 0 ? { scale: 1.02 } : {}}
          whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
        >
          {product.stock > 0 ? (
            <>
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Consultar por WhatsApp
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              <XMarkIcon className="w-5 h-5 mr-2" />
              No disponible
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;