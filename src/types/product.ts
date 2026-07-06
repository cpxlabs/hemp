export type ProductCategory = 'Ramps' | 'Decks' | 'Dice Tower' | 'Acessórios' | 'Xadrez';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  description: string;
  imageUrl: string;
  specs: ProductSpec[];
  tags: string[];
}
