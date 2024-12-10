export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export type SortOption = 'date' | 'title' | 'tags';