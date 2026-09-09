export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number | null;
  category: string;
  age_range: string;
  image_url: string;
  additional_images?: string[];
  in_stock: boolean;
  featured?: boolean;
  badge?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 
  | 'Todos'
  | 'Peluches'
  | 'Didácticos'
  | 'Figuras de Acción'
  | 'Juegos de Mesa'
  | 'Vehículos y Pistas'
  | 'Bebés'
  | 'Muñecas'
  | 'Juegos de Rol'
  | 'Exterior y Deportes';

export const CATEGORIES: Category[] = [
  'Todos',
  'Peluches',
  'Didácticos',
  'Figuras de Acción',
  'Juegos de Mesa',
  'Vehículos y Pistas',
  'Bebés',
  'Muñecas',
  'Juegos de Rol',
  'Exterior y Deportes'
];

export const AGE_RANGES = [
  'Todas las edades',
  '0 a 18 meses',
  '3 a 6 años',
  '6 a 12 años',
  '5+ años',
  '4 a 10 años',
  '3 a 9 años'
];