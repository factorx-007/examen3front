'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckIcon, StarIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

const team = [
  {
    name: 'María Rodríguez',
    role: 'Fundadora & CEO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    bio: 'Apasionada por la moda y el lujo, María fundó VendeChamito con la visión de ofrecer productos exclusivos de la más alta calidad.'
  },
  {
    name: 'Carlos Méndez',
    role: 'Director de Compras',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    bio: 'Con más de 15 años de experiencia en la industria del lujo, Carlos selecciona cuidadosamente cada pieza de nuestra colección.'
  },
  {
    name: 'Ana Torres',
    role: 'Diseñadora Principal',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    bio: 'Creativa visionaria, Ana se encarga de que cada diseño cumpla con los más altos estándares de elegancia y exclusividad.'
  },
];

const stats = [
  { label: 'Años de experiencia', value: '12+' },
  { label: 'Clientes satisfechos', value: '10,000+' },
  { label: 'Productos exclusivos', value: '500+' },
  { label: 'Países de envío', value: '15+' },
];

const values = [
  {
    name: 'Excelencia',
    description: 'Buscamos la perfección en cada detalle y en cada interacción con nuestros clientes.',
    icon: StarIcon,
  },
  {
    name: 'Autenticidad',
    description: 'Garantizamos la autenticidad de cada producto que ofrecemos en nuestro catálogo.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Exclusividad',
    description: 'Seleccionamos cuidadosamente piezas únicas y limitadas para ofrecer lo mejor del lujo.',
    icon: SparklesIcon,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white container mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800 opacity-90"></div>
          <Image
            src="https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
            alt="Fondo de lujo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Nuestra Historia
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-amber-100">
              Más de una década de excelencia en la comercialización de productos exclusivos de lujo.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Nuestra Historia */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 lg:mb-0"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Más que una tienda, una experiencia de lujo
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Fundada en 2010, VendeChamito nació con el propósito de ofrecer productos exclusivos de la más alta calidad a clientes exigentes que buscan lo mejor en moda y accesorios de lujo.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Lo que comenzó como una pequeña boutique en el corazón de la ciudad, hoy se ha convertido en un referente de elegancia y buen gusto, con presencia en línea que llega a clientes en más de 15 países.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <p className="text-4xl font-extrabold text-amber-600">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Nuestra tienda"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Nuestros Valores */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestros Valores
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Principios que guían cada decisión que tomamos
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {values.map((value, idx) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600">
                  <value.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{value.name}</h3>
                <p className="mt-3 text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Nuestro Equipo */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Conoce a nuestro equipo
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Apasionados por ofrecerte lo mejor en moda y accesorios de lujo
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {team.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden shadow-xl">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{person.name}</h3>
                <p className="text-amber-600">{person.role}</p>
                <p className="mt-3 text-gray-600">{person.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-amber-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              <span className="block">¿Listo para experimentar el lujo?</span>
              <span className="block text-amber-600">Descubre nuestra colección exclusiva</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explora nuestra selección de productos de lujo y encuentra esa pieza única que estás buscando.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-8 lg:mt-0 lg:ml-8"
          >
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
            >
              Ver Colección
              <svg
                className="ml-3 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
