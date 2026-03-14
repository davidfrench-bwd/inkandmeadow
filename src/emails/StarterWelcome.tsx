import {
  Button,
  Link,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import EmailLayout, {
  card,
  cardSecondary,
  infoBox,
  ctaButton,
  heading,
  paragraph,
  label,
  listItem,
  hint,
  linkStyle,
} from './EmailLayout';

const LOGIN_URL = 'https://inkandmeadow.com/login';
const UPGRADE_URL = 'https://inkandmeadow.com/checkout';

export default function StarterWelcome() {
  return (
    <EmailLayout preview="Your Ink & Meadow membership is active! 100+ pages ready to download.">
      {/* Main card */}
      <Section style={card}>
        <Text style={heading}>Your pages are waiting!</Text>
        <Text style={paragraph}>
          Welcome to <strong>Ink &amp; Meadow</strong>! Your 100+ coloring pages
          are ready to download and print, and 100 new ones arrive every month.
        </Text>

        <Section style={infoBox}>
          <Text style={label}>Your membership includes:</Text>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li style={listItem}>100+ coloring pages ready now</li>
            <li style={listItem}>100 brand-new pages every month</li>
            <li style={listItem}>Full access to growing library</li>
            <li style={listItem}>High-resolution PDF + PNG formats</li>
          </ul>
        </Section>

        <Section style={{ textAlign: 'center' as const, marginBottom: '24px' }}>
          <Button href={LOGIN_URL} style={ctaButton}>
            Log In &amp; Download Your Pages
          </Button>
        </Section>

        <Text style={hint}>
          Just enter this email address and we&rsquo;ll send you a login link
          &mdash; no password needed.
        </Text>
      </Section>

      {/* Upsell */}
      <Section style={cardSecondary}>
        <Text style={{ ...label, fontSize: '15px', marginBottom: '8px' }}>
          Want 300 exclusive pages per month?
        </Text>
        <Text
          style={{
            ...paragraph,
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          Upgrade to <strong>Ink &amp; Meadow Plus</strong> for 300 exclusive pages per
          month plus premium seasonal collections &mdash; just $29/mo.
        </Text>
        <Link href={UPGRADE_URL} style={linkStyle}>
          Learn more &rarr;
        </Link>
      </Section>
    </EmailLayout>
  );
}
