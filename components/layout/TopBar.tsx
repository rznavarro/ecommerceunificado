import { site } from '@/data/site';

/** Barra de envío gratis (solo desde tablet; en móvil el diseño es más limpio). */
export function TopBar() {
  return (
    <div className="hidden h-(--topbar-h) md:flex items-center justify-center overflow-hidden bg-cafe px-3 text-center text-[10.5px] leading-tight whitespace-nowrap text-marfil min-[420px]:text-[11px] md:text-[12px] md:tracking-[0.04em]">
      <p>{site.topBar}</p>
    </div>
  );
}
