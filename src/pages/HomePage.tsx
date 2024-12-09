import { SearchBar } from '../components/ui/SearchBar';
import { NoteCard } from '../components/ui/NoteCard';
import { useNotes } from '../hooks/useNotes';
import { SortOption } from '../types/note';

export function HomePage() {
  const { 
    notes, 
    searchQuery, 
    setSearchQuery, 
    sortBy, 
    setSortBy, 
    handleEditNote 
  } = useNotes();

  return (
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
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={handleEditNote}
          />
        ))}
      </div>
    </>
  );
}