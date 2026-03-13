"use client";

import { useState } from "react";
import Link from "next/link";
import { mockMember, collections } from "@/lib/mock-data";

const downloadHistory = [
  { id: "dh-1", pageTitle: "Wildflower Cottage", collection: "March 2026: Spring Awakening", date: "2026-03-10", format: "PDF" },
  { id: "dh-2", pageTitle: "Morning Garden Gate", collection: "March 2026: Spring Awakening", date: "2026-03-09", format: "PDF" },
  { id: "dh-3", pageTitle: "Bunny in the Meadow", collection: "March 2026: Spring Awakening", date: "2026-03-07", format: "PDF" },
  { id: "dh-4", pageTitle: "Cozy Reading Nook", collection: "February 2026: Fireside Comfort", date: "2026-02-22", format: "PDF" },
  { id: "dh-5", pageTitle: "Cat on a Cushion", collection: "February 2026: Fireside Comfort", date: "2026-02-20", format: "PDF" },
  { id: "dh-6", pageTitle: "Fireplace Mantel", collection: "February 2026: Fireside Comfort", date: "2026-02-18", format: "PDF" },
  { id: "dh-7", pageTitle: "Snow-Covered Cottage", collection: "January 2026: Winter Woodland", date: "2026-01-15", format: "PDF" },
  { id: "dh-8", pageTitle: "Woodland Fox", collection: "January 2026: Winter Woodland", date: "2026-01-14", format: "PDF" },
  { id: "dh-9", pageTitle: "Deer in Snowfall", collection: "January 2026: Winter Woodland", date: "2026-01-10", format: "PDF" },
  { id: "dh-10", pageTitle: "Evergreen Wreath", collection: "January 2026: Winter Woodland", date: "2026-01-08", format: "PDF" },
];

const plans = [
  {
    id: "starter" as const,
    name: "Starter",
    price: "$27",
    period: "one-time",
    description: "27 hand-picked coloring pages to get you started",
    features: [
      "27 curated coloring pages",
      "High-resolution PDF downloads",
      "Print unlimited copies for personal use",
    ],
    color: "border-stone-300 bg-stone-50",
    badge: "bg-stone-100 text-stone-700",
  },
  {
    id: "meadow" as const,
    name: "Meadow",
    price: "$9",
    period: "/month",
    description: "Fresh inspiration every month with 10 new pages",
    features: [
      "10 new pages every month",
      "Access to full back catalog",
      "High-resolution PDF downloads",
      "Print unlimited copies for personal use",
      "Facebook community access",
    ],
    color: "border-emerald-300 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    popular: true,
  },
  {
    id: "cottage" as const,
    name: "Cottage",
    price: "$19",
    period: "/month",
    description: "The complete experience with 50+ pages and exclusives",
    features: [
      "50+ pages every month",
      "All Meadow features included",
      "Premium exclusive designs",
      "Early access to new collections",
      "Behind-the-scenes content",
      "Printable journal pages & bookmarks",
    ],
    color: "border-amber-300 bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
  },
];

