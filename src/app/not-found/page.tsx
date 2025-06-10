// app/not-found.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Link from 'next/link'; // Import Link component

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      {/* Fix 1 & 2: Escape apostrophes */}
      <p>Oops! It looks like you&apos;ve stumbled upon a page that doesn&apos;t exist.</p>
      <p>Redirecting you to the home page...</p>
      {/* Fix 3: Use Next.js <Link> component */}
      <p>
        <Link href="/">
          Click here to go home now
        </Link>
      </p>
    </div>
  );
}