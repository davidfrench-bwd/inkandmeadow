"use client";

import { useState } from "react";
import { collections, mockMember, getPagesForMember, getPremiumPagesCount } from "@/lib/mock-data";
import type { ColoringPage } from "@/lib/mock-data";
import PageCard from "@/components/PageCard";

const themeFilters = ["All", "Florals", "Animals", "Cozy Spaces", "Nature", "Cottagecore", "Seasonal"] as const;

export default function PortalDashboard() {
  const member = mockMember;
  const [activeTheme, setActiveTheme] = useState<string>("All");
  const [expandedCollection, setExpandedCollection] = useState<string>(collections[0].id);

  const planLabel = member.plan === "cottage" ? "Cottage" : member.plan === "meadow" ? "Meadow" : "Starter";

  function handleDownload(pageId: string) {
    // Placeholder for download logic
    alert(`Downloading page ${pageId}... (This will connect to Supabase storage later)`);
  }

  function getFilteredPages(pages: ColoringPage[]): ColoringPage[] {
    if (activeTheme === "All") return pages;
    return pages.filter((p) => p.theme === activeTheme);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl">
      {/* ── Welcome header ───────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3a2a] mb-1">
          Welcome back, {member.name.split(" ")[0]}
        </h1>
        <p className="text-[#8a7a6a] text-sm sm:text-base">
          Your {planLabel} membership is active &mdash; happy coloring!
        </p>
      </div>

      {/* ── Starter upgrade banner ───────────────────────────── */}
      {member.plan === "starter" && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#f0ebe3] to-[#e8f0e4] border border-[#d4c8a8] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 text-[#c4b89a]/20 text-[120px] leading-none select-none pointer-events-none">&#10048;</div>
          <div className="relative">
            <h2 className="text-lg font-bold text-[#4a3a2a] mb-1">
              Upgrade to Meadow for fresh pages every month
            </h2>
            <p className="text-sm text-[#7a6a5a] mb-4 max-w-lg">
              You have {member.purchasedPageIds.length} purchased pages. With Meadow, you&apos;ll get 10 new curated
              coloring pages delivered to your portal every single month.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-[#7a8f6e] text-white text-sm font-semibold rounded-xl hover:bg-[#6a7f5e] transition-colors shadow-sm">
                Upgrade to Meadow &mdash; $9/mo
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-colors shadow-sm">
                Go Cottage &mdash; $19/mo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Stats cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Plan</p>
          <p className="text-lg font-bold text-[#4a3a2a]">{planLabel}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Downloads</p>
          <p className="text-lg font-bold text-[#4a3a2a]">{member.totalDownloads}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Available Pages</p>
          <p className="text-lg font-bold text-[#4a3a2a]">
            {member.plan === "cottage"
              ? collections.reduce((sum, c) => sum + c.pages.length, 0)
              : member.plan === "meadow"
                ? collections.reduce((sum, c) => sum + c.pages.filter((p) => !p.isPremium).length, 0)
                : member.purchasedPageIds.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Collections</p>
          <p className="text-lg font-bold text-[#4a3a2a]">{collections.length}</p>
        </div>
      </div>

      {/* ── Theme filter ─────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2">
        {themeFilters.map((theme) => (
          <button
            key={theme}
            onClick={() => setActiveTheme(theme)}
            className={`
              px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border
              ${activeTheme === theme
                ? "bg-[#7a8f6e] text-white border-[#7a8f6e]"
                : "bg-white text-[#7a6a5a] border-[#e8e0d0] hover:bg-[#f5f0e8] hover:border-[#d4c8a8]"
              }
            `}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* ── Collections ──────────────────────────────────────── */}
      <div id="collections" className="space-y-8">
        {collections.map((collection) => {
          const memberPages = getPagesForMember(collection, member);
          const filteredPages = getFilteredPages(memberPages);
          const premiumCount = getPremiumPagesCount(collection);
          const isExpanded = expandedCollection === collection.id;

          // For Cottage members, show all; for others, show available + locked premium previews
          const allFilteredPages = getFilteredPages(collection.pages);
          const displayPages = member.plan === "cottage" ? filteredPages : allFilteredPages;

          return (
            <section key={collection.id} className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden">
              {/* Collection header */}
              <button
                onClick={() => setExpandedCollection(isExpanded ? "" : collection.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#faf7f2]/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-[#4a3a2a]">
                      {collection.month}: {collection.title}
                    </h2>
                    {member.plan === "cottage" && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border border-amber-300">
                        {collection.pages.length} Pages
                      </span>
                    )}
                    {member.plan === "meadow" && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {memberPages.length} Pages
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#8a7a6a]">{collection.subtitle}</p>
                  {member.plan !== "cottage" && premiumCount > 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      + {premiumCount} premium pages available with Cottage
                    </p>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-[#9a8a7a] flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Pages grid */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 border-t border-[#f0ebe3]">
                  {displayPages.length === 0 ? (
                    <p className="text-center text-sm text-[#9a8a7a] py-12">
                      No pages match the selected theme in this collection.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 pt-5">
                      {displayPages.map((page) => (
                        <PageCard
                          key={page.id}
                          page={page}
                          memberPlan={member.plan}
                          onDownload={handleDownload}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* ── Decorative footer ────────────────────────────────── */}
      <div className="mt-12 text-center text-[#c4b89a] select-none">
        <div className="text-3xl leading-none mb-2">&#8226; &#10048; &#8226; &#10047; &#8226; &#10048; &#8226;</div>
        <p className="text-xs tracking-[0.2em] uppercase">Ink &amp; Meadow &mdash; Made with care</p>
      </div>
    </div>
  );
}