export default function AccountPage() {
  const member = mockMember;
  const [showAllHistory, setShowAllHistory] = useState(false);
  const currentPlan = plans.find((p) => p.id === member.plan)!;
  const visibleHistory = showAllHistory ? downloadHistory : downloadHistory.slice(0, 5);

  const totalAvailablePages =
    member.plan === "cottage"
      ? collections.reduce((sum, c) => sum + c.pages.length, 0)
      : member.plan === "meadow"
        ? collections.reduce((sum, c) => sum + c.pages.filter((p) => !p.isPremium).length, 0)
        : member.purchasedPageIds.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-4xl">
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3a2a] mb-1">My Account</h1>
        <p className="text-[#8a7a6a] text-sm">Manage your membership, profile, and downloads</p>
      </div>

      {/* ── Profile Card ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e8e0d0] p-5 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Profile</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#7a8f6e] flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
            {member.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-[#4a3a2a]">{member.name}</h3>
            <p className="text-sm text-[#8a7a6a]">{member.email}</p>
            <p className="text-xs text-[#a09080] mt-1">
              Member since {new Date(member.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
          <button className="text-xs font-medium px-4 py-2 rounded-lg border border-[#e8e0d0] text-[#7a6a5a] hover:bg-[#f5f0e8] transition-colors flex-shrink-0">
            Edit Profile
          </button>
        </div>
      </div>

      {/* ── Current Plan Card ────────────────────────────────── */}
      <div className={`rounded-2xl border-2 p-5 sm:p-6 mb-6 ${currentPlan.color}`}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-[#4a3a2a]">{currentPlan.name} Plan</h2>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${currentPlan.badge}`}>
                Active
              </span>
            </div>
            <p className="text-sm text-[#7a6a5a]">{currentPlan.description}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#4a3a2a]">{currentPlan.price}</span>
            <span className="text-sm text-[#8a7a6a]">{currentPlan.period}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-[#9a8a7a] mb-0.5">Available Pages</p>
            <p className="text-lg font-bold text-[#4a3a2a]">{totalAvailablePages}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-[#9a8a7a] mb-0.5">Total Downloads</p>
            <p className="text-lg font-bold text-[#4a3a2a]">{member.totalDownloads}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-[#9a8a7a] mb-0.5">Collections</p>
            <p className="text-lg font-bold text-[#4a3a2a]">{collections.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 bg-[#5a4a3a] text-white text-sm font-semibold rounded-xl hover:bg-[#4a3a2a] transition-colors">
            Manage Subscription
          </button>
          <button className="px-5 py-2.5 bg-white/80 text-[#5a4a3a] text-sm font-medium rounded-xl border border-[#d4c8a8] hover:bg-white transition-colors">
            Billing History
          </button>
        </div>
      </div>

      {/* ── Upgrade CTA ──────────────────────────────────────── */}
      {member.plan !== "cottage" && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Available Plans</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {plans
              .filter((p) => {
                if (member.plan === "starter") return p.id === "meadow" || p.id === "cottage";
                if (member.plan === "meadow") return p.id === "cottage";
                return false;
              })
              .map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-5 ${plan.color} hover:shadow-md transition-shadow`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500 text-white shadow-sm">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-[#4a3a2a]">{plan.price}</span>
                    <span className="text-sm text-[#8a7a6a]">{plan.period}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#4a3a2a] mb-1">{plan.name}</h3>
                  <p className="text-sm text-[#7a6a5a] mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#5a4a3a]">
                        <svg className="w-4 h-4 text-[#7a8f6e] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      plan.id === "cottage"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                        : "bg-[#7a8f6e] text-white hover:bg-[#6a7f5e]"
                    }`}
                  >
                    Upgrade to {plan.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ── Download History ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e8e0d0] p-5 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Download History</h2>
        <div className="divide-y divide-[#f0ebe3]">
          {visibleHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#b8a88a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#4a3a2a] truncate">{item.pageTitle}</p>
                  <p className="text-xs text-[#a09080] truncate">{item.collection}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-[#9a8a7a]">
                  {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
                <p className="text-[10px] text-[#b0a090] uppercase">{item.format}</p>
              </div>
            </div>
          ))}
        </div>
        {downloadHistory.length > 5 && (
          <button
            onClick={() => setShowAllHistory(!showAllHistory)}
            className="w-full mt-3 py-2 text-xs font-medium text-[#7a8f6e] hover:text-[#5a6f4e] transition-colors"
          >
            {showAllHistory ? "Show Less" : `View All (${downloadHistory.length})`}
          </button>
        )}
      </div>

      {/* ── Danger Zone ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e8e0d0] p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Account Settings</h2>
        <div className="flex flex-wrap gap-3">
          <button className="text-xs font-medium px-4 py-2 rounded-lg border border-[#e8e0d0] text-[#7a6a5a] hover:bg-[#f5f0e8] transition-colors">
            Change Password
          </button>
          <button className="text-xs font-medium px-4 py-2 rounded-lg border border-[#e8e0d0] text-[#7a6a5a] hover:bg-[#f5f0e8] transition-colors">
            Email Preferences
          </button>
          <button className="text-xs font-medium px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* ── Decorative footer ────────────────────────────────── */}
      <div className="mt-12 text-center text-[#c4b89a] select-none">
        <div className="text-3xl leading-none mb-2">&#8226; &#10048; &#8226; &#10047; &#8226; &#10048; &#8226;</div>
        <p className="text-xs tracking-[0.2em] uppercase">Ink &amp; Meadow &mdash; Made with care</p>
      </div>
    </div>
  );
}
