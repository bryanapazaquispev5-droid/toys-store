# 🧸 Juguetería Mágica - Tienda Online con WhatsApp y Supabase

Una tienda virtual moderna, interactiva y rápida diseñada para jugueterías y tiendas de regalos. Los clientes pueden explorar el catálogo, filtrar por edad y categoría, armar un carrito de compras y enviar su pedido formateado directamente a **WhatsApp**. Incluye un **Panel de Administración privado** para gestionar inventario y subir fotos en la nube con **Supabase Storage**.

---

## 🚀 Características Principales

- **🛍️ Catálogo Interactivo**:
  - Filtros en tiempo real por categoría (Peluches, Didácticos, Figuras, Juegos de Mesa, Bebés, etc.).
  - Filtro por rango de edad (0 a 18 meses, 3 a 6 años, 6 a 12 años, etc.).
  - Buscador inteligente por nombre y descripción.
  - Ordenamiento por precio (menor a mayor, mayor a menor) y destacados.
  - Modal detallado de producto con galería y especificaciones.

- **📱 Venta Directa por WhatsApp**:
  - **Botón de compra rápida**: Abre un chat de WhatsApp con el mensaje formateado del producto.
  - **Carrito de compras inteligente**: Permite agregar múltiples productos, especificar datos del cliente (nombre, teléfono, dirección/ciudad) y generar el resumen consolidado de la compra con cálculo automático de totales.
  - **Botón flotante de WhatsApp**: Para consultas generales y atención al cliente.

- **🔐 Panel de Administración Privado**:
  - Acceso seguro mediante ruta privada y contraseña maestra.
  - Creación de nuevos juguetes con título, precio, categoría, edad y stock.
  - **Subida directa de imágenes** a Supabase Storage (`toy-images`).
  - Interruptor de 1 clic para activar/desactivar disponibilidad de stock.
  - Eliminación y edición rápida de productos.

- **☁️ Backend Serverless con Supabase**:
  - Base de datos PostgreSQL para almacenamiento seguro de productos.
  - Políticas de seguridad Row Level Security (RLS).
  - Storage Bucket público para imágenes de alta velocidad.
  - Fallback automático a catálogo local si no hay conexión a internet.

---

## 🛠️ Stack Tecnológico

- **Frontend**: [Next.js 16 (App Router)](https://nextjs.org/) con TypeScript y Tailwind CSS v4.
- **Iconografía e Interacción**: Lucide React + Canvas Confetti.
- **Backend & Base de Datos**: [Supabase](https://supabase.com/) (PostgreSQL + Storage).
- **Despliegue**: [Vercel](https://vercel.com/) (Listo para 1-click deploy).

---

## 📦 Configuración Inicial

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/bryanapazaquispev5-droid/toys-store.git
cd toys-store
npm install
```

### 2. Configurar Base de Datos en Supabase

1. Entra a tu panel de [Supabase Dashboard](https://supabase.com/dashboard).
2. Selecciona tu proyecto y ve a la sección **SQL Editor** (en el menú lateral izquierdo).
3. Haz clic en **New query** (Nueva consulta).
4. Copia y pega el contenido del archivo [`supabase-schema.sql`](./supabase-schema.sql) que está en la raíz del proyecto.
5. Presiona **Run** (Ejecutar). Esto creará:
   - La tabla `products` con todos sus campos e índices.
   - Las políticas RLS de lectura pública y escritura.
   - El Storage Bucket `toy-images` con permisos públicos de descarga y subida.
   - 8 juguetes de demostración listos para usar.

### 3. Variables de Entorno (`.env.local`)

Crea un archivo `.env.local` en la raíz (o usa `.env.example` como plantilla):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://klylhfjplwtgiwaiytpj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_PVq5buSIUNo6jYYEFQpw7Q_EIsJT4Pz

# Store & WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_PHONE=51987654321
NEXT_PUBLIC_STORE_NAME=Juguetería Mágica
```

> 💡 **Nota**: Cambia `NEXT_PUBLIC_WHATSAPP_PHONE` por el número de WhatsApp real de tu tienda (con código de país sin el signo +, por ejemplo `51912345678` para Perú).

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la tienda.

---

## 🌐 Despliegue en Vercel

1. Ve a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New...** -> **Project**.
3. Selecciona el repositorio `bryanapazaquispev5-droid/toys-store` y presiona **Import**.
4. En la sección **Environment Variables**, agrega las 5 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`
   - `NEXT_PUBLIC_STORE_NAME`
   - `NEXT_PUBLIC_ADMIN_PIN`
5. Presiona **Deploy**. En menos de 1 minuto tu tienda estará en línea en un dominio gratuito `https://toys-store-xxx.vercel.app`!
