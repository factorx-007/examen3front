'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ShoppingBagIcon, StarIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

const featuredProducts = [
  {
    id: 1,
    name: 'Reloj de Lujo Dorado',
    price: '2,499',
    category: 'Relojes',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    name: 'Collar de Diamantes',
    price: '3,799',
    category: 'Joyas',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Bolso de Cuero Premium',
    price: '1,899',
    category: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
];

const features = [
  {
    name: 'Envío Gratis',
    description: 'En todos los pedidos superiores a $500',
    icon: TruckIcon,
  },
  {
    name: 'Garantía',
    description: '2 años de garantía en todos los productos',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Calidad Premium',
    description: 'Productos seleccionados meticulosamente',
    icon: StarIcon,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800 opacity-75"></div>
          <Image
            src="/hover.jpg"
            alt="Fondo de lujo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Descubre el lujo en cada detalle
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-amber-400">
              Productos exclusivos seleccionados para los más exigentes. Calidad y elegancia en cada pieza.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-amber-900 bg-amber-400 hover:bg-amber-300 shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              >
                Ver Colección
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-transparent border-amber-300 hover:bg-white/10 transition-colors duration-300"
              >
                Conócenos
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Características */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Por qué elegirnos
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              En VendeChamito nos esforzamos por ofrecerte la mejor experiencia de compra.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 mx-auto">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-amber-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              <span className="block">¿Listo para descubrir algo extraordinario?</span>
              <span className="block text-amber-600">Únete a nuestra comunidad exclusiva.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Suscríbete a nuestro boletín y sé el primero en conocer nuestras nuevas colecciones y ofertas especiales.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-8 lg:mt-0 lg:ml-8"
          >
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500 sm:max-w-xs rounded-md"
                placeholder="Ingresa tu correo electrónico"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
                >
                  Suscribirse
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              Nos preocupamos por la protección de tus datos. Lee nuestra{' '}
              <a href="#" className="text-amber-600 font-medium hover:underline">
                Política de Privacidad
              </a>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
