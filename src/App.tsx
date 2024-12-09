import { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { SearchBar } from './components/ui/SearchBar';
import { NoteCard } from './components/ui/NoteCard';
import { NoteEditor } from './components/notes/NoteEditor';
import { ThemeProvider } from './contexts/ThemeContext';
import { Note, SortOption } from './types/note';

const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    title: 'Welcome to NotePro',
    content: 'Start creating your notes today! Click the "Create Note" button to begin.',
    tags: ['welcome'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function App() {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'tags':
          return a.tags.length - b.tags.length;
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const handleSaveNote = (noteData: { title: string; content: string; tags: string[] }) => {
    if (selectedNote) {
      // Edit existing note
      setNotes(notes.map((note) =>
        note.id === selectedNote.id
          ? { ...note, ...noteData, updatedAt: new Date() }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]);
    }
    setIsEditing(false);
    setSelectedNote(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
        <Navigation />
        
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {isEditing ? (
            <NoteEditor
              initialNote={selectedNote ?? undefined}
              onSave={handleSaveNote}
              onCancel={() => {
                setIsEditing(false);
                setSelectedNote(null);
              }}
            />
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                    <option value="tags">Sort by Tags</option>
                  </select>
                  
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Create Note
                  </button>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={(note) => {
                      setSelectedNote(note);
                      setIsEditing(true);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;