import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { NotePro } from '../components/ui/NotePro';

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <NotePro className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to NotePro
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your notes from anywhere
          </p>
        </div>

        <div className="rounded-lg bg-white px-6 py-8 shadow dark:bg-gray-800 sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}