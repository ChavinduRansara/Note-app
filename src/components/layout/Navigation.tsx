import { useState } from 'react';
import { Menu, X, Home, PlusCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NotePro } from '../ui/NotePro';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'All Notes', href: '/' },
    { icon: PlusCircle, label: 'Create Note', href: '/create' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
    } transition-colors`;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow transition-colors dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
              <NotePro className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>NotePro</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center md:flex md:space-x-8">
            {navItems.map(({ icon: Icon, label, href }) => (
              <NavLink key={href} to={href} className={linkClasses}>
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            ))}
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 bg-white shadow-lg dark:bg-gray-800 md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map(({ icon: Icon, label, href }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-md px-3 py-2 ${
                    isActive
                      ? 'bg-gray-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400'
                  } transition-colors`
                }
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}