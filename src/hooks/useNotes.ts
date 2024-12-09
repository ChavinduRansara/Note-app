import { useState } from 'react';
import { Note, SortOption } from '../types/note';
import { useNavigate } from 'react-router-dom';

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

export function useNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');

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
    const newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  const handleEditNote = (note: Note) => {
    navigate(`/edit/${note.id}`);
  };

  return {
    notes: filteredNotes,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    handleSaveNote,
    handleEditNote,
  };
}