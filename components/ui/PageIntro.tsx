import clsx from 'clsx';

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Cabecera de página interna: un único H1 por página. */
export function PageIntro({ eyebrow, title, lead, className, children }: Props) {
  return (
    <header className={clsx('container-site pt-16 pb-12 md:pt-24 md:pb-16', className)}>
      {eyebrow && <p className="label mb-5 text-dorado-texto">{eyebrow}</p>}
      <h1 className="display-h2 max-w-4xl">{title}</h1>
      {lead && <p className="mt-6 max-w-2xl text-[17px] text-cafe/85">{lead}</p>}
      {children}
    </header>
  );
}
