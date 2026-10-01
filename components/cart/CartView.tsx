'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { z } from 'zod';
import { categoryList } from '@/data/categories';
import { useCart, selectCount, selectSubtotal } from '@/lib/cart-store';
import { formatCLP } from '@/lib/format';
import { createOrder, qualifiesForFreeShipping, type Customer } from '@/lib/order';
import { activePaymentProvider } from '@/lib/payments';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { CartLines, FreeShippingProgress } from './CartLines';

const REGIONS = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana de Santiago',
  "Libertador General Bernardo O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes y la Antártica Chilena',
] as const;

const customerSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre.'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s]{8,15}$/, 'Escribe un teléfono válido, por ejemplo +56 9 1234 5678.'),
  region: z.enum(REGIONS, { error: 'Elige tu región.' }),
  commune: z.string().trim().min(2, 'Escribe tu comuna.'),
  address: z.string().trim().min(5, 'Escribe tu dirección.'),
  notes: z.string().trim().max(300).optional(),
});

type Field = keyof z.infer<typeof customerSchema>;
type Errors = Partial<Record<Field, string>>;

const inputClass =
  'mt-1.5 block h-12 w-full rounded-[3px] border border-linea bg-marfil px-4 text-[16px] text-negro outline-none transition-colors focus:border-cafe';

/** Página del carrito: líneas, resumen y datos de despacho → WhatsApp. */
export function CartView() {
  const lines = useCart((s) => s.lines);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const hasPending = lines.some((l) => l.unitPrice === null);
  const freeShipping = qualifiesForFreeShipping(subtotal);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = customerSchema.safeParse({ ...data, notes: data.notes || undefined });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setSending(true);
    const order = createOrder(lines, parsed.data as Customer);
    const { redirectUrl } = await activePaymentProvider.createCheckout(order);
    clear();
    window.location.assign(redirectUrl);
  };

  if (count === 0) {
    return (
      <div className="border-y border-linea py-16 text-center">
        <p className="font-display text-[30px] text-negro">Tu carrito está vacío</p>
        <p className="mt-3 text-cafe/80">Descubre nuestras colecciones:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categoryList.map((c) => (
            <Link key={c.id} href={c.href} className="btn-glass">
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const field = (name: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`f-${name}`} className="text-[14px] font-medium text-negro">
        {label}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `e-${name}` : undefined}
        className={clsx(inputClass, errors[name] && 'border-ciruela')}
        {...props}
      />
      {errors[name] && (
        <p id={`e-${name}`} className="mt-1.5 text-[13px] text-ciruela">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
      <section aria-label="Productos">
        <FreeShippingProgress />
        <div className="mt-4 border-t border-linea">
          <CartLines />
        </div>
      </section>

      <section aria-labelledby="despacho-titulo" className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
        <div className="rounded-2xl bg-crema p-6 md:p-8">
          <h2 className="label text-cafe">Resumen</h2>
          <dl className="mt-4 space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-negro tabular-nums">{formatCLP(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Envío</dt>
              <dd className="text-negro">{freeShipping ? 'Gratis' : 'A confirmar'}</dd>
            </div>
          </dl>
          {hasPending && (
            <p className="mt-3 text-[13px] text-cafe/80">
              Algunos productos tienen precio a confirmar; te lo enviamos por WhatsApp.
            </p>
          )}

          <h2 id="despacho-titulo" className="mt-8 border-t border-linea pt-6 font-display text-[26px] font-medium text-negro">
            Datos de despacho
          </h2>
          <form noValidate onSubmit={onSubmit} className="mt-5 space-y-4">
            {field('name', 'Nombre y apellido', { autoComplete: 'name' })}
            {field('phone', 'Teléfono', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+56 9 1234 5678' })}
            <div>
              <label htmlFor="f-region" className="text-[14px] font-medium text-negro">
                Región
              </label>
              <select
                id="f-region"
                name="region"
                defaultValue=""
                aria-invalid={errors.region ? true : undefined}
                aria-describedby={errors.region ? 'e-region' : undefined}
                className={clsx(inputClass, errors.region && 'border-ciruela')}
              >
                <option value="" disabled>
                  Elige tu región
                </option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p id="e-region" className="mt-1.5 text-[13px] text-ciruela">
                  {errors.region}
                </p>
              )}
            </div>
            {field('commune', 'Comuna', { autoComplete: 'address-level2' })}
            {field('address', 'Dirección', { autoComplete: 'street-address', placeholder: 'Calle, número, depto.' })}
            <div>
              <label htmlFor="f-notes" className="text-[14px] font-medium text-negro">
                Notas <span className="font-normal text-cafe/70">(opcional)</span>
              </label>
              <textarea id="f-notes" name="notes" rows={3} maxLength={300} className={clsx(inputClass, 'h-auto py-3')} />
            </div>
            <button type="submit" disabled={sending} className="btn-primary mt-2 min-h-14 w-full">
              <WhatsAppIcon size={20} />
              {sending ? 'Abriendo WhatsApp…' : activePaymentProvider.label}
            </button>
            <p className="text-center text-[13px] text-cafe/75">
              Te llevamos a WhatsApp con tu pedido listo para enviar.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
