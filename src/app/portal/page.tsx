"use client";

import { useState } from "react";
import { useMember } from "./MemberContext";
import type { PageData, CollectionGroup } from "./MemberContext";
import PageCard from "@/components/PageCard";

export default function PortalDashboard() {
  const { member, pages, collections, loading, error } = useMember();
  const [expandedCollection, setExpandedCollection] = useState<string>("");

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#7a8f6e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8a7a6a] text-sm">Loading your pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const planLabel = member?.plan === "plus" ? "Plus" : member?.plan === "meadow" ? "Ink & Meadow" : "Starter";
  const emailName = member?.email?.split("@")[0] ?? "there";

  // Auto-expand the first collection
  const firstMonth = collections[0]?.month ?? "";
  const activeExpanded = expandedCollection || firstMonth;

  function handleDownload(pageId: string) {
    window.open(`/api/download?page_id=${pageId}`, "_blank");
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3a2a] mb-1">
          Welcome back, {emailName}
        </h1>
        <p className="text-[#8a7a6a] text-sm sm:text-base">
          Your {planLabel} membership is active &mdash; happy coloring!
        </p>
      </div>

      {/* Upgrade banner for meadow members */}
      {member?.plan === "meadow" && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#f0ebe3] to-[#e8f0e4] border border-[#d4c8a8] relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-[#c4b89a]/20 text-[120px] leading-none select-none pointer-events-none">&#10048;</div>
          <div className="relative">
            <h2 className="text-lg font-bold text-[#4a3a2a] mb-1">
              Upgrade to Plus for 100 exclusive pages per month
            </h2>
            <p className="text-sm text-[#7a6a5a] mb-4 max-w-lg">
              Get 100 exclusive pages plus premium seasonal collections delivered to your portal every month.
            </p>
            <a
              href="/checkout"
              className="inline-block px-5 py-2.5 bg-[#7a8f6e] text-white text-sm font-semibold rounded-xl hover:bg-[#6a7f5e] transition-colors shadow-sm"
            >
              Upgrade to Plus &mdash; $29/mo
            </a>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Plan</p>
          <p className="text-lg font-bold text-[#4a3a2a]">{planLabel}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Available Pages</p>
          <p className="text-lg font-bold text-[#4a3a2a]">
            {(member?.plan === "meadow" || member?.plan === "plus") ? pages.length : pages.filter((p) => !p.is_premium).length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
          <p className="text-xs text-[#9a8a7a] uppercase tracking-wider font-medium mb-1">Collections</p>
          <p className="text-lg font-bold text-[#4a3a2a]">{collections.length}</p>
        </div>
      </div>

      {/* Collections */}
      <div id="collections" className="space-y-8">
        {collections.map((collection) => {
          const isExpanded = activeExpanded === collection.month;
          const accessiblePages =
            (member?.plan === "meadow" || member?.plan === "plus")
              ? collection.pages
              : collection.pages; // show all, but PageCard will lock premium ones

          const premiumCount = collection.pages.filter((p) => p.is_premium).length;

          return (
            <section key={collection.month} className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden">
              <button
                onClick={() => setExpandedCollection(isExpanded ? "" : collection.month)}
                className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#faf7f2]/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-[#4a3a2a]">
                      {collection.name}
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                      {collection.pages.length} Pages
                    </span>
                  </div>
                  {member?.plan !== "meadow" && member?.plan !== "plus" && premiumCount > 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      + {premiumCount} premium pages available with a membership
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

              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 border-t border-[#f0ebe3]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 pt-5">
                    {accessiblePages.map((page) => (
                      <PageCard
                        key={page.id}
                        page={page}
                        memberPlan={member?.plan ?? "starter"}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Decorative footer */}
      <div className="mt-12 text-center text-[#c4b89a] select-none">
        <div className="text-3xl leading-none mb-2">&#8226; &#10048; &#8226; &#10047; &#8226; &#10048; &#8226;</div>
        <p className="text-xs tracking-[0.2em] uppercase">Ink &amp; Meadow &mdash; Made with care</p>
      </div>
    </div>
  );
}
