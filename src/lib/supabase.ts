import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types/toy';
import { INITIAL_PRODUCTS } from './mock-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://klylhfjplwtgiwaiytpj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PVq5buSIUNo6jYYEFQpw7Q_EIsJT4Pz';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_PRODUCTS;
    }

    return data as Product[];
  } catch (err) {
    return INITIAL_PRODUCTS;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return INITIAL_PRODUCTS.find(p => p.id === id) || null;
    }

    return data as Product;
  } catch {
    return INITIAL_PRODUCTS.find(p => p.id === id) || null;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return INITIAL_PRODUCTS.find(p => p.slug === slug) || null;
    }

    return data as Product;
  } catch {
    return INITIAL_PRODUCTS.find(p => p.slug === slug) || null;
  }
}

export async function saveProduct(product: Partial<Product>): Promise<{ data: Product | null; error: string | null }> {
  try {
    const slug = product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'juguete-' + Date.now();
    const payload = {
      ...product,
      slug,
      updated_at: new Date().toISOString()
    };

    if (product.id) {
      const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', product.id)
        .select()
        .single();

      if (error) throw error;
      return { data: data as Product, error: null };
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return { data: data as Product, error: null };
    }
  } catch (err: any) {
    return { data: null, error: err.message || 'Error al guardar el producto' };
  }
}

export async function removeProduct(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al eliminar producto' };
  }
}

export async function uploadToyImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = Date.now() + '-' + Math.random().toString(36).substring(2, 9) + '.' + fileExt;
    const filePath = 'products/' + fileName;

    const { error: uploadError } = await supabase.storage
      .from('toy-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('toy-images')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Error al subir la imagen' };
  }
}