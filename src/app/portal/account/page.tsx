"use client";

import { useState, useCallback } from "react";
import { useMember } from "../MemberContext";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

const upgradePlans = [
  {
    id: "plus" as const,
    name: "Ink & Meadow Plus",
    price: "$29",
    period: "/month",
    description: "300 exclusive pages per month + premium seasonal collections",
    features: [
      "300 exclusive pages per month",
      "Premium seasonal collections",
      "Early access to new pages",
      "Access to full back catalog",
      "High-resolution PDF downloads",
    ],
    color: "border-emerald-300 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    popular: true,
  },
];

export default function AccountPage() {
  const { member, pages, collections } = useMember();
  const router = useRouter();
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleManageSubscription = useCallback(async () => {
    if (!member?.email) return;
    setIsManagingSubscription(true);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: member.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Portal error:", data.error);
        alert(data.error || "Failed to open subscription portal");
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("Portal error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsManagingSubscription(false);
    }
  }, [member?.email]);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!member) return null;

  const planLabel = member.plan === "plus" ? "Ink & Meadow Plus" : member.plan === "meadow" ? "Ink & Meadow" : "Starter";
  const planColor =
    (member.plan === "meadow" || member.plan === "plus")
      ? "border-emerald-300 bg-emerald-50"
      : "border-stone-300 bg-stone-50";
  const badgeColor =
    (member.plan === "meadow" || member.plan === "plus")
      ? "bg-emerald-100 text-emerald-700"
      : "bg-stone-100 text-stone-700";

  const totalAvailablePages =
    (member.plan === "meadow" || member.plan === "plus") ? pages.length : pages.filter((p) => !p.is_premium).length;

  const memberSince = new Date(member.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3a2a] mb-1">My Account</h1>
        <p className="text-[#8a7a6a] text-sm">Manage your membership and profile</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#e8e0d0] p-5 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Profile</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#7a8f6e] flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
            {member.email[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-[#4a3a2a]">{member.email}</p>
            <p className="text-xs text-[#a09080] mt-1">Member since {memberSince}</p>
          </div>
        </div>
      </div>

      {/* Current Plan Card */}
      <div className={`rounded-2xl border-2 p-5 sm:p-6 mb-6 ${planColor}`}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-[#4a3a2a]">{planLabel} Plan</h2>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColor}`}>
                {member.status === "active" ? "Active" : member.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#4a3a2a]">
              {member.plan === "plus" ? "$29" : "$7"}
            </span>
            <span className="text-sm text-[#8a7a6a]">
              /month
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-[#9a8a7a] mb-0.5">Available Pages</p>
            <p className="text-lg font-bold text-[#4a3a2a]">{totalAvailablePages}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-[#9a8a7a] mb-0.5">Collections</p>
            <p className="text-lg font-bold text-[#4a3a2a]">{collections.length}</p>
          </div>
        </div>

        {(member.plan === "meadow" || member.plan === "plus") && member.stripe_subscription_id && (
          <button
            onClick={handleManageSubscription}
            disabled={isManagingSubscription}
            className="px-5 py-2.5 bg-[#5a4a3a] text-white text-sm font-semibold rounded-xl hover:bg-[#4a3a2a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isManagingSubscription ? "Redirecting..." : "Manage Subscription"}
          </button>
        )}
      </div>

      {/* Upgrade CTA */}
      {member.plan !== "plus" && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Upgrade</h2>
          <div className="grid sm:grid-cols-1 gap-4 max-w-md">
            {upgradePlans.map((plan) => (
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
                <a
                  href="/checkout"
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-[#7a8f6e] text-white hover:bg-[#6a7f5e] transition-colors"
                >
                  Upgrade to Plus
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Settings */}
      <div className="bg-white rounded-2xl border border-[#e8e0d0] p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-[#9a8a7a] uppercase tracking-wider mb-4">Account Settings</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-xs font-medium px-4 py-2 rounded-lg border border-[#e8e0d0] text-[#7a6a5a] hover:bg-[#f5f0e8] transition-colors disabled:opacity-60"
          >
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
          {(member.plan === "meadow" || member.plan === "plus") && member.stripe_subscription_id && (
            <button
              onClick={handleManageSubscription}
              disabled={isManagingSubscription}
              className="text-xs font-medium px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* Decorative footer */}
      <div className="mt-12 text-center text-[#c4b89a] select-none">
        <div className="text-3xl leading-none mb-2">&#8226; &#10048; &#8226; &#10047; &#8226; &#10048; &#8226;</div>
        <p className="text-xs tracking-[0.2em] uppercase">Ink &amp; Meadow &mdash; Made with care</p>
      </div>
    </div>
  );
}
