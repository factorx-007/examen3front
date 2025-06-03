'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Colección', href: '/products' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <>
      {/* Barra de contacto superior */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="flex items-center hover:text-amber-200 transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (234) 567-890
            </a>
            <a href="mailto:info@vendechamito.com" className="hidden md:flex items-center hover:text-amber-200 transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@vendechamito.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-amber-200 transition-colors hidden md:block">Seguimiento de pedido</a>
            <span className="hidden md:block">|</span>
            <a href="#" className="flex items-center hover:text-amber-200 transition-colors">
              <UserIcon className="w-4 h-4 mr-1" />
              Mi cuenta
            </a>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/" className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
                VendeChamito
              </Link>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></span>
            </motion.div>

            {/* Menú de escritorio */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`relative group font-medium ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-amber-600 transition-colors duration-300`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Link 
                href="/admin" 
                className="flex items-center space-x-1 text-sm font-medium px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              >
                <LockClosedIcon className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <button className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors">
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
              </button>
            </div>

            {/* Botón menú móvil */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-amber-600 focus:outline-none`}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LockClosedIcon className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Espacio para el navbar fijo */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;