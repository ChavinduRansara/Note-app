import { api } from './client';
import { Category, CreateCategoryData } from '../types/category';

export async function getCategories() {
  const { data } = await api.get<Category[]>('/api/categories/get-category');
  return data;
}

export async function createCategory(category: CreateCategoryData) {
  const { data } = await api.post<Category>('/categories', category);
  return data;
}