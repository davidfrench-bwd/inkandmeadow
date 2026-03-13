import { createHash } from 'crypto';

const API_VERSION = 'v21.0';

function hashSha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

interface SendEventOptions {
  event_name: string;
  event_source_url?: string;
  email?: string;
  custom_data?: Record<string, unknown>;
  event_id?: string;
}

export async function sendMetaEvent(options: SendEventOptions): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;

  if (!pixelId || !accessToken) {
    console.log('[Meta CAPI] Skipping — not configured');
    return;
  }

  const user_data: Record<string, string> = {};
  if (options.email) {
    user_data.em = hashSha256(options.email);
  }

  const eventData: Record<string, unknown> = {
    event_name: options.event_name,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data,
  };

  if (options.event_source_url) eventData.event_source_url = options.event_source_url;
  if (options.event_id) eventData.event_id = options.event_id;
  if (options.custom_data) eventData.custom_data = options.custom_data;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${pixelId}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [eventData], access_token: accessToken }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error('[Meta CAPI] Error:', err);
    } else {
      console.log(`[Meta CAPI] Sent ${options.event_name} for ${options.email || 'unknown'}`);
    }
  } catch (err) {
    console.error('[Meta CAPI] Failed:', err);
  }
}
