import { useNavigate } from 'react-router-dom';
import { NoteEditor } from '../components/notes/NoteEditor';
import { useNotes } from '../hooks/useNotes';

export function CreateNotePage() {
  const navigate = useNavigate();
  const { handleSaveNote } = useNotes();

  const handleSave = (noteData: { title: string; content: string; tags: string[] }) => {
    handleSaveNote(noteData);
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