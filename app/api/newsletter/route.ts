import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({ email: z.email().max(254) });

/**
 * Reenvía el correo a NEWSLETTER_WEBHOOK_URL [PENDIENTE: servicio de correo].
 * Si no está definida, responde 200 y registra en la consola del servidor.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    console.info('[newsletter] NEWSLETTER_WEBHOOK_URL no definida. Suscripción:', parsed.data.email);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.data.email, source: 'purpuratta.cl', createdAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[newsletter] Error al reenviar:', error);
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
