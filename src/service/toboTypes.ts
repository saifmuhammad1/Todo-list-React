export interface ITodo {
  _id?: string;
  title: string;
  description?: string;
  status?: 1 | 2 | 3;
  createdAt?: string;
  page?: number;
  limit?: number;
  total?: number;
}
