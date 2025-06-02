import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} VendeChamito. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 