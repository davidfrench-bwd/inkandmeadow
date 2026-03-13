"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mockMember } from "@/lib/mock-data";

const navItems = [
  {
    label: "Dashboard",
    href: "/portal",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "My Collections",
    href: "/portal#collections",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Account",
    href: "/portal/account",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Community",
    href: "https://facebook.com/groups/inkandmeadow",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    external: true,
  },
  {
    label: "Help",
    href: "/portal/help",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const member = mockMember;

  const planLabel = member.plan === "meadow" ? "Meadow" : "Starter";
  const planColor =
    member.plan === "meadow"
      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
      : "bg-stone-100 text-stone-700 border-stone-300";

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-[#e8e0d0] h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#f5f0e8] text-[#7a6a5a] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/portal" className="flex items-center gap-2">
            {/* Small leaf icon */}
            <svg className="w-7 h-7 text-[#7a8f6e]" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C10 2 4 8 4 16c0 2 .5 3.5 1.5 5C8 16 12 10 16 8c4 2 8 8 10.5 13 1-1.5 1.5-3 1.5-5C28 8 22 2 16 2z" opacity="0.7" />
              <path d="M16 8v22" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="text-xl font-semibold text-[#5a4a3a] tracking-tight">
              Ink <span className="text-[#7a8f6e]">&</span> Meadow
            </span>
          </Link>

          {/* Right side: member info */}
          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${planColor}`}>
              {planLabel}
            </span>
            <div className="w-9 h-9 rounded-full bg-[#7a8f6e] flex items-center justify-center text-white text-sm font-medium">
              {member.avatarInitials}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* ── Sidebar (desktop) ──────────────────────────────────── */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-[#e8e0d0]
            transform transition-transform duration-300 ease-in-out overflow-y-auto
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = item.href === "/portal" ? pathname === "/portal" : pathname.startsWith(item.href);
              const linkProps = item.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
                : {};

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  {...linkProps}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${isActive
                      ? "bg-[#7a8f6e]/10 text-[#5a6f4e]"
                      : "text-[#7a6a5a] hover:bg-[#f5f0e8] hover:text-[#5a4a3a]"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                  {item.external && (
                    <svg className="w-3.5 h-3.5 ml-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Upgrade CTA in sidebar for Meadow members */}
          {member.plan === "meadow" && (
            <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm font-semibold text-amber-800">Upgrade to Cottage</span>
              </div>
              <p className="text-xs text-amber-700/80 mb-3">
                Unlock 50+ premium pages every month, exclusive designs, and early access.
              </p>
              <Link
                href="/portal/account"
                className="block text-center text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors"
              >
                View Plans
              </Link>
            </div>
          )}

          {/* Starter upgrade CTA */}
          {member.plan === "starter" && (
            <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <span className="text-sm font-semibold text-emerald-800">Go Meadow</span>
              </div>
              <p className="text-xs text-emerald-700/80 mb-3">
                Fresh pages every month for just $9/mo.
              </p>
              <Link
                href="/portal/account"
                className="block text-center text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-colors"
              >
                Upgrade Now
              </Link>
            </div>
          )}

          {/* Decorative botanical footer */}
          <div className="mt-auto p-4 pt-8 text-center text-[#c4b89a] select-none">
            <div className="text-2xl leading-none mb-1">&#10048; &#10047; &#10048;</div>
            <p className="text-[10px] tracking-widest uppercase">est. 2025</p>
          </div>
        </aside>

        {/* Sidebar backdrop on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/20 backdrop-blur-[1px] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main content ───────────────────────────────────────── */}
        <main className="flex-1 min-w-0 lg:ml-0">
          {children}
        </main>
      </div>

      {/* ── Bottom nav (mobile) ──────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[#e8e0d0] lg:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = item.href === "/portal" ? pathname === "/portal" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`
                  flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors
                  ${isActive ? "text-[#5a6f4e]" : "text-[#9a8a7a]"}
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
