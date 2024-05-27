export interface Book {
  id?: number;
  title: string;
  cover: Buffer;
  description: string;
  categories_id: number;
  shelves_id: number;
  pages: number;
}
