import Link from "next/link";
import Image from "next/image";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import EmailCapture from "@/components/EmailCapture";
import ImageLightbox from "@/components/ImageLightbox";
import CountdownBanner from "@/components/CountdownBanner";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const STORAGE_BASE = 'https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03';

/* ─── Decorative SVG Components ─── */

function LeafAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 5C30 5 10 20 10 35C10 50 30 55 30 55C30 55 50 50 50 35C50 20 30 5 30 5Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M30 10V50"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M30 20C22 25 18 30 16 35"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.15"
      />
      <path
        d="M30 30C38 33 42 37 44 40"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.15"
      />
    </svg>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-16">
      <div className="h-px w-16 bg-rose/30" />
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-rose"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" opacity="0.6" />
        <ellipse cx="12" cy="6" rx="2.5" ry="4" opacity="0.3" />
        <ellipse cx="12" cy="18" rx="2.5" ry="4" opacity="0.3" />
        <ellipse cx="6" cy="12" rx="4" ry="2.5" opacity="0.3" />
        <ellipse cx="18" cy="12" rx="4" ry="2.5" opacity="0.3" />
      </svg>
      <div className="h-px w-16 bg-rose/30" />
    </div>
  );
}

function BotanicalCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 110C10 110 20 60 60 30C80 15 110 10 110 10"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.15"
        fill="none"
      />
      <path
        d="M15 110C15 110 30 70 55 50"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
        fill="none"
      />
      <circle cx="60" cy="30" r="4" fill="currentColor" opacity="0.08" />
      <circle cx="40" cy="55" r="3" fill="currentColor" opacity="0.06" />
      <circle cx="80" cy="18" r="3" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

/* ─── Page Sections ─── */

