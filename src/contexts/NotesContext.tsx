import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Note, SortOption } from '../types/note';
import * as notesApi from '../api/notes';

interface NotesContextType {
  notes: Note[];
  searchQuery: string;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  setSortBy: (option: SortOption) => void;
  addNote: (noteData: { title: string; content: string; tags: string[] }) => Promise<void>;
  editNote: (id: string, noteData: { title: string; content: string; tags: string[] }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  refreshNotes: () => Promise<void>;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
        const notes = await notesApi.getNotes();
        console.log(notes);
        setNotes(notes);
        console.log(notes);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNotes();
  }, [refreshNotes]);

  const addNote = async (noteData: { title: string; content: string; tags: string[] }) => {
    try {
      await notesApi.createNote(noteData);
      await refreshNotes();
    } catch (err) {
      console.error('Error adding note:', err);
      throw err;
    }
  };

  const editNote = async (
    id: string,
    noteData: { title: string; content: string; tags: string[] }
  ) => {
    try {
      await notesApi.updateNote(id, noteData);
      await refreshNotes();
    } catch (err) {
      console.error('Error updating note:', err);
      throw err;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await notesApi.deleteNote(id);
      await refreshNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
      throw err;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        searchQuery,
        sortBy,
        isLoading,
        error,
        setSearchQuery,
        setSortBy,
        addNote,
        editNote,
        deleteNote,
        refreshNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}