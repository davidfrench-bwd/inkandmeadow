'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface MemberData {
  id: string;
  email: string;
  plan: 'starter' | 'meadow' | 'plus';
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
}

export interface PageData {
  id: string;
  title: string;
  theme: string;
  collection_month: string;
  collection_name: string;
  is_premium: boolean;
  file_url: string | null;
  sort_order: number;
}

export interface CollectionGroup {
  month: string;
  name: string;
  pages: PageData[];
}

interface MemberContextValue {
  member: MemberData | null;
  pages: PageData[];
  collections: CollectionGroup[];
  loading: boolean;
  error: string | null;
}

const MemberContext = createContext<MemberContextValue>({
  member: null,
  pages: [],
  collections: [],
  loading: true,
  error: null,
});

export function useMember() {
  return useContext(MemberContext);
}

function groupByCollection(pages: PageData[]): CollectionGroup[] {
  const map = new Map<string, CollectionGroup>();
  for (const page of pages) {
    let group = map.get(page.collection_month);
    if (!group) {
      group = { month: page.collection_month, name: page.collection_name, pages: [] };
      map.set(page.collection_month, group);
    }
    group.pages.push(page);
  }
  return Array.from(map.values());
}

export function MemberProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberData | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/portal/data')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load portal data');
        return res.json();
      })
      .then((data) => {
        setMember(data.member);
        setPages(data.pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const collections = groupByCollection(pages);

  return (
    <MemberContext.Provider value={{ member, pages, collections, loading, error }}>
      {children}
    </MemberContext.Provider>
  );
}
