import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { getServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pageId = searchParams.get('page_id');

    if (!pageId) {
      return NextResponse.json({ error: 'Missing page_id parameter' }, { status: 400 });
    }

    // Get email from authenticated session
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const email = user.email;
    const serviceClient = getServiceClient();

    // Look up the member
    const { data: member, error: memberError } = await serviceClient
      .from('members')
      .select('id, email, plan, status')
      .eq('email', email)
      .single();

    if (memberError || !member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    if (member.status !== 'active') {
      return NextResponse.json({ error: 'Membership is not active' }, { status: 403 });
    }

    // Look up the coloring page
    const { data: page, error: pageError } = await serviceClient
      .from('coloring_pages')
      .select('id, title, is_premium, file_url')
      .eq('id', pageId)
      .single();

    if (pageError || !page) {
      return NextResponse.json({ error: 'Coloring page not found' }, { status: 404 });
    }

    // Check plan access
    if (page.is_premium && member.plan !== 'meadow' && member.plan !== 'plus') {
      return NextResponse.json(
        { error: 'Your plan does not include premium pages. Upgrade for full access.' },
        { status: 403 },
      );
    }

    if (!page.file_url) {
      return NextResponse.json({ error: 'Page not available yet' }, { status: 404 });
    }

    console.log(
      `[Download] Member: ${email} (${member.plan}), Page: "${page.title}" (${pageId}), Premium: ${page.is_premium}`,
    );

    return NextResponse.redirect(page.file_url);
  } catch (err) {
    console.error('Download error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
