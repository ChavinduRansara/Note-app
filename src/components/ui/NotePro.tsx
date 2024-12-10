import { Notebook } from 'lucide-react';

interface NoteProProps {
  className?: string;
}

export function NotePro({ className }: NoteProProps) {
  return <Notebook className={className} />;
}