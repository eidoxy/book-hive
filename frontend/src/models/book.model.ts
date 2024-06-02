export interface Book {
  id?: number;
  title: string;
  cover?: string;
  description: string;
  author?: string;
  category?: string;
  shelf?: string;
  stock?: number;
  total_page: number;
}
