import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-400">
          VendeChamito
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/products" className="hover:text-green-400 transition-colors duration-200">
              Productos
            </Link>
          </li>
          <li>
            <Link href="/admin" className="hover:text-green-400 transition-colors duration-200">
              Admin
            </Link>
          </li>
          {/* Agrega más enlaces si es necesario */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 