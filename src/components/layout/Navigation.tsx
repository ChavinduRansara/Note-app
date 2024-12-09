import { useState } from 'react';
import { Menu, X, Home, PlusCircle, User } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'All Notes', href: '/' },
    { icon: PlusCircle, label: 'Create Note', href: '/create' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="bg-white shadow transition-colors dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">NotePro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center md:flex md:space-x-8">
            {navItems.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}