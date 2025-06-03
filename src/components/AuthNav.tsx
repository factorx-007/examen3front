'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AuthNav() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/auth/login"
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
            isActive('/auth/login')
              ? 'bg-amber-100 text-amber-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/auth/register"
          className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-full hover:bg-amber-700 ${
            isActive('/auth/register') ? 'ring-2 ring-offset-2 ring-amber-500' : ''
          }`}
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
          <span className="sr-only">Abrir menú de usuario</span>
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
            <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-700 truncate">{session?.user?.name || 'Usuario'}</p>
            <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.email}</p>
          </div>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/perfil"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Mi Perfil
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/pedidos"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Mis Pedidos
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/configuracion"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Configuración
              </Link>
            )}
          </Menu.Item>
          <div className="border-t border-gray-100 my-1"></div>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block w-full text-left px-4 py-2 text-sm text-red-600'
                )}
              >
                Cerrar Sesión
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
