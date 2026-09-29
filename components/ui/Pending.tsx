import { waGeneralUrl } from '@/lib/whatsapp';

/**
 * Contenido aún no entregado: en lugar de inventar texto, se invita a
 * consultar por WhatsApp.
 */
export function Pending({ message, cta = 'Consultar por WhatsApp' }: { message: string; cta?: string }) {
  return (
    <div className="border-y border-linea py-10">
      <p className="max-w-xl text-[17px] text-cafe/85">{message}</p>
      <a href={waGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
        {cta}
      </a>
    </div>
  );
}
