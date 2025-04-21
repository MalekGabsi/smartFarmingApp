export type Activity = {
  id: string;
  title: string;
  field: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
};