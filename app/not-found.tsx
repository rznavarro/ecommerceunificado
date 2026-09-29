import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-5 text-center">
      <p className="label text-dorado-texto">Error 404</p>
      <h1 className="display-h2">No encontramos esta página</h1>
      <Link href="/" className="btn-primary">
        Volver a la portada
      </Link>
    </main>
  );
}
