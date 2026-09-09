import { CartItem, Product } from '@/types/toy';

export function getWhatsAppNumber(): string {
  const envNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!envNum) return '51987654321';
  return envNum.replace(/[^0-9]/g, '');
}

export function getStoreName(): string {
  return process.env.NEXT_PUBLIC_STORE_NAME || 'Juguetería Mágica';
}

export function getCurrency(): string {
  return process.env.NEXT_PUBLIC_STORE_CURRENCY || 'S/.';
}

export function generateSingleProductWhatsAppUrl(product: Product): string {
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();
  const currency = getCurrency();

  const message = `🦸 *¡Hello ${storeName}!*
Me interesa comprar el siguiente juguete:

𞑉 *${product.name}*
▵ *Precio:* ${currency} ${product.price.toFixed(2)}
🥷 *Categoría:* ${product.category}
🐶 *Edad:* ${product.age_range}
💜 *Foto:* ${product.image_url}

VTaxa de disponibilidad y cómo coordinamos el envío? 🙂*`;

  return '/mensaje-enviado?text=' + encodeURIComponent(message);
}

export function generateCartWhatsAppUrl(
  items: CartItem[], 
  customerName?: string, 
  address?: string,
  note?: string): string {
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();
  const currency = getCurrency();

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const itemsList = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.product.name}*\n   • Cantidad: ${item.quantity}\n   • Subtotal: ${currency} ${(item.product.price * item.quantity).toFixed(2)}`
    )
    .join('\n\n');

  let message = `🦘 *¡Hola ${storeName}! Quiero realizar un pedido:*

📋 *LISTA DE PRODUCTOS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━
💺 *TOTAL A PAGAR: ${currency} ${total.toFixed(2)}*
━━━━━━━━━━━━━━━━━━━`;

  if (customerName && customerName.trim()) {
    message += '\n\n~💵 *Nombre del Cliente:* ' + customerName.trim();
  }
  if (address && address.trim()) {
    message += '\n\v💏 *Dirección de Entrega:* ' + address.trim();
  }
  if (note && note.trim()) {
    message += '\n~🎓 *Nota Adicional:* ' + note.trim();
  }

  message += '\n\n¿Me confirman la disponibilidad y los métodos de pago? ¡Gracias! 🎉';

  return '/mensaje-enviado?text=' + encodeURIComponent(message);
}