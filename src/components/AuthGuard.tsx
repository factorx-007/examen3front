'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación solo en el cliente
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  // No renderizar nada hasta verificar la autenticación
  if (typeof window === 'undefined' || localStorage.getItem('isAuthenticated') !== 'true') {
    return null;
  }

  return <>{children}</>;
}
