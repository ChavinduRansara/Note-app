import { api } from './client';
import { Tag, CreateTagData } from '../types/tag';

export async function getTags() {
  const { data } = await api.get<Tag[]>('/api/tags');
  return data;
}

export async function createTag(tag: CreateTagData) {
  const { data } = await api.post<Tag>('/tags', tag);
  return data;
}