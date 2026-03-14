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
  colors,
} from './EmailLayout';

const LOGIN_URL = 'https://inkandmeadow.com/login';
const COMMUNITY_URL = 'https://facebook.com/groups/inkandmeadow';

const greenBox: React.CSSProperties = {
  background: '#f0f7ed',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
  border: '1px solid #d4e8cc',
};

const stepCircle: React.CSSProperties = {
  display: 'inline-block',
  width: '24px',
  height: '24px',
  background: colors.sage,
  color: '#fff',
  borderRadius: '50%',
  textAlign: 'center' as const,
  lineHeight: '24px',
  fontSize: '13px',
  fontWeight: 'bold',
};

export default function MeadowWelcome() {
  return (
    <EmailLayout preview="Welcome to Ink & Meadow Plus! 100 exclusive pages per month are yours.">
      {/* Main card */}
      <Section style={card}>
        <Text style={heading}>Welcome to Plus!</Text>
        <Text style={paragraph}>
          You&rsquo;re officially an <strong>Ink &amp; Meadow Plus member</strong>!
          Your first collection of 100 beautiful exclusive coloring pages is ready and
          waiting in your portal.
        </Text>

        {/* Membership benefits */}
        <Section style={greenBox}>
          <Text style={{ ...label, color: '#4a5a3a' }}>
            Your Plus membership includes:
          </Text>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li style={{ ...listItem, color: '#5a6a4a' }}>
              100 exclusive pages per month
            </li>
            <li style={{ ...listItem, color: '#5a6a4a' }}>
              Premium seasonal collections
            </li>
            <li style={{ ...listItem, color: '#5a6a4a' }}>
              Access to the full back catalog
            </li>
            <li style={{ ...listItem, color: '#5a6a4a' }}>
              High-resolution PDF downloads
            </li>
            <li style={{ ...listItem, color: '#5a6a4a' }}>
              Print unlimited copies
            </li>
            <li style={{ ...listItem, color: '#5a6a4a' }}>
              Members-only Facebook community
            </li>
          </ul>
        </Section>

        {/* How it works */}
        <Section style={infoBox}>
          <Text style={{ ...label, marginBottom: '12px' }}>
            Here&rsquo;s how it works:
          </Text>
          <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 12px 6px 0', verticalAlign: 'top' }}>
                  <span style={stepCircle}>1</span>
                </td>
                <td style={{ padding: '6px 0', color: colors.bark, fontSize: '14px', fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  Log in to your portal with this email
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px 12px 6px 0', verticalAlign: 'top' }}>
                  <span style={stepCircle}>2</span>
                </td>
                <td style={{ padding: '6px 0', color: colors.bark, fontSize: '14px', fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  Browse and download any pages you like
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px 12px 6px 0', verticalAlign: 'top' }}>
                  <span style={stepCircle}>3</span>
                </td>
                <td style={{ padding: '6px 0', color: colors.bark, fontSize: '14px', fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  New pages arrive at the start of each month
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section style={{ textAlign: 'center' as const, marginBottom: '24px' }}>
          <Button href={LOGIN_URL} style={ctaButton}>
            Log In &amp; Start Coloring
          </Button>
        </Section>

        <Text style={hint}>
          Just enter this email address and we&rsquo;ll send you a login link
          &mdash; no password needed.
        </Text>
      </Section>

      {/* Community */}
      <Section style={{ ...cardSecondary, textAlign: 'center' as const }}>
        <Text style={{ ...label, fontSize: '15px', marginBottom: '8px' }}>
          Join the community!
        </Text>
        <Text
          style={{
            ...paragraph,
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center' as const,
          }}
        >
          Share your finished pages, get inspiration, and connect with fellow
          colorists in our Facebook group.
        </Text>
        <Link href={COMMUNITY_URL} style={linkStyle}>
          Join the Facebook Group &rarr;
        </Link>
      </Section>
    </EmailLayout>
  );
}
