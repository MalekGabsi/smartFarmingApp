export type Task = {
  id: string;
  title: string;
  description?: string;
  date: string;
  field: string;
  category: 'harvest' | 'planting' | 'fertilizer' | 'irrigation' | 'maintenance' | 'other';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
};