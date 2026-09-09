-- ====================================================================
-- ESQUEMA DE BASE DE DATOS PARA JUGUETERÍA EN SUPABASE
-- Pega este script en el SQL Editor de tu Dashboard de Supabase y dale a RUN
-- ====================================================================

-- 1. Crear tabla de productos de juguetería
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    category TEXT NOT NULL DEFAULT 'Juguetes',
    age_range TEXT NOT NULL DEFAULT 'Todas las edades',
    image_url TEXT NOT NULL,
    additional_images TEXT[] DEFAULT '{}',
    in_stock BOOLEAN NOT NULL DEFAULT true,
    featured BOOLEAN NOT NULL DEFAULT false,
    badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de seguridad (Cualquiera puede leer el catálogo, solo tú puedes modificar)
DROP POLICY IF EXISTS Permitir lectura pública de productos ON public.products;
CREATE POLICY Permitir lectura pública de productos
    ON public.products FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS Permitir inserción completa con anon o auth ON public.products;
CREATE POLICY Permitir inserción completa con anon o auth
    ON public.products FOR INSERT
    TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS Permitir actualización completa con anon o auth ON public.products;
CREATE POLICY Permitir actualización completa con anon o auth
    ON public.products FOR UPDATE
    TO public
    USING (true);

DROP POLICY IF EXISTS Permitir eliminación con anon o auth ON public.products;
CREATE POLICY Permitir eliminación con anon o auth
    ON public.products FOR DELETE
    TO public
    USING (true);

-- 4. Crear Bucket de Almacenamiento para fotos de juguetes
INSERT INTO storage.buckets (id, name, public)
VALUES ('toy-images', 'toy-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 5. Políticas de Storage para fotos (Lectura y subida pública)
DROP POLICY IF EXISTS Permitir ver fotos de juguetes públicamente ON storage.objects;
CREATE POLICY Permitir ver fotos de juguetes públicamente
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'toy-images');

DROP POLICY IF EXISTS Permitir subir fotos de juguetes ON storage.objects;
CREATE POLICY Permitir subir fotos de juguetes
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'toy-images');

DROP POLICY IF EXISTS Permitir eliminar fotos de juguetes ON storage.objects;
CREATE POLICY Permitir eliminar fotos de juguetes
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'toy-images');

-- 6. Insertar productos de ejemplo con fotos reales de juguetes
INSERT INTO public.products (name, slug, description, price, original_price, category, age_range, image_url, in_stock, featured, badge)
VALUES
(
    'Oso de Peluche Gigante 1 Metro',
    'oso-de-peluche-gigante-1-metro',
    'Peluche ultrasuave y acolchado de 100cm de altura. Fabricado con materiales hipoalergénicos de primera calidad. Ideal para regalos y abrazos.',
    79.90,
    99.90,
    'Peluches',
    'Todas las edades',
    'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&auto=format&fit=crop&q=80',
    true,
    true,
    'Más Vendido'
),
(
    'Set de Bloques de Construcción 150 Piezas',
    'set-bloques-construccion-150-piezas',
    'Set de bloques multicolores compatibles con las principales marcas. Fomenta la creatividad, psicomotricidad y visión espacial de los niños.',
    49.50,
    65.00,
    'Didácticos',
    '3 a 6 años',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80',
    true,
    true,
    'Oferta'
),
(
    'Auto de Carreras a Control Remoto 4WD',
    'auto-carreras-control-remoto-4wd',
    'Vehículo todo terreno con tracción 4x4, batería recargable USB y control remoto de 2.4GHz con alcance de hasta 40 metros.',
    69.00,
    85.00,
    'Vehículos y Pistas',
    '6 a 12 años',
    'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80',
    true,
    true,
    'Nuevo'
),
(
    'Set de Doctor Infantil con Maletín y Luces',
    'set-doctor-infantil-maletin',
    'Maletín médico con estetoscopio con sonido de latidos reales, termómetro con luz, jeringa y accesorios médicos seguros sin bordes filosos.',
    38.00,
    45.00,
    'Juegos de Rol',
    '3 a 8 años',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80',
    true,
    false,
    'Popular'
),
(
    'Juego de Mesa Familiar - La Torre de Bloques de Madera',
    'juego-mesa-torre-bloques-madera',
    'Juego clásico de equilibrio y destreza con 54 bloques de madera pulida natural. Diversión garantizada para toda la familia.',
    28.50,
    null,
    'Juegos de Mesa',
    '5+ años',
    'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80',
    true,
    false,
    null
),
(
    'Muñeca Articulada con Vestidos y Accesorios',
    'muneca-articulada-vestidos-accesorios',
    'Muñeca articulada de 30 cm con 3 cambios de ropa, zapatos, peine y accesorios para peinar. Cabello suave y ojos brillantes.',
    42.00,
    55.00,
    'Muñecas',
    '3 a 9 años',
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    true,
    true,
    'Destacado'
),
(
    'Gimnasio Musical para Bebés con Piano Táctil',
    'gimnasio-musical-bebes-piano',
    'Tapete acolchado suave con arco de juguetes colgantes sonajeros y piano pateador con luces y melodías estimulantes para bebés.',
    89.00,
    110.00,
    'Bebés',
    '0 a 18 meses',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80',
    true,
    false,
    'Recomendado'
),
(
    'Dinosaurio T-Rex con Sonido y Movimiento',
    'dinosaurio-t-rex-sonido-movimiento',
    'Figura de acción de Tyrannosaurus Rex de 40cm con rugido realista, ojos iluminados y mandíbula articulada con detalles de alta calidad.',
    55.00,
    68.00,
    'Figuras de Acción',
    '4 a 10 años',
    'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=800&auto=format&fit=crop&q=80',
    true,
    false,
    'Nuevo'
)
ON CONFLICT (slug) DO NOTHING;
