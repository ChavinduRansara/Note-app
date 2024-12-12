import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { Dialog } from '../ui/Dialog';
import { MultiSelect } from '../ui/MultiSelect';
import { getNoteById } from '../../api/notes';
import { getCategories, createCategory } from '../../api/categories';
import { getTags } from '../../api/tags';
import { Category } from '../../types/category';
import { Tag } from '../../types/tag';

interface NoteEditorProps {
  noteId?: string;
  initialNote?: {
    id?: string;
    title: string;
    content: string;
    category_id?: string;
    tags: string[];
  };
  onSave: (note: { title: string; content: string; category_id: string; tags: string[] }) => void;
  onCancel: () => void;
}

export function NoteEditor({ noteId, initialNote, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(initialNote?.title ?? '');
  const [content, setContent] = useState(initialNote?.content ?? '');
  const [categoryId, setCategoryId] = useState(initialNote?.category_id ?? '');
  const [selectedTags, setSelectedTags] = useState<any[]>(initialNote?.tags ?? []);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [note, setNote] = useState(initialNote);
  
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [fetchedCategories, fetchedTags] = await Promise.all([
        getCategories(),
        getTags(),
      ]);
      setCategories(fetchedCategories);
      setTags(fetchedTags);
      if (noteId) {
        const fetchedNote = await getNoteById(noteId);
        setNote(fetchedNote);
        setTitle(fetchedNote.title);
        setContent(fetchedNote.content);
        setCategoryId(fetchedNote.category_id);
        setSelectedTags(fetchedNote.tags.map((tag: string) => parseInt(tag)));
      }
    };
    loadData();
  }, []);

  const handleAddCategory = async () => {
    console.log(selectedTags);
    if (newCategoryName.trim()) {
      try {
        const newCategory = await createCategory({
          name: newCategoryName,
        });
        setCategories([...categories, newCategory]);
        setCategoryId(newCategory.id);
        setIsNewCategoryDialogOpen(false);
        setNewCategoryName('');
      } catch (error) {
        console.error('Error creating category:', error);
      }
    }
  };


  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg transition-colors dark:bg-gray-800">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full rounded-lg border border-gray-200 bg-white p-3 text-lg font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <div className="flex gap-2">
          <Select.Root value={categoryId} onValueChange={setCategoryId}>
            <Select.Trigger className="flex flex-1 items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <Select.Value placeholder="Select a category" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <Select.Viewport className="p-1">
                  {categories.map((category) => (
                    <Select.Item
                      key={category.id}
                      value={category.id}
                      className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900/30"
                    >
                      <Select.ItemText>{category.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <button
            onClick={() => setIsNewCategoryDialogOpen(true)}
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your note..."
        className="h-64 w-full rounded-lg border border-gray-200 bg-white p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <MultiSelect
              options={tags.map(tag => ({ value: tag.id, label: tag.name }))}
              selected={selectedTags}
              onChange={setSelectedTags}
              placeholder="Select tags"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave({ title, content, category_id: categoryId, tags: selectedTags })}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Save Note
        </button>
      </div>

      <Dialog
        isOpen={isNewCategoryDialogOpen}
        onClose={() => setIsNewCategoryDialogOpen(false)}
        title="Add New Category"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category Name
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
              placeholder="Enter category name"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsNewCategoryDialogOpen(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCategory}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add Category
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}