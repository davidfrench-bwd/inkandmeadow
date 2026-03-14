import { Resend } from 'resend';
import StarterWelcome from '@/emails/StarterWelcome';
import MeadowWelcome from '@/emails/MeadowWelcome';
import UpgradeNudge from '@/emails/UpgradeNudge';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Ink & Meadow <updates@inkandmeadow.com>';

// Disable Resend click tracking — their shared tracking domain
// (resend-clicks.com) gets flagged as dangerous by Google.
const HEADERS = {
  'X-Entity-Ref-ID': 'no-tracking',
};

export async function sendStarterWelcomeEmail(email: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Welcome to Ink & Meadow! Your pages are ready 🌿',
    react: StarterWelcome(),
    headers: HEADERS,
  });

  if (error) {
    console.error('[Email] Failed to send welcome:', error);
  } else {
    console.log(`[Email] Welcome sent to ${email}`);
  }
}

export async function sendMeadowWelcomeEmail(email: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Welcome to Ink & Meadow Plus! 🌼',
    react: MeadowWelcome(),
    headers: HEADERS,
  });

  if (error) {
    console.error('[Email] Failed to send plus welcome:', error);
  } else {
    console.log(`[Email] Plus welcome sent to ${email}`);
  }
}

export async function sendUpgradeNudgeEmail(email: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're loving your pages — want 300 exclusive/month? 🌼",
    react: UpgradeNudge(),
    headers: HEADERS,
  });

  if (error) {
    console.error('[Email] Failed to send upgrade nudge:', error);
  } else {
    console.log(`[Email] Upgrade nudge sent to ${email}`);
  }
}
