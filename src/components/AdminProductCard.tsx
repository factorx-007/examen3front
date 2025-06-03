import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, ShoppingBagIcon, TagIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

interface AdminProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

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
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const AdminProductCard = ({ product, onEdit, onDelete }: AdminProductCardProps) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative group">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
          <img 
            src={product.image_url || 'https://via.placeholder.com/300x200?text=Sin+imagen'} 
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
            }}
          />
        </div>
        
        <div className="absolute top-2 right-2 flex space-x-2">
          <motion.button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-2 bg-yellow-400 bg-opacity-90 text-white rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <PencilIcon className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
            className="p-2 bg-red-500 bg-opacity-90 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 truncate pr-2">{product.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium flex items-center whitespace-nowrap">
            <TagIcon className="w-3 h-3 mr-1" /> ID: {product.id}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-12">
          {product.description || 'Sin descripción'}
        </p>
        
        <div className="space-y-2 mb-5">
          <div className="flex items-center text-green-600 font-semibold">
            <ShoppingBagIcon className="w-4 h-4 mr-1.5" />
            ${parseFloat(product.price).toFixed(2)}
          </div>
          <div className={`flex items-center text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <InformationCircleIcon className="w-4 h-4 mr-1.5" />
            {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Última actualización: {new Date().toLocaleDateString()}
          </span>
          <motion.button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Gestionar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};