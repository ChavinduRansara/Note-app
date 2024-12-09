import { User, Mail, Settings } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
      
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-300">Note enthusiast</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
              <p className="text-gray-600 dark:text-gray-300">john.doe@example.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Preferences</p>
              <p className="text-gray-600 dark:text-gray-300">Manage your account settings</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}