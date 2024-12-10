import { useNavigate } from 'react-router-dom';
import { NoteEditor } from '../components/notes/NoteEditor';
import { useNotes } from '../contexts/NotesContext';

export function CreateNotePage() {
  const navigate = useNavigate();
  const { addNote } = useNotes();

  const handleSave = (noteData: { title: string; content: string; tags: string[] }) => {
    addNote(noteData);
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Create New Note</h1>
      <NoteEditor
        onSave={handleSave}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}