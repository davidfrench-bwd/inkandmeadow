"use client";

import { type ColoringPage, type MemberPlan, getThemeColor } from "@/lib/mock-data";

interface PageCardProps {
  page: ColoringPage;
  memberPlan: MemberPlan;
  onDownload?: (pageId: string) => void;
}

export default function PageCard({ page, memberPlan, onDownload }: PageCardProps) {
  const isLocked = page.isPremium && memberPlan !== "cottage";
  const themeClasses = getThemeColor(page.theme);

  return (
    <div
      className={`
        group relative rounded-2xl border-2 transition-all duration-300
        ${isLocked
          ? "border-stone-200 bg-stone-50 opacity-80"
          : "border-[#d4c8a8] bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4c8a8]/30"
        }
      `}
    >
      {/* Decorative corner flourishes */}
      <div className="absolute top-2 left-2 text-[#b8a88a]/30 text-xs select-none pointer-events-none">&#10044;</div>
      <div className="absolute top-2 right-2 text-[#b8a88a]/30 text-xs select-none pointer-events-none">&#10044;</div>
      <div className="absolute bottom-2 left-2 text-[#b8a88a]/30 text-xs select-none pointer-events-none">&#10044;</div>
      <div className="absolute bottom-2 right-2 text-[#b8a88a]/30 text-xs select-none pointer-events-none">&#10044;</div>

      {/* Preview placeholder */}
      <div
        className={`
          relative m-3 mb-0 rounded-xl flex items-center justify-center aspect-[3/4] overflow-hidden
          ${isLocked ? "bg-stone-100" : "bg-[#f5f0e8]"}
        `}
      >
        {/* Botanical SVG icon */}
        <svg
          className={`w-16 h-16 ${isLocked ? "text-stone-300" : "text-[#b8a88a]/50"}`}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 56V28" />
          <path d="M32 28c-6-8-16-10-18-4s6 14 18 4" />
          <path d="M32 28c6-8 16-10 18-4s-6 14-18 4" />
          <path d="M32 38c-4-6-12-8-14-3s4 11 14 3" />
          <path d="M32 38c4-6 12-8 14-3s-4 11-14 3" />
          <path d="M26 56h12" />
          <circle cx="32" cy="20" r="4" />
        </svg>

        {/* Premium badge */}
        {page.isPremium && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
            Premium
          </div>
        )}

        {/* Lock overlay for non-Cottage members on premium pages */}
        {isLocked && (
          <div className="absolute inset-0 bg-stone-200/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 rounded-xl">
            <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-xs text-stone-500 font-medium">Cottage Plan</span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-3 pt-2.5">
        {/* Theme tag */}
        <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${themeClasses}`}>
          {page.theme}
        </span>

        {/* Title */}
        <h3 className="text-sm font-semibold text-[#5a4a3a] leading-snug mb-2.5 line-clamp-2">
          {page.title}
        </h3>

        {/* Action */}
        {isLocked ? (
          <button className="w-full text-xs font-medium py-2 px-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200 hover:from-amber-100 hover:to-amber-200 transition-colors">
            Upgrade to Cottage
          </button>
        ) : (
          <button
            onClick={() => onDownload?.(page.id)}
            className="w-full text-xs font-medium py-2 px-3 rounded-lg bg-[#7a8f6e] text-white hover:bg-[#6a7f5e] transition-colors flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download
          </button>
        )}
      </div>
    </div>
  );
}
