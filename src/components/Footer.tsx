'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon
} from './Icons';

const footerLinks = [
  {
    title: 'Colección',
    links: [
      { name: 'Nuevos Ingresos', href: '/products?filter=new' },
      { name: 'Lo más vendido', href: '/products?filter=popular' },
      { name: 'Ofertas especiales', href: '/products?filter=sale' },
      { name: 'Edición limitada', href: '/products?filter=limited' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { name: 'Sobre Nosotros', href: '/about' },
      { name: 'Nuestra Historia', href: '/about#history' },
      { name: 'Trabaja con Nosotros', href: '/careers' },
      { name: 'Sostenibilidad', href: '/sustainability' },
    ],
  },
  {
    title: 'Servicio al Cliente',
    links: [
      { name: 'Contáctanos', href: '/contact' },
      { name: 'Preguntas Frecuentes', href: '/faq' },
      { name: 'Envíos y Devoluciones', href: '/shipping-returns' },
      { name: 'Guía de Tallas', href: '/size-guide' },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Link href="/" className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                VendeChamito
              </Link>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas en productos exclusivos de la más alta calidad. Cada pieza es cuidadosamente seleccionada para ofrecerte lo mejor en diseño y artesanía.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: <FacebookIcon className="w-5 h-5" />, href: '#' },
                { icon: <InstagramIcon className="w-5 h-5" />, href: '#' },
                { icon: <TwitterIcon className="w-5 h-5" />, href: '#' },
                { icon: <LinkedinIcon className="w-5 h-5" />, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#F59E0B' }}
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          {footerLinks.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 * (index + 1) } }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
                {section.title}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-start group"
                    >
                      <span className="w-1 h-1 mt-2 mr-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Información de contacto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Contacto
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-sm">Av. Principal 1234, Distrito Exclusivo<br />Lima, Perú</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm hover:text-amber-400 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@vendechamito.com" className="text-sm hover:text-amber-400 transition-colors">info@vendechamito.com</a>
              </li>
              <li className="flex items-center">
                <ClockIcon className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-sm">Lun - Vie: 9:00 - 18:00<br />Sáb: 10:00 - 15:00</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright y enlaces legales */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} VendeChamito. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Sello de calidad */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 flex flex-wrap justify-center gap-6"
      >
        {[
          { text: 'Pagos Seguros', icon: '🔒' },
          { text: 'Envío Gratis', icon: '🚚' },
          { text: 'Calidad Garantizada', icon: '✨' },
          { text: 'Soporte 24/7', icon: '💬' },
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-amber-400">{item.icon}</span>
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </footer>
  );
};

export default Footer;