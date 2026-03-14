import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { sendUpgradeNudgeEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getServiceClient();

  // Find meadow members who:
  // - Signed up 3+ days ago
  // - Haven't upgraded to plus
  // - Haven't received the nudge email yet
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data: members, error: fetchError } = await supabase
    .from('members')
    .select('email')
    .eq('plan', 'meadow')
    .eq('nudge_sent', false)
    .lte('created_at', threeDaysAgo.toISOString());

  if (fetchError) {
    console.error('[Cron] Failed to fetch members:', fetchError);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }

  if (!members || members.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;
  for (const member of members) {
    await sendUpgradeNudgeEmail(member.email);

    // Mark as nudged so we don't send again
    await supabase
      .from('members')
      .update({ nudge_sent: true })
      .eq('email', member.email);

    sent++;
  }

  console.log(`[Cron] Sent ${sent} upgrade nudge emails`);
  return NextResponse.json({ sent });
}
