import type { Metadata } from 'next';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import LpCtaButton from './LpCtaButton';
import LpPixel from './LpPixel';

export const metadata: Metadata = {
  title: 'Ink & Meadow — Cottagecore Coloring Pages | $7/mo',
  description:
    '100+ cottagecore coloring pages instantly, plus 100 new ones every month. Print at home or color on your iPad. More pages than any coloring book at the store — just $7/mo. Cancel anytime.',
};

const STORAGE_BASE =
  'https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04';

export default function LandingPage() {
  return (
    <div className="min-h-screen floral-bg">
      {/* Pixel: ViewContent on load */}
      <LpPixel />

      {/* ━━━ Hero ━━━ */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-heading text-lg font-semibold text-bark/70 tracking-wide mb-8">
            Ink &amp; Meadow
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-bark leading-tight mb-6">
            Trade Your Screen Time
            <br />
            <span className="text-sage">for Something Beautiful</span>
          </h1>
          <p className="text-bark/70 text-lg md:text-xl max-w-lg mx-auto mb-8 leading-relaxed">
            100+ cottagecore coloring pages instantly, plus 100 new ones every month.
            Print at home or color on your iPad. Just $7/mo.
          </p>
          <LpCtaButton />
          <p className="text-bark/40 text-sm mt-4">
            Cancel anytime. 30-day money-back guarantee.
          </p>

          {/* Preview strip */}
          <div className="flex justify-center gap-2 md:gap-3 mt-10">
            {[
              { file: '01_kitten-on-books.png', rotate: '-rotate-3' },
              { file: '05_fawn-in-meadow.png', rotate: '-rotate-1' },
              { file: '14_corgi-flower-basket.png', rotate: 'rotate-1' },
              { file: '17_bunny-teacup-daisies.png', rotate: 'rotate-3' },
            ].map((img) => (
              <div
                key={img.file}
                className={`bg-white rounded-xl shadow-lg border border-sage/10 p-1.5 w-20 md:w-28 ${img.rotate}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${STORAGE_BASE}/${img.file}`}
                  alt="Coloring page preview"
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Image Grid ━━━ */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-bark text-center mb-8">
            Pages That Bring You Peace
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { file: '02_fox-under-roses.png', alt: 'Fox Under Roses' },
              { file: '03_baby-rabbits-wildflowers.png', alt: 'Baby Rabbits' },
              { file: '08_ducklings-garden-pond.png', alt: 'Ducklings in Pond' },
              { file: '12_bear-cub-lavender.png', alt: 'Bear Cub & Lavender' },
              { file: '25_cat-kitten-mandala.png', alt: 'Cat & Kitten Mandala' },
              { file: '21_mouse-mushroom-reading.png', alt: 'Mouse Reading' },
            ].map((page) => (
              <div
                key={page.file}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-sage/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${STORAGE_BASE}/${page.file}`}
                  alt={page.alt}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-bark/50 text-sm mt-6">
            100+ pages instantly + 100 new pages every month
          </p>
        </div>
      </section>

      {/* ━━━ Social Proof Stats ━━━ */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-bark text-center mb-8">
            It&rsquo;s Not Just Coloring &mdash; It&rsquo;s Self-Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-bark/5 shadow-sm text-center">
              <p className="font-heading text-4xl font-bold text-sage mb-2">62%</p>
              <p className="text-bark/70 text-sm">
                of adults say coloring helps them manage stress and anxiety
              </p>
              <p className="text-bark/30 text-xs mt-2">American Art Therapy Association</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-bark/5 shadow-sm text-center">
              <p className="font-heading text-4xl font-bold text-sage mb-2">20 min</p>
              <p className="text-bark/70 text-sm">
                of coloring lowers cortisol as effectively as meditation
              </p>
              <p className="text-bark/30 text-xs mt-2">Journal of the American Art Therapy Association</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-bark/5 shadow-sm text-center">
              <p className="font-heading text-4xl font-bold text-sage mb-2">91%</p>
              <p className="text-bark/70 text-sm">
                reported feeling calmer and more focused after coloring
              </p>
              <p className="text-bark/30 text-xs mt-2">Drexel University Study</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Is This For You? ━━━ */}
      <section className="py-12 md:py-16 bg-sage/5">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-bark text-center mb-8">
            Ink &amp; Meadow Is For You If&hellip;
          </h2>
          <div className="space-y-3 max-w-lg mx-auto">
            {[
              'You spend your evenings scrolling and wish you didn\u2019t',
              'You want a calming ritual that doesn\u2019t involve a screen',
              'You love the cottagecore aesthetic \u2014 wildflowers, cozy cottages, woodland creatures',
              'You\u2019ve tried meditation apps but they\u2019re not your thing',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-sage/10 shadow-sm"
              >
                <svg
                  className="w-5 h-5 text-sage mt-0.5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-bark/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <LpCtaButton />
            <p className="text-bark/40 text-xs mt-3">
              Less than a latte. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ What You Get ━━━ */}
      <section className="py-12 md:py-16">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 border-2 border-sage/30 shadow-md">
            <div className="text-center mb-6">
              <p className="text-sage font-medium tracking-wide uppercase text-xs mb-2">
                Monthly Membership
              </p>
              <h3 className="font-heading text-2xl font-semibold text-bark mb-1">
                Ink &amp; Meadow
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-heading text-4xl font-bold text-bark">$7</span>
                <span className="text-bark/50 text-sm">/month</span>
              </div>
              <p className="text-sage text-xs font-medium mt-1">
                Less than a latte &mdash; new pages every month
              </p>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                '100+ coloring pages instantly',
                '100 brand-new pages every month',
                'PDF + PNG formats (print & iPad)',
                'Full access to growing library',
                'Cancel anytime',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-bark/70">
                  <svg
                    className="w-4 h-4 text-sage mt-0.5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <LpCtaButton fullWidth />
          </div>
        </div>
      </section>

      {/* ━━━ Coloring Book Comparison ━━━ */}
      <section className="py-12 md:py-16 bg-golden/5">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-bark text-center mb-6">
            More Pages Than Any Coloring Book at the Store
          </h3>
          <div className="grid grid-cols-2 gap-6 text-center mb-6">
            <div className="bg-white rounded-xl p-5 border border-bark/5 shadow-sm">
              <p className="text-bark/40 text-xs uppercase tracking-wider mb-2">Store Coloring Book</p>
              <p className="font-heading text-3xl font-bold text-bark/50">30</p>
              <p className="text-bark/40 text-sm">pages for $10&ndash;$15</p>
              <p className="text-bark/30 text-xs mt-1">One book. That&rsquo;s it.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-sage/30 shadow-sm">
              <p className="text-sage text-xs uppercase tracking-wider font-semibold mb-2">Ink &amp; Meadow</p>
              <p className="font-heading text-3xl font-bold text-sage">100+</p>
              <p className="text-bark/60 text-sm">pages for $7/mo</p>
              <p className="text-sage/70 text-xs mt-1">+ 100 new pages every month</p>
            </div>
          </div>
          <p className="text-center text-bark/50 text-sm">
            Plus you can reprint any page unlimited times &mdash; try new color palettes, share with friends, or give them as gifts.
          </p>
        </div>
      </section>

      {/* ━━━ Guarantee + Trust ━━━ */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-sage/5 rounded-2xl p-8 border border-sage/15 text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-sage"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-bark mb-2">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-bark/60 text-sm max-w-md mx-auto">
              Try it completely risk-free. If you don&rsquo;t love the pages, email us within
              30 days and we&rsquo;ll refund every penny. No questions asked.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 text-sage/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Secure Checkout</p>
                <p className="text-bark/40 text-xs">Powered by Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 text-sage/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Instant Access</p>
                <p className="text-bark/40 text-xs">Download in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 text-sage/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Cancel Anytime</p>
                <p className="text-bark/40 text-xs">Keep what you&rsquo;ve downloaded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Mini FAQ ━━━ */}
      <section className="py-12 md:py-16 bg-sage/5">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-semibold text-bark text-center mb-6">
            Common Questions
          </h2>
          <div className="space-y-3">
            <FaqItem
              question="Can I use these on my iPad?"
              answer="Every page comes as both a print-ready PDF and an iPad-compatible PNG. Import the PNG into Procreate, GoodNotes, or any coloring app. Works beautifully with Apple Pencil."
            />
            <FaqItem
              question="What do I get when I join?"
              answer="Instant access to 100+ coloring pages — wildflower gardens, cozy cottages, woodland creatures, botanicals, mandalas, and more. Plus 100 brand-new pages arrive every month. PDF and PNG formats included."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Absolutely. No contracts, no commitments. Cancel from your account page anytime. You keep everything you've already downloaded."
            />
          </div>
        </div>
      </section>

      {/* ━━━ Final CTA ━━━ */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 md:gap-3 mb-8">
            {[
              { file: '12_bear-cub-lavender.png', rotate: '-rotate-4' },
              { file: '14_corgi-flower-basket.png', rotate: 'rotate-0' },
              { file: '06_owl-family-tree.png', rotate: 'rotate-4' },
            ].map((page) => (
              <div
                key={page.file}
                className={`bg-white rounded-xl shadow-lg border border-sage/10 p-1.5 w-24 md:w-32 ${page.rotate}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${STORAGE_BASE}/${page.file}`}
                  alt="Coloring page"
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark mb-4">
            Your Peaceful Evening
            <br />
            <span className="text-sage">Is Waiting</span>
          </h2>
          <p className="text-bark/60 text-lg max-w-md mx-auto mb-8">
            Close the laptop. Silence the notifications. Pick up your colored pencils
            and let something beautiful unfold.
          </p>
          <LpCtaButton />
          <p className="text-bark/40 text-sm mt-4">
            No contracts. Cancel anytime. Instant access.
          </p>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-bark/10 py-8 pb-24 md:pb-8">
        <div className="text-center text-bark/30 text-xs">
          &copy; {new Date().getFullYear()} Ink &amp; Meadow. All rights reserved.
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white rounded-xl border border-bark/5 shadow-sm">
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-heading text-base font-semibold text-bark hover:text-sage transition-colors">
        {question}
        <svg
          className="w-4 h-4 text-bark/30 group-open:rotate-45 transition-transform shrink-0 ml-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <div className="px-5 pb-4 text-bark/60 text-sm leading-relaxed">{answer}</div>
    </details>
  );
}
