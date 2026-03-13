import Link from "next/link";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import EmailCapture from "@/components/EmailCapture";

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

      {/* ━━━ Urgency Banner ━━━ */}
      <div className="fixed top-[65px] left-0 right-0 z-40 bg-bark text-white text-center py-2 px-4 text-sm">
        <span className="font-medium">Launch Special:</span> 30 coloring pages for just $7
        <span className="text-white/60 ml-1">(regular $12)</span>
        <span className="mx-2 text-white/30">|</span>
        <Link href="/checkout?plan=starter" className="underline font-medium hover:text-golden transition-colors">
          Grab it now
        </Link>
      </div>

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
                Beautiful cottagecore pages, delivered monthly.
              </p>
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
                <Link
                  href="/checkout?plan=starter"
                  className="w-full sm:w-auto bg-cream-dark text-bark border-2 border-bark/15 px-8 py-4 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
                >
                  Get the Starter Collection &mdash; $7
                </Link>
                <Link
                  href="/checkout?plan=meadow"
                  className="w-full sm:w-auto bg-sage text-white px-8 py-4 rounded-full font-medium hover:bg-sage-dark shadow-lg shadow-sage/20 transition-all"
                >
                  Join the Club &mdash; $9/mo
                </Link>
              </div>
              <p className="text-bark/40 text-sm mt-6">
                No contracts. Cancel anytime. Instant access.
              </p>
            </div>

            {/* Right: Hero image collage */}
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-3 -rotate-3">
                {/* Large featured image */}
                <div className="col-span-2 bg-white rounded-2xl overflow-hidden shadow-xl border border-sage/10 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_01_wildflower-cottage.png"
                    alt="Wildflower Cottage coloring page"
                    className="w-full rounded-xl"
                  />
                </div>
                {/* Two smaller images below */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-sage/10 p-1.5 rotate-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_14_fairy-mushroom-circle.png"
                    alt="Fairy Mushroom Circle coloring page"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-sage/10 p-1.5 -rotate-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_19_rose-arbor-reading-nook.png"
                    alt="Rose Arbor Reading Nook coloring page"
                    className="w-full rounded-lg"
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
              <div
                key={page.file}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-sage/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/${page.file}`}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-bark/80 truncate">{page.title}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-bark/50 text-sm mt-8">
            This is just a preview &mdash; members get 10&ndash;50+ new pages every month
          </p>
        </div>
      </section>

      {/* ━━━ Social Proof Section ━━━ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sage font-medium tracking-[0.2em] uppercase text-sm mb-4">
              From Our Community
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-bark">
              What Members Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TestimonialCard
              quote="I used to spend my evenings mindlessly scrolling. Now I look forward to unwinding with my coloring pages. It's become my favorite ritual."
              name="Sarah M."
              detail="Meadow member since 2025"
            />
            <TestimonialCard
              quote="The quality of the illustrations is incredible. Each page feels like a little escape to a world of wildflowers and cozy cottages."
              name="Emily R."
              detail="Cottage member since 2025"
            />
            <TestimonialCard
              quote="I bought the Starter Collection just to try it, and signed up for Meadow within a week. The themed collections are so thoughtfully curated."
              name="Jessica L."
              detail="Meadow member since 2025"
            />
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* ━━━ Starter Collection Showcase ━━━ */}
      <section id="starter-collection" className="py-20 md:py-28 bg-white/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-golden font-medium tracking-[0.2em] uppercase text-sm mb-4">
              See Every Page
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-bark mb-4">
              What&rsquo;s in the Starter Collection
            </h2>
            <p className="text-bark/60 max-w-2xl mx-auto mb-2">
              30 hand-curated coloring pages spanning wildflower gardens, cozy cottages,
              woodland creatures, tea-time scenes, and seasonal botanicals. Yours to keep forever.
            </p>
            <p className="text-sage font-semibold text-lg">
              Just $7 &mdash; that&rsquo;s just $0.23 per page
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 mt-12">
            {[
              { title: 'Wildflower Cottage', file: '2026-03_01_wildflower-cottage.png' },
              { title: 'Morning Garden Gate', file: '2026-03_02_morning-garden-gate.png' },
              { title: 'Herb Window Box', file: '2026-03_03_herb-window-box.png' },
              { title: 'Bunny in the Meadow', file: '2026-03_04_bunny-in-the-meadow.png' },
              { title: 'Spring Tea Setting', file: '2026-03_05_spring-tea-setting.png' },
              { title: 'Bluebird on a Branch', file: '2026-03_06_bluebird-on-a-branch.png' },
              { title: 'Potting Shed', file: '2026-03_07_potting-shed.png' },
              { title: 'Wisteria Archway', file: '2026-03_08_wisteria-archway.png' },
              { title: 'Basket of Spring', file: '2026-03_09_basket-of-spring.png' },
              { title: 'Cottage Kitchen Herbs', file: '2026-03_10_cottage-kitchen-herbs.png' },
              { title: 'Enchanted Greenhouse', file: '2026-03_11_enchanted-greenhouse.png' },
              { title: 'Fox Family Den', file: '2026-03_12_fox-family-den.png' },
              { title: 'Lavender Fields Forever', file: '2026-03_13_lavender-fields-forever.png' },
              { title: 'Fairy Mushroom Circle', file: '2026-03_14_fairy-mushroom-circle.png' },
              { title: 'Spring Mandala Garden', file: '2026-03_15_spring-mandala-garden.png' },
              { title: 'Meadow Stream Bridge', file: '2026-03_16_meadow-stream-bridge.png' },
              { title: 'Honeybee Haven', file: '2026-03_17_honeybee-haven.png' },
              { title: 'Garden Tool Collection', file: '2026-03_18_garden-tool-collection.png' },
              { title: 'Rose Arbor Reading Nook', file: '2026-03_19_rose-arbor-reading-nook.png' },
              { title: 'Butterfly Botanical', file: '2026-03_20_butterfly-botanical.png' },
              { title: 'Cottage Door Welcome', file: '2026-03_21_cottage-door-welcome.png' },
              { title: 'Woodland Deer', file: '2026-03_22_woodland-deer.png' },
              { title: 'Botanical Letters', file: '2026-03_23_botanical-letters-spring.png' },
              { title: 'Rainy Day Window', file: '2026-03_24_rainy-day-window.png' },
              { title: 'Spring Wreath', file: '2026-03_25_spring-wreath.png' },
              { title: 'Kitten in the Garden', file: '2026-03_26_kitten-in-the-garden.png' },
              { title: 'Hedgehog & Mushrooms', file: '2026-03_27_hedgehog-and-mushrooms.png' },
              { title: 'Baby Owl in the Oak', file: '2026-03_28_baby-owl-in-oak.png' },
              { title: 'Ducklings at the Pond', file: '2026-03_29_ducklings-at-the-pond.png' },
              { title: 'Squirrel with Acorns', file: '2026-03_30_squirrel-with-acorns.png' },
            ].map((page) => (
              <div
                key={page.file}
                className="group bg-white rounded-lg overflow-hidden shadow-sm border border-sage/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/${page.file}`}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] text-bark/60 text-center py-1.5 px-1 truncate">{page.title}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/checkout?plan=starter"
              className="inline-block bg-bark text-white px-10 py-4 rounded-full font-medium hover:bg-bark/90 shadow-lg transition-all text-lg"
            >
              Get All 30 Pages &mdash; $7
            </Link>
            <p className="text-bark/40 text-xs mt-3">Instant download. Print as many copies as you want. Keep forever.</p>
          </div>
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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Collection */}
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
                <p className="text-sage text-xs font-medium mt-1">Only $0.23 per page</p>
              </div>
              <p className="text-bark/60 text-sm mb-6 leading-relaxed">
                Perfect for trying before subscribing. A beautifully curated introduction to the Ink&nbsp;&amp;&nbsp;Meadow style.
              </p>
              <ul className="space-y-3 mb-6">
                <PricingFeature>27 hand-curated coloring pages</PricingFeature>
                <PricingFeature>Instant PDF download</PricingFeature>
                <PricingFeature>Mix of themes &amp; styles</PricingFeature>
                <PricingFeature>Print unlimited copies</PricingFeature>
              </ul>
              <a
                href="#starter-collection"
                className="block text-center text-sage text-xs font-medium mb-4 hover:underline"
              >
                See all 30 pages included &darr;
              </a>
              <Link
                href="/checkout?plan=starter"
                className="block text-center bg-cream-dark text-bark border border-bark/10 px-6 py-3 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
              >
                Get the Starter Collection
              </Link>
            </div>

            {/* Meadow Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-sage/30 shadow-md relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-xs font-medium px-4 py-1 rounded-full">
                Most Popular
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
              </div>
              <p className="text-bark/60 text-sm mb-6 leading-relaxed">
                Your monthly dose of calm. Fresh pages and a growing library that&rsquo;s always there for you.
              </p>
              <ul className="space-y-3 mb-8">
                <PricingFeature>10 new pages every month</PricingFeature>
                <PricingFeature>Access to growing library</PricingFeature>
                <PricingFeature>Private community access</PricingFeature>
                <PricingFeature>Monthly themed collections</PricingFeature>
                <PricingFeature>Printable bookmarks &amp; extras</PricingFeature>
              </ul>
              <Link
                href="/checkout?plan=meadow"
                className="block text-center bg-sage text-white px-6 py-3 rounded-full font-medium hover:bg-sage-dark shadow-md shadow-sage/20 transition-all"
              >
                Join the Meadow
              </Link>
            </div>

            {/* Cottage Plan */}
            <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm hover:shadow-md transition-shadow">
              {/* Sample pages preview — premium exclusive pages */}
              <div className="grid grid-cols-3 gap-1.5 mb-6 -mx-2 -mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_11_enchanted-greenhouse.png" alt="Enchanted Greenhouse" className="rounded-lg aspect-square object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_12_fox-family-den.png" alt="Fox Family Den" className="rounded-lg aspect-square object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_13_lavender-fields-forever.png" alt="Lavender Fields Forever" className="rounded-lg aspect-square object-cover" />
              </div>
              <div className="mb-6">
                <p className="text-golden font-medium tracking-wide uppercase text-xs mb-2">
                  Premium Membership
                </p>
                <h3 className="font-heading text-2xl font-semibold text-bark mb-1">
                  Cottage
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-bark">$49</span>
                  <span className="text-bark/50 text-sm">/month</span>
                </div>
              </div>
              <p className="text-bark/60 text-sm mb-6 leading-relaxed">
                The ultimate coloring experience. Massive library, exclusive content, and perks you won&rsquo;t find anywhere else.
              </p>
              <ul className="space-y-3 mb-8">
                <PricingFeature>Everything in Meadow</PricingFeature>
                <PricingFeature>50+ pages monthly</PricingFeature>
                <PricingFeature>Exclusive premium collections</PricingFeature>
                <PricingFeature>Early access to new releases</PricingFeature>
                <PricingFeature>Printable wall art &amp; greeting cards</PricingFeature>
                <PricingFeature>Monthly coloring challenges with prizes</PricingFeature>
              </ul>
              <Link
                href="/checkout?plan=cottage"
                className="block text-center bg-cream-dark text-bark border border-bark/10 px-6 py-3 rounded-full font-medium hover:border-golden hover:text-golden transition-all"
              >
                Join the Cottage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Trust Badges ━━━ */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-sage shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">100% Satisfaction</p>
                <p className="text-bark/50 text-xs">Love it or get a full refund</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-sage shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Secure Checkout</p>
                <p className="text-bark/50 text-xs">Powered by Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-sage shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-left">
                <p className="text-bark font-medium text-sm">Instant Access</p>
                <p className="text-bark/50 text-xs">Download immediately after purchase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloralDivider />

      {/* ━━━ How It Works Section ━━━ */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-rose font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Simple as Can Be
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-bark">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sage/10 mb-5 mx-auto max-w-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_09_basket-of-spring.png"
                  alt="Basket of Spring coloring page"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-sage/10 text-sage font-heading text-lg font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold text-bark mb-3">Choose Your Plan</h3>
              <p className="text-bark/60 text-sm leading-relaxed">Pick the Starter Collection, Meadow, or Cottage — whatever suits your coloring rhythm.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sage/10 mb-5 mx-auto max-w-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_07_potting-shed.png"
                  alt="Potting Shed coloring page"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-sage/10 text-sage font-heading text-lg font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold text-bark mb-3">Download &amp; Print</h3>
              <p className="text-bark/60 text-sm leading-relaxed">Get instant access to your pages. Print them at home on your favorite paper, as many times as you like.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sage/10 mb-5 mx-auto max-w-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-03/2026-03_15_spring-mandala-garden.png"
                  alt="Spring Mandala Garden coloring page"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-sage/10 text-sage font-heading text-lg font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold text-bark mb-3">Color, Breathe, Repeat</h3>
              <p className="text-bark/60 text-sm leading-relaxed">Pour a cup of tea, pick up your pencils, and let the world fade away. New pages arrive every month.</p>
            </div>
          </div>
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
              question="What paper should I use?"
              answer="We recommend printing on cardstock (65-110 lb) for the best coloring experience. Regular printer paper works too, but heavier paper prevents bleed-through if you're using markers. Each download includes a paper guide with our recommendations."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Absolutely. There are no contracts or commitments. You can cancel your Meadow or Cottage membership anytime from your account page. You'll keep access through the end of your billing period, and any pages you've already downloaded are yours forever."
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
              answer="Our pages are designed to look beautiful with any medium — colored pencils, gel pens, fine-tip markers, or even watercolor pencils. We recommend printing on cardstock if you're using markers. Many of our members love Prismacolor colored pencils or Staedtler fineliners for the detailed sections."
            />
          </div>
        </div>
      </section>

      {/* ━━━ Free Sample / Email Capture ━━━ */}
      <section className="py-20 md:py-28 bg-sage/5">
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
                href="/checkout?plan=starter"
                className="w-full sm:w-auto bg-cream-dark text-bark border-2 border-bark/15 px-8 py-4 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
              >
                Get the Starter Collection &mdash; $7
              </Link>
              <Link
                href="/checkout?plan=meadow"
                className="w-full sm:w-auto bg-sage text-white px-8 py-4 rounded-full font-medium hover:bg-sage-dark shadow-lg shadow-sage/20 transition-all"
              >
                Join the Club &mdash; $9/mo
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

function TestimonialCard({
  quote,
  name,
  detail,
}: {
  quote: string;
  name: string;
  detail: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm">
      <svg
        className="w-8 h-8 text-rose/30 mb-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.196 0-2.322-.585-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.196 0-2.322-.585-2.917-1.179z" />
      </svg>
      <p className="text-bark/70 text-sm leading-relaxed mb-6">{quote}</p>
      <div>
        <p className="font-medium text-bark text-sm">{name}</p>
        <p className="text-bark/40 text-xs">{detail}</p>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-sage/10 text-sage font-heading text-2xl font-bold flex items-center justify-center mx-auto mb-5">
        {number}
      </div>
      <h3 className="font-heading text-xl font-semibold text-bark mb-3">
        {title}
      </h3>
      <p className="text-bark/60 text-sm leading-relaxed">{description}</p>
    </div>
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
