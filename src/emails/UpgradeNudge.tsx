import {
  Button,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import EmailLayout, {
  card,
  cardSecondary,
  ctaButton,
  heading,
  paragraph,
  label,
  listItem,
  hint,
} from './EmailLayout';

const UPGRADE_URL = 'https://inkandmeadow.com/checkout';

export default function UpgradeNudge() {
  return (
    <EmailLayout preview="You're loving your coloring pages — unlock 100 exclusive pages/month with Plus!">
      {/* Main card */}
      <Section style={card}>
        <Text style={heading}>You&rsquo;re on a roll!</Text>
        <Text style={paragraph}>
          You&rsquo;ve been downloading pages this week &mdash; we love to see
          it! Did you know you could get <strong>5&times; the pages</strong>{' '}
          with Ink &amp; Meadow Plus?
        </Text>

        <Section style={upgradeBox}>
          <Text style={{ ...label, fontSize: '15px', marginBottom: '12px', textAlign: 'center' as const }}>
            Ink &amp; Meadow Plus &mdash; $29/mo
          </Text>
          <ul style={{ margin: '0 0 16px', paddingLeft: '20px' }}>
            <li style={listItem}>100 exclusive pages delivered every month</li>
            <li style={listItem}>Premium seasonal collections</li>
            <li style={listItem}>Early access to new pages</li>
            <li style={listItem}>Full access to growing library</li>
          </ul>
          <Text style={{ ...hint, marginBottom: '16px' }}>
            That&rsquo;s less than $0.75/day for 50 beautiful pages.
          </Text>
          <Section style={{ textAlign: 'center' as const }}>
            <Button href={UPGRADE_URL} style={ctaButton}>
              Upgrade to Plus
            </Button>
          </Section>
        </Section>
      </Section>

      {/* Reassurance */}
      <Section style={cardSecondary}>
        <Text style={{ ...paragraph, fontSize: '14px', margin: '0' }}>
          Not ready yet? No worries &mdash; your current membership is
          still packed with gorgeous pages. We just wanted to make sure you
          knew the option was there.
        </Text>
      </Section>
    </EmailLayout>
  );
}

// ── Local styles ──────────────────────────────────────

const upgradeBox: React.CSSProperties = {
  background: '#faf5e8',
  borderRadius: '12px',
  padding: '20px',
  border: '1px solid #e8dcc0',
  marginBottom: '8px',
};
