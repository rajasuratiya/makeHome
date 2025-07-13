// components/LogoutButton.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/logout', { method: 'POST' });
    if (res.ok) {
      router.push('/login');
    } else {
      alert('Logout failed');
    }
  };

  return <button className='btn btn-primary' onClick={handleLogout}>Logout</button>;
}
