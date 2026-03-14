import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const colors = {
  cream: '#faf7f2',
  bark: '#5a4a3a',
  barkLight: '#7a6a5a',
  barkMuted: '#a09080',
  sage: '#7a8f6e',
  border: '#e8e0d0',
  warmBg: '#f5f0e8',
  botanical: '#c4b89a',
};

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export default function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>
              Ink <span style={{ color: colors.sage }}>&amp;</span> Meadow
            </Text>
            <Text style={tagline}>Coloring Pages</Text>
          </Section>

          {children}

          {/* Footer */}
          <Section style={footer}>
            <Text style={botanicalDecor}>&#10048; &#10047; &#10048;</Text>
            <Text style={footerText}>Ink &amp; Meadow &bull; Made with care</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── Shared styles ──────────────────────────────────────

export { colors };

export const card: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '16px',
  padding: '32px',
  border: `1px solid ${colors.border}`,
};

export const cardSecondary: React.CSSProperties = {
  ...card,
  padding: '24px',
  marginTop: '16px',
};

export const infoBox: React.CSSProperties = {
  background: colors.warmBg,
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

export const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  background: colors.sage,
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 'bold',
  padding: '14px 32px',
  borderRadius: '12px',
};

export const heading: React.CSSProperties = {
  color: colors.bark,
  fontSize: '22px',
  margin: '0 0 8px',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

export const paragraph: React.CSSProperties = {
  color: colors.barkLight,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 20px',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

export const label: React.CSSProperties = {
  color: colors.bark,
  fontSize: '14px',
  margin: '0 0 4px',
  fontWeight: 'bold',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

export const listItem: React.CSSProperties = {
  color: colors.barkLight,
  fontSize: '14px',
  lineHeight: '1.8',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

export const hint: React.CSSProperties = {
  color: colors.barkMuted,
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '0',
  textAlign: 'center' as const,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

export const linkStyle: React.CSSProperties = {
  color: colors.sage,
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'underline',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

// ── Internal styles ────────────────────────────────────

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: colors.cream,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 24px',
};

const header: React.CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logoText: React.CSSProperties = {
  color: colors.bark,
  fontSize: '24px',
  margin: '0 0 4px',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const tagline: React.CSSProperties = {
  color: colors.barkMuted,
  fontSize: '12px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  margin: '0',
};

const footer: React.CSSProperties = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const botanicalDecor: React.CSSProperties = {
  color: colors.botanical,
  fontSize: '18px',
  margin: '0 0 8px',
};

const footerText: React.CSSProperties = {
  color: colors.barkMuted,
  fontSize: '11px',
  letterSpacing: '1px',
};
