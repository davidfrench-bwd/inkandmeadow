'use client';

import Link from 'next/link';

const STORAGE_BASE =
  'https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04';

const samples = [
  {
    file: '11_fox-under-roses.png',
    title: 'Fox Under Roses',
  },
  {
    file: '07_flower-wreath.png',
    title: 'Flower Wreath',
  },
  {
    file: '21_fairy-door-oak-tree.png',
    title: 'Fairy Door Oak Tree',
  },
];

export default function FreeSamplePage() {
  return (
    <main className="bg-cream min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-10 text-center px-4">
        <p className="text-sage font-medium tracking-[0.2em] uppercase text-xs mb-3">
          Free Sample
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-bark mb-4">
          Your 3 Free Coloring Pages
        </h1>
        <p className="text-bark/70 max-w-lg mx-auto text-base leading-relaxed">
          Print them out or import into Procreate on your iPad &mdash; these pages are yours to enjoy
          however you like.
        </p>
      </section>

      {/* Sample Cards */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {samples.map((sample) => {
            const url = `${STORAGE_BASE}/${sample.file}`;
            return (
              <div
                key={sample.file}
                className="bg-white rounded-2xl shadow-md border border-sage/10 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={sample.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="font-heading text-lg font-semibold text-bark mb-3">
                    {sample.title}
                  </h3>
                  <a
                    href={url}
                    download
                    className="inline-block bg-sage text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-sage-dark transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upsell CTA */}
      <section className="bg-bark/[0.03] border-t border-bark/10 py-16 px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark mb-3">
          Love these?
        </h2>
        <p className="text-bark/70 max-w-md mx-auto mb-8 text-base leading-relaxed">
          Get 30 new pages like these every single month &mdash; plus the full Starter Collection
          the moment you join.
        </p>
        <Link
          href="/checkout?plan=meadow"
          className="inline-block bg-sage text-white px-8 py-4 rounded-full text-base font-medium hover:bg-sage-dark transition-colors shadow-md shadow-sage/20"
        >
          Join the Meadow &mdash; $9/mo
        </Link>
        <p className="text-bark/50 text-sm mt-4">
          Or grab the{' '}
          <Link href="/checkout?plan=starter" className="text-sage underline underline-offset-2 hover:text-sage-dark">
            Starter Collection (30 pages) for $7
          </Link>
        </p>
      </section>

      {/* Footer link back */}
      <div className="text-center py-10">
        <Link href="/" className="text-sage text-sm hover:underline">
          &larr; Back to Ink &amp; Meadow
        </Link>
      </div>
    </main>
  );
}
