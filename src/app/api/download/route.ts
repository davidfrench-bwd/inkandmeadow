import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pageId = searchParams.get('page_id');
    const email = searchParams.get('email');

    if (!pageId || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters: page_id, email' },
        { status: 400 },
      );
    }

    const supabase = getServiceClient();

    // Look up the member
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('id, email, plan, status')
      .eq('email', email)
      .single();

    if (memberError || !member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 },
      );
    }

    if (member.status !== 'active') {
      return NextResponse.json(
        { error: 'Membership is not active' },
        { status: 403 },
      );
    }

    // Look up the coloring page
    const { data: page, error: pageError } = await supabase
      .from('coloring_pages')
      .select('id, title, is_premium, file_url')
      .eq('id', pageId)
      .single();

    if (pageError || !page) {
      return NextResponse.json(
        { error: 'Coloring page not found' },
        { status: 404 },
      );
    }

    // Check plan access
    // starter: non-premium only
    // meadow: non-premium only
    // cottage: everything
    const plan = member.plan as string;

    if (page.is_premium && plan !== 'cottage') {
      return NextResponse.json(
        { error: 'Your plan does not include premium pages. Upgrade to Cottage for full access.' },
        { status: 403 },
      );
    }

    // Check file availability
    if (!page.file_url) {
      return NextResponse.json(
        { error: 'Page not available yet' },
        { status: 404 },
      );
    }

    // Log the download
    console.log(
      `[Download] Member: ${email} (${plan}), Page: "${page.title}" (${pageId}), Premium: ${page.is_premium}`,
    );

    // Redirect to the file URL
    return NextResponse.redirect(page.file_url);
  } catch (err) {
    console.error('Download error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