export default function Home() {
  return (
    <div className="min-h-screen floral-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sage/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-semibold text-bark tracking-wide">
            Ink &amp; Meadow
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#pricing" className="text-bark/70 hover:text-sage transition-colors">
              Pricing
            </a>
            <a href="#how-it-works" className="text-bark/70 hover:text-sage transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-bark/70 hover:text-sage transition-colors">
              FAQ
            </a>
            <Link
              href="/checkout?plan=meadow"
              className="bg-sage text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-sage-dark transition-colors"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </nav>

      {/* ━━━ Urgency Banner with Countdown ━━━ */}
      <CountdownBanner />

      {/* ━━━ Hero Section ━━━ */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        {/* Decorative elements */}
        <BotanicalCorner className="absolute top-20 left-0 w-32 h-32 text-sage hidden lg:block" />
        <BotanicalCorner className="absolute top-20 right-0 w-32 h-32 text-rose hidden lg:block scale-x-[-1]" />
        <LeafAccent className="absolute bottom-10 left-10 w-16 h-16 text-sage hidden md:block" />
        <LeafAccent className="absolute top-40 right-16 w-12 h-12 text-rose hidden md:block rotate-45" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-center md:text-left">
              <p className="text-sage font-medium tracking-[0.2em] uppercase text-sm mb-6">
                A Cottagecore Coloring Club
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-bark leading-tight mb-8">
                Trade Your Screen Time
                <br />
                <span className="text-sage">for Something Beautiful</span>
              </h1>
              <p className="text-bark/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                You already know the scroll isn&rsquo;t helping. Replace that hour of
                screen time with something that actually makes you feel good.
                Print at home or color on your iPad &mdash; beautiful pages, delivered monthly.
              </p>
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
                <Link
                  href="/checkout?plan=meadow"
                  className="w-full sm:w-auto bg-sage text-white px-8 py-4 rounded-full font-medium hover:bg-sage-dark shadow-lg shadow-sage/20 transition-all"
                >
                  Join the Club &mdash; $9/mo
                </Link>
                <Link
                  href="/checkout?plan=starter"
                  className="w-full sm:w-auto bg-cream-dark text-bark border-2 border-bark/15 px-8 py-4 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
                >
                  Or Try 30 Pages &mdash; $7
                </Link>
              </div>
              <p className="text-bark/40 text-sm mt-6">
                No contracts. Cancel anytime. Instant access.
              </p>
            </div>

            {/* Mobile: horizontal scroll of pages */}
            <div className="md:hidden -mx-6 px-6 overflow-x-auto pb-4">
              <div className="flex gap-3 w-max">
                {[
                  { file: '2026-03_26_kitten-in-the-garden.png', alt: 'Kitten in the Garden' },
                  { file: '2026-03_01_wildflower-cottage.png', alt: 'Wildflower Cottage' },
                  { file: '2026-03_29_ducklings-at-the-pond.png', alt: 'Ducklings at the Pond' },
                  { file: '2026-03_14_fairy-mushroom-circle.png', alt: 'Fairy Mushroom Circle' },
                ].map((page) => (
                  <div key={page.file} className="bg-white rounded-xl shadow-lg border border-sage/10 p-1.5 w-36 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${STORAGE_BASE}/${page.file}`}
                      alt={page.alt}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <p className="text-[10px] text-bark/60 text-center mt-1">{page.alt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: image collage */}
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-3 -rotate-3">
                {/* Large featured image */}
                <div className="col-span-2 bg-white rounded-2xl overflow-hidden shadow-xl border border-sage/10 p-2">
                  <Image
                    src={`${STORAGE_BASE}/2026-03_01_wildflower-cottage.png`}
                    alt="Wildflower Cottage coloring page"
                    width={600}
                    height={600}
                    className="w-full rounded-xl"
                    priority
                  />
                </div>
                {/* Two smaller images below */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-sage/10 p-1.5 rotate-2">
                  <Image
                    src={`${STORAGE_BASE}/2026-03_14_fairy-mushroom-circle.png`}
                    alt="Fairy Mushroom Circle coloring page"
                    width={300}
                    height={300}
                    className="w-full rounded-lg"
                    priority
                  />
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-sage/10 p-1.5 -rotate-1">
                  <Image
                    src={`${STORAGE_BASE}/2026-03_19_rose-arbor-reading-nook.png`}
                    alt="Rose Arbor Reading Nook coloring page"
                    width={300}
                    height={300}
                    className="w-full rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full text-cream-dark" aria-hidden="true">
            <path
              d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </div>
      </section>

      {/* ━━━ Page Preview Gallery ━━━ */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sage font-medium tracking-[0.2em] uppercase text-sm text-center mb-4">
            Peek Inside
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark text-center mb-4">
            Pages That Bring You Peace
          </h2>
          <p className="text-bark/60 text-center max-w-xl mx-auto mb-12">
            Every page is designed for calm. From cozy cottages to woodland creatures,
            each illustration invites you to slow down and breathe.
          </p>

          {/* Scrolling preview grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { title: 'Wildflower Cottage', file: '2026-03_01_wildflower-cottage.png' },
              { title: 'Spring Tea Setting', file: '2026-03_05_spring-tea-setting.png' },
              { title: 'Enchanted Greenhouse', file: '2026-03_11_enchanted-greenhouse.png' },
              { title: 'Wisteria Archway', file: '2026-03_08_wisteria-archway.png' },
              { title: 'Kitten in the Garden', file: '2026-03_26_kitten-in-the-garden.png' },
              { title: 'Bluebird on a Branch', file: '2026-03_06_bluebird-on-a-branch.png' },
              { title: 'Ducklings at the Pond', file: '2026-03_29_ducklings-at-the-pond.png' },
              { title: 'Hedgehog & Mushrooms', file: '2026-03_27_hedgehog-and-mushrooms.png' },
              { title: 'Fairy Mushroom Circle', file: '2026-03_14_fairy-mushroom-circle.png' },
              { title: 'Woodland Deer', file: '2026-03_22_woodland-deer.png' },
            ].map((page) => (
              <ImageLightbox key={page.file} src={`${STORAGE_BASE}/${page.file}`} alt={page.title}>
                <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-sage/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${STORAGE_BASE}/${page.file}`}
                      alt={page.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-bark/80 truncate">{page.title}</p>
                  </div>
                </div>
              </ImageLightbox>
            ))}
          </div>

          <p className="text-center text-bark/50 text-sm mt-8">
            This is just a preview &mdash; members get 30 new pages every month
          </p>
        </div>
      </section>

      {/* ━━━ Social Proof Section ━━━ */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sage font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Why People Love Coloring
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark">
              It&rsquo;s Not Just Coloring &mdash; It&rsquo;s Self-Care
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm text-center">
              <p className="font-heading text-5xl font-bold text-sage mb-3">62%</p>
              <p className="text-bark/70 text-sm leading-relaxed">
                of adults say coloring helps them manage stress and anxiety
              </p>
              <p className="text-bark/30 text-xs mt-3">Source: American Art Therapy Association</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm text-center">
              <p className="font-heading text-5xl font-bold text-sage mb-3">47%</p>
              <p className="text-bark/70 text-sm leading-relaxed">
                growth in digital coloring last year &mdash; people love coloring on iPad
              </p>
              <p className="text-bark/30 text-xs mt-3">Source: IBISWorld Digital Media Report</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm text-center">
              <p className="font-heading text-5xl font-bold text-sage mb-3">$3B</p>
              <p className="text-bark/70 text-sm leading-relaxed">
                adult coloring market and growing &mdash; join a global community of colorists
              </p>
              <p className="text-bark/30 text-xs mt-3">Source: Grand View Research</p>
            </div>
          </div>

          <p className="text-center text-bark/50 text-sm mt-8 max-w-xl mx-auto">
            Coloring has been clinically shown to reduce cortisol levels and activate the same
            brain regions as meditation. It&rsquo;s the screen-free ritual your evening is missing.
          </p>
        </div>
      </section>

      {/* ━━━ Is This For You? ━━━ */}
      <section className="py-16 md:py-24 bg-sage/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-rose font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Sound Familiar?
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark">
              Ink &amp; Meadow Is For You If&hellip;
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'You spend your evenings scrolling and wish you didn\u2019t',
              'You miss doing something creative with your hands',
              'You want a calming ritual that doesn\u2019t involve a screen',
              'You love the cottagecore aesthetic \u2014 wildflowers, cozy cottages, woodland creatures',
              'You\u2019ve tried meditation apps but they\u2019re not your thing',
              'You want something beautiful to do with a cup of tea',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-sage/10 shadow-sm">
                <svg className="w-5 h-5 text-sage mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-bark/70 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/checkout?plan=meadow"
              className="inline-block bg-sage text-white px-8 py-4 rounded-full font-medium hover:bg-sage-dark shadow-lg shadow-sage/20 transition-all"
            >
              Join the Meadow &mdash; $9/mo
            </Link>
            <p className="text-bark/40 text-xs mt-3">
              Includes the Starter Collection + 30 new pages every month
            </p>
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* ━━━ This Month's Collection Preview ━━━ */}
      <section className="py-16 md:py-20 bg-sage/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sage font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Coming This Month
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark mb-3">
            April: Secret Garden
          </h2>
          <p className="text-bark/60 max-w-lg mx-auto mb-8">
            30 brand-new pages featuring hidden garden paths, climbing roses, stone archways,
            and secret woodland clearings. Available to members on April 1st.
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {[
              { file: '2026-03_11_enchanted-greenhouse.png', alt: 'Preview 1' },
              { file: '2026-03_19_rose-arbor-reading-nook.png', alt: 'Preview 2' },
              { file: '2026-03_14_fairy-mushroom-circle.png', alt: 'Preview 3' },
              { file: '2026-03_16_meadow-stream-bridge.png', alt: 'Preview 4' },
            ].map((page, i) => (
              <div key={page.file} className={`bg-white rounded-xl shadow-lg border border-sage/10 p-1.5 w-24 md:w-32 ${i === 0 ? '-rotate-3' : i === 3 ? 'rotate-3' : i === 1 ? '-rotate-1' : 'rotate-1'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${STORAGE_BASE}/${page.file}`}
                  alt={page.alt}
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <Link
            href="/checkout?plan=meadow"
            className="inline-block bg-sage text-white px-8 py-3.5 rounded-full font-medium hover:bg-sage-dark shadow-md shadow-sage/20 transition-all"
          >
            Subscribe to Get This Collection &mdash; $9/mo
          </Link>
          <p className="text-bark/40 text-xs mt-3">Cancel anytime. Keep everything you&rsquo;ve downloaded.</p>
        </div>
      </section>

      <FloralDivider />

      {/* ━━━ What You Get / Pricing Section ━━━ */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-rose font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Choose Your Path
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-bark">
              What You Get
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Meadow Plan — PRIMARY */}
            <div className="bg-white rounded-2xl p-8 border-2 border-sage/30 shadow-md relative hover:shadow-lg transition-shadow order-first">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-xs font-medium px-4 py-1 rounded-full">
                Best Value
              </div>
              {/* Sample pages preview */}
              <div className="grid grid-cols-3 gap-1.5 mb-6 -mx-2 mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_05_spring-tea-setting.png" alt="Spring Tea Setting" className="rounded-lg aspect-square object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_06_bluebird-on-a-branch.png" alt="Bluebird on a Branch" className="rounded-lg aspect-square object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_08_wisteria-archway.png" alt="Wisteria Archway" className="rounded-lg aspect-square object-cover" />
              </div>
              <div className="mb-6">
                <p className="text-sage font-medium tracking-wide uppercase text-xs mb-2">
                  Monthly Membership
                </p>
                <h3 className="font-heading text-2xl font-semibold text-bark mb-1">
                  Meadow
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-bark">$9</span>
                  <span className="text-bark/50 text-sm">/month</span>
                </div>
                <p className="text-sage text-xs font-medium mt-1">60 pages month one &mdash; just $0.15/page</p>
              </div>
              <p className="text-bark/60 text-sm mb-6 leading-relaxed">
                Everything in the Starter plus 30 fresh pages every month. Your library grows, your calm deepens.
              </p>
              <ul className="space-y-3 mb-8">
                <PricingFeature>Starter Collection included (30 pages)</PricingFeature>
                <PricingFeature>30 brand-new pages every month</PricingFeature>
                <PricingFeature>PDF + PNG formats (print &amp; iPad)</PricingFeature>
                <PricingFeature>Full access to growing library</PricingFeature>
                <PricingFeature>Monthly themed collections</PricingFeature>
                <PricingFeature>Private community access</PricingFeature>
              </ul>
              <Link
                href="/checkout?plan=meadow"
                className="block text-center bg-sage text-white px-6 py-3.5 rounded-full font-medium hover:bg-sage-dark shadow-md shadow-sage/20 transition-all"
              >
                Join the Meadow &mdash; $9/mo
              </Link>
              <p className="text-bark/40 text-[11px] text-center mt-3">Cancel anytime. 30-day money-back guarantee.</p>
            </div>

            {/* Starter Collection — SECONDARY */}
            <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm hover:shadow-md transition-shadow">
              {/* Sample pages preview */}
              <div className="grid grid-cols-3 gap-1.5 mb-6 -mx-2 -mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_02_morning-garden-gate.png" alt="Morning Garden Gate" className="rounded-lg aspect-square object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_03_herb-window-box.png" alt="Herb Window Box" className="rounded-lg aspect-square object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_04_bunny-in-the-meadow.png" alt="Bunny in the Meadow" className="rounded-lg aspect-square object-cover" />
              </div>
              <div className="mb-6">
                <p className="text-golden font-medium tracking-wide uppercase text-xs mb-2">
                  One-Time Purchase
                </p>
                <h3 className="font-heading text-2xl font-semibold text-bark mb-1">
                  Starter Collection
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-bark">$7</span>
                  <span className="text-bark/50 text-sm">one-time</span>
                </div>
              </div>
              <p className="text-bark/60 text-sm mb-6 leading-relaxed">
                Not ready to subscribe? Try 30 pages and see why members stay.
              </p>
              <ul className="space-y-3 mb-6">
                <PricingFeature>30 hand-curated coloring pages</PricingFeature>
                <PricingFeature>Print-ready PDF + iPad-compatible PNG</PricingFeature>
                <PricingFeature>Mix of themes &amp; styles</PricingFeature>
                <PricingFeature>No new pages after purchase</PricingFeature>
              </ul>
              <Link
                href="/checkout?plan=starter"
                className="block text-center bg-cream-dark text-bark border border-bark/10 px-6 py-3 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
              >
                Get the Starter Collection
              </Link>
              <p className="text-bark/40 text-[11px] text-center mt-3">Instant download. 30-day money-back guarantee.</p>
            </div>

          </div>

          {/* Starter Collection detail — expandable */}
          <div id="starter-collection" className="max-w-3xl mx-auto mt-12">
            <details className="group">
              <summary className="text-center cursor-pointer list-none">
                <span className="text-sage text-sm font-medium hover:underline inline-flex items-center gap-1">
                  See all 30 Starter pages
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-6">
                {[
                  'Wildflower Cottage', 'Morning Garden Gate', 'Herb Window Box',
                  'Bunny in the Meadow', 'Spring Tea Setting', 'Bluebird on a Branch',
                  'Potting Shed', 'Wisteria Archway', 'Basket of Spring',
                  'Cottage Kitchen Herbs', 'Enchanted Greenhouse', 'Fox Family Den',
                  'Lavender Fields Forever', 'Fairy Mushroom Circle', 'Spring Mandala Garden',
                  'Meadow Stream Bridge', 'Honeybee Haven', 'Garden Tool Collection',
                  'Rose Arbor Reading Nook', 'Butterfly Botanical', 'Cottage Door Welcome',
                  'Woodland Deer', 'Botanical Letters', 'Rainy Day Window',
                  'Spring Wreath', 'Kitten in the Garden', 'Hedgehog & Mushrooms',
                  'Baby Owl in the Oak', 'Ducklings at the Pond', 'Squirrel with Acorns',
                ].map((title, i) => {
                  const num = String(i + 1).padStart(2, '0');
                  const slug = title.toLowerCase().replace(/[&\s]+/g, '-').replace(/--/g, '-');
                  const file = `2026-03_${num}_${slug}.png`;
                  return (
                    <ImageLightbox key={file} src={`${STORAGE_BASE}/${file}`} alt={title}>
                      <div className="group/card bg-white rounded-lg overflow-hidden shadow-sm border border-sage/10 hover:shadow-md transition-all">
                        <div className="aspect-square overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${STORAGE_BASE}/${file}`}
                            alt={title}
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-[10px] text-bark/60 text-center py-1.5 px-1 truncate">{title}</p>
                      </div>
                    </ImageLightbox>
                  );
                })}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ━━━ Guarantee + Trust ━━━ */}
      <div className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Prominent guarantee */}
          <div className="bg-sage/5 rounded-2xl p-8 md:p-10 border border-sage/15 text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-bark mb-3">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-bark/60 text-sm max-w-lg mx-auto leading-relaxed">
              Try it completely risk-free. If you don&rsquo;t love the pages, email us within 30 days
              and we&rsquo;ll refund every penny. No questions asked. You keep what you&rsquo;ve downloaded.
            </p>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7 text-sage/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Secure Checkout</p>
                <p className="text-bark/40 text-xs">Powered by Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7 text-sage/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Instant Access</p>
                <p className="text-bark/40 text-xs">Download in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7 text-sage/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Cancel Anytime</p>
                <p className="text-bark/40 text-xs">Keep what you&rsquo;ve downloaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloralDivider />

      {/* ━━━ Two Ways to Color ━━━ */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-rose font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Your Choice
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-bark">
              Two Ways to Color
            </h2>
            <p className="text-bark/60 max-w-xl mx-auto mt-4">
              Every page comes in two formats. Choose the experience that fits your mood.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Print option */}
            <div className="bg-white rounded-2xl p-8 border border-sage/10 shadow-sm">
              <div className="flex justify-center gap-2 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${STORAGE_BASE}/2026-03_09_basket-of-spring.png`} alt="Printed coloring page" className="w-28 rounded-lg shadow-md border border-bark/5" loading="lazy" />
              </div>
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-bark text-center mb-3">Print &amp; Color</h3>
              <ul className="space-y-2.5 text-sm text-bark/70">
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Download high-res PDF files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Print at home on any paper you like</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Use colored pencils, markers, or gel pens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Print unlimited copies &mdash; perfect for trying new palettes</span>
                </li>
              </ul>
            </div>

            {/* iPad option */}
            <div className="bg-white rounded-2xl p-8 border border-sage/10 shadow-sm">
              <div className="flex justify-center gap-2 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${STORAGE_BASE}/2026-03_07_potting-shed.png`} alt="iPad coloring page" className="w-28 rounded-lg shadow-md border border-bark/5" loading="lazy" />
              </div>
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-bark text-center mb-3">Color on iPad</h3>
              <ul className="space-y-2.5 text-sm text-bark/70">
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Download iPad-ready PNG files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Import into Procreate, GoodNotes, or any coloring app</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>Infinite undo &mdash; experiment with colors freely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#10003;</span>
                  <span>No mess, no supplies needed &mdash; just your Apple Pencil</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-bark/50 text-sm mt-8">
            Most members use both &mdash; print for cozy evenings, iPad for on-the-go relaxation
          </p>
        </div>
      </section>

      <FloralDivider />

      {/* ━━━ FAQ Section ━━━ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-golden font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Questions &amp; Answers
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-bark">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-6">
            <FaqItem
              question="Can I use these on my iPad?"
              answer="Absolutely! Every page comes as both a print-ready PDF and an iPad-compatible PNG. Import the PNG into Procreate, GoodNotes, or any coloring app. Set the line art layer to Multiply blend mode and color on a layer underneath — it works beautifully with Apple Pencil. Most members use both: print for cozy evenings at home, iPad for coloring on the go."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Absolutely. There are no contracts or commitments. You can cancel your Meadow membership anytime from your account page. You'll keep access through the end of your billing period, and any pages you've already downloaded are yours forever."
            />
            <FaqItem
              question="How do I access my pages?"
              answer="After signing up, you'll get an account on inkandmeadow.com where all your pages live. You can download them as high-resolution PDFs, ready to print. New pages appear in your library automatically each month."
            />
            <FaqItem
              question="What's in the Starter Collection?"
              answer="The Starter Collection includes 30 beautifully curated coloring pages spanning our most popular themes: wildflower gardens, cozy cottages, woodland creatures, tea-time scenes, and seasonal botanicals. It's a one-time purchase — no subscription needed. You get instant access to download and print them all."
            />
            <FaqItem
              question="What coloring supplies work best?"
              answer="For printing: we recommend cardstock (65-110 lb) and colored pencils like Prismacolor or markers like Staedtler fineliners. Heavier paper prevents bleed-through with markers. For iPad: an Apple Pencil and Procreate ($12.99 one-time) or the free Adobe Fresco app are all you need. Our pages are designed to look beautiful with any medium."
            />
          </div>
        </div>
      </section>

      {/* ━━━ Free Sample / Email Capture ━━━ */}
      <section id="free-sample" className="py-20 md:py-28 bg-sage/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 mb-8">
            {[
              '2026-03_26_kitten-in-the-garden.png',
              '2026-03_01_wildflower-cottage.png',
              '2026-03_29_ducklings-at-the-pond.png',
            ].map((file, i) => (
              <div key={file} className={`bg-white rounded-lg shadow-md border border-sage/10 p-1 w-24 md:w-32 ${i === 0 ? '-rotate-3' : i === 2 ? 'rotate-3' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/${file}`}
                  alt="Free sample page"
                  className="w-full aspect-square object-cover rounded"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark mb-3">
            Not Ready to Commit?
          </h2>
          <p className="text-bark/60 mb-8 max-w-lg mx-auto">
            Try 3 free coloring pages from our collection &mdash; no card required.
            Just enter your email and start coloring tonight.
          </p>
          <EmailCapture />
        </div>
      </section>

      <FloralDivider />

      {/* ━━━ Final CTA Section ━━━ */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <LeafAccent className="absolute top-10 left-10 w-20 h-20 text-sage hidden md:block opacity-50" />
        <LeafAccent className="absolute bottom-10 right-10 w-16 h-16 text-rose hidden md:block opacity-50 rotate-90" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Fan of pages above CTA */}
          <div className="flex justify-center gap-3 mb-12">
            {[
              { file: '2026-03_16_meadow-stream-bridge.png', alt: 'Meadow Stream Bridge', rotate: '-rotate-6' },
              { file: '2026-03_17_honeybee-haven.png', alt: 'Honeybee Haven', rotate: '-rotate-2' },
              { file: '2026-03_22_woodland-deer.png', alt: 'Woodland Deer', rotate: 'rotate-0' },
              { file: '2026-03_20_butterfly-botanical.png', alt: 'Butterfly Botanical', rotate: 'rotate-2' },
              { file: '2026-03_25_spring-wreath.png', alt: 'Spring Wreath', rotate: 'rotate-6' },
            ].map((page) => (
              <div key={page.file} className={`bg-white rounded-xl shadow-lg border border-sage/10 p-1.5 w-28 md:w-36 ${page.rotate} hover:scale-105 transition-transform`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/${page.file}`}
                  alt={page.alt}
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="font-heading text-4xl md:text-6xl font-semibold text-bark mb-6">
              Your Peaceful Evening
              <br />
              <span className="text-sage">Is Waiting</span>
            </h2>
            <p className="text-bark/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Close the laptop. Silence the notifications. Pick up your colored pencils
              and let something beautiful unfold.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout?plan=meadow"
                className="w-full sm:w-auto bg-sage text-white px-8 py-4 rounded-full font-medium hover:bg-sage-dark shadow-lg shadow-sage/20 transition-all"
              >
                Join the Meadow &mdash; $9/mo
              </Link>
              <Link
                href="/checkout?plan=starter"
                className="w-full sm:w-auto bg-cream-dark text-bark border-2 border-bark/15 px-8 py-4 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
              >
                Or Try 30 Pages &mdash; $7
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer className="border-t border-bark/10 py-12 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-heading text-xl font-semibold text-bark">
                Ink &amp; Meadow
              </p>
              <p className="text-bark/40 text-sm mt-1">
                A cottagecore coloring club for quiet souls.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-bark/50">
              <a href="#pricing" className="hover:text-sage transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-sage transition-colors">
                FAQ
              </a>
              <Link href="/checkout?plan=meadow" className="hover:text-sage transition-colors">
                Join
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-bark/30 text-xs">
            &copy; {new Date().getFullYear()} Ink &amp; Meadow. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA />

      {/* Exit intent popup */}
      <ExitIntentPopup />
    </div>
  );
}

/* ─── Reusable Sub-Components ─── */

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-bark/70">
      <svg
        className="w-4 h-4 text-sage mt-0.5 shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group bg-white rounded-xl border border-bark/5 shadow-sm">
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-heading text-lg font-semibold text-bark hover:text-sage transition-colors">
        {question}
        <svg
          className="w-5 h-5 text-bark/30 group-open:rotate-45 transition-transform shrink-0 ml-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <div className="px-6 pb-5 text-bark/60 text-sm leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
