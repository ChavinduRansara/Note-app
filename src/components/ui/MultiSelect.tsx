import React from 'react';
import { Check, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = 'Select options...' }: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== value));
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[42px] cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
      >
        {selected.length > 0 ? (
          selected.map(value => {
            const option = options.find(opt => opt.value === value);
            return (
              <span
                key={value}
                className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              >
                {option?.label}
                <button
                  onClick={(e) => removeOption(e, value)}
                  className="rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>{option.label}</span>
              {selected.includes(option.value) && (
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}