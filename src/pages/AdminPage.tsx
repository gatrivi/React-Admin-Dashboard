import React, { useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { AdminPanel } from '../components/admin/AdminPanel';
import { LoginModal } from '../components/admin/LoginModal';

export default function AdminPage() {
  const { isLoggedIn, showLogin, triggerLogin } = useAdmin();

  useEffect(() => {
    if (!isLoggedIn && !showLogin) {
      triggerLogin();
    }
  }, [isLoggedIn, showLogin, triggerLogin]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <LoginModal />
      <AdminPanel />
    </div>
  );
}
