import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const i = t.indexOf('=');
  if (i === -1) continue;
  const key = t.slice(0, i).trim();
  const val = t.slice(i + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const FILE = '2026-03/2026-03_04_bunny-in-the-meadow.png';
const LOCAL = path.resolve(__dirname, '..', 'generated-pages', '2026-03_04_bunny-in-the-meadow.png');

async function main() {
  // Delete old
  const { error: delErr } = await supabase.storage.from('coloring-pages').remove([FILE]);
  if (delErr) console.error('Delete error:', delErr);
  else console.log('Deleted old file');

  // Re-upload with cache-control: no-cache
  const buffer = fs.readFileSync(LOCAL);
  const { error: upErr } = await supabase.storage.from('coloring-pages').upload(FILE, buffer, {
    contentType: 'image/png',
    upsert: true,
    cacheControl: '0',
  });
  if (upErr) console.error('Upload error:', upErr);
  else console.log('Re-uploaded bunny with cache-control: 0');
}

main().catch(console.error);
