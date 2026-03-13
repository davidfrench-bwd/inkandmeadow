import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
const API_VERSION = 'v21.0';

function hashSha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

interface EventPayload {
  event_name: string;
  event_source_url: string;
  email?: string;
  custom_data?: Record<string, unknown>;
  event_id?: string;
}

export async function POST(request: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Meta Pixel or Conversions API token not configured' },
      { status: 500 }
    );
  }

  let body: EventPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { event_name, event_source_url, email, custom_data, event_id } = body;

  if (!event_name) {
    return NextResponse.json(
      { error: 'event_name is required' },
      { status: 400 }
    );
  }

  const event_time = Math.floor(Date.now() / 1000);

  const user_data: Record<string, string> = {};
  if (email) {
    user_data.em = hashSha256(email);
  }

  // Extract client IP and user agent for better matching
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  if (clientIp) {
    user_data.client_ip_address = clientIp;
  }
  if (userAgent) {
    user_data.client_user_agent = userAgent;
  }

  const eventData: Record<string, unknown> = {
    event_name,
    event_time,
    action_source: 'website',
    user_data,
  };

  if (event_source_url) {
    eventData.event_source_url = event_source_url;
  }

  if (event_id) {
    eventData.event_id = event_id;
  }

  if (custom_data) {
    eventData.custom_data = custom_data;
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [eventData],
        access_token: ACCESS_TOKEN,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI error:', result);
      return NextResponse.json(
        { error: 'Failed to send event to Meta', details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('Meta CAPI request failed:', err);
    return NextResponse.json(
      { error: 'Failed to send event to Meta' },
      { status: 500 }
    );
  }
}
