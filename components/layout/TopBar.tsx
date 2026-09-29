import { site } from '@/data/site';

export function TopBar() {
  return (
    <div className="flex h-(--topbar-h) items-center justify-center overflow-hidden bg-cafe px-3 text-center text-[10.5px] leading-tight whitespace-nowrap text-marfil min-[420px]:text-[11px] md:text-[12px] md:tracking-[0.04em]">
      <p>{site.topBar}</p>
    </div>
  );
}
