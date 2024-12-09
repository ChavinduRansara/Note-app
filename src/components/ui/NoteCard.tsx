import { Calendar, Tag } from 'lucide-react';
import { Note } from '../../types/note';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div
      onClick={() => onClick(note)}
      className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
    >
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{note.title}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{note.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(note.updatedAt).toLocaleDateString()}
          </span>
        </div>
        {note.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <div className="flex gap-1">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}