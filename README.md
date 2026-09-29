# Purpuratta — ecommerce unificado

Tienda online de Purpuratta: lencería, ropa y joyería en un solo lugar.
Next.js (App Router) + React + TypeScript strict + Tailwind CSS v4. Pedidos por WhatsApp.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run lint
```

Variables de entorno (opcionales):

- `NEWSLETTER_WEBHOOK_URL`: URL a la que `/api/newsletter` reenvía los correos. Si no existe, responde 200 y registra en la consola del servidor. [PENDIENTE: servicio de correo]

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `app/(site)/` | Rutas públicas (portada, categorías, producto, carrito, textos) |
| `app/api/newsletter` | Route Handler del club de correo |
| `components/layout` | Barra superior, menú, búsqueda, footer, botón de WhatsApp |
| `components/ui`, `components/product` | Piezas reutilizables |
| `data/site.ts` | **Única fuente de verdad** del negocio (teléfono, ubicación, envío) |
| `data/products.ts` | Catálogo (26 productos) |
| `data/images.ts` | Imágenes editoriales y su disponibilidad |
| `data/categories.ts`, `data/faq.ts`, `data/looks.ts`, `data/policies.ts` | Contenido |
| `lib/cart-store.ts` | Carrito (zustand + localStorage) |
| `lib/whatsapp.ts`, `lib/order.ts` | Mensaje de pedido e ID `PTT-AAAAMMDD-XXXX` |
| `lib/payments/` | Interfaz `PaymentProvider` (hoy: WhatsApp) |

## Cargar imágenes

1. Guarda la imagen en `public/images/editorial/` con el nombre indicado en `data/images.ts` (WebP, mínimo 1200 px de ancho; 2000 px para el hero).
2. En `data/images.ts`, cambia `available` a `true` y ajusta `width`/`height`.
3. Las fotos de producto van en `public/images/productos/<slug>-1.webp`, `-2.webp`…

Mientras una imagen no esté disponible, el sitio muestra una tarjeta crema con el nombre (nunca la foto de otro producto).

## Sumar una pasarela de pago

Implementa `PaymentProvider` en `lib/payments/` (p. ej. `webpay-provider.ts`) con `createCheckout(order)` que devuelva `{ redirectUrl }`, y cámbialo en `lib/payments/index.ts`. El carrito no se toca.
