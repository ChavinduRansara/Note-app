import { useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { useNavigate } from 'react-router-dom';
import { Note } from '../types/note';

export function useNotes() {
  const context = useContext(NotesContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  const {
    notes,
    searchQuery,
    sortBy,
    setSearchQuery,
    setSortBy,
    addNote,
    editNote,
    deleteNote,
  } = context;

  const processedNotes: Note[] = notes.map((note: any) => ({
    ...note,
    tags: Array.isArray(note.tags) ? note.tags : note.tags.split(',').map((tag: string) => tag.trim()),
    created_at: new Date(note.created_at),
    updated_at: new Date(note.updated_at),
  }));

  const filteredNotes = processedNotes 
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
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  const handleEditNote = (note: { id: string }) => {
    navigate(`/edit/${note.id}`);
  };

  console.log('filteredNotes:', filteredNotes);

  return {
    notes: filteredNotes,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    handleSaveNote: addNote,
    handleEditNote,
    deleteNote,
  };
}