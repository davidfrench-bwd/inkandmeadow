/**
 * Upload generated coloring pages to Supabase Storage and upsert database records.
 *
 * Run with:  npx tsx scripts/upload-to-supabase.ts
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load env vars from .env.local (no dotenv dependency needed)
const envPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BUCKET = 'coloring-pages';
const GENERATED_DIR = path.resolve(__dirname, '..', 'generated-pages');

interface PageMetadata {
  title: string;
  theme: string;
  collection_month: string;
  collection_name: string;
  is_premium: boolean;
  prompt: string;
  filename: string;
  sort_order: number;
  generated_at: string;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);

  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 20 * 1024 * 1024, // 20 MB
    });
    if (error) {
      console.error(`Failed to create bucket "${BUCKET}":`, error.message);
      process.exit(1);
    }
    console.log(`Created storage bucket: ${BUCKET}`);
  } else {
    console.log(`Storage bucket "${BUCKET}" already exists`);
  }
}

async function uploadPage(pngFile: string) {
  const baseName = pngFile.replace(/\.png$/, '');
  const jsonFile = `${baseName}.json`;
  const jsonPath = path.join(GENERATED_DIR, jsonFile);
  const pngPath = path.join(GENERATED_DIR, pngFile);

  if (!fs.existsSync(jsonPath)) {
    console.warn(`Skipping ${pngFile} — no matching metadata file ${jsonFile}`);
    return;
  }

  const metadata: PageMetadata = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const imageBuffer = fs.readFileSync(pngPath);

  // Upload to storage: coloring-pages/<collection_month>/<filename>
  const storagePath = `${metadata.collection_month}/${metadata.filename}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, imageBuffer, {
      contentType: 'image/png',
      upsert: true,
    });

  if (uploadError) {
    console.error(`Failed to upload ${pngFile}:`, uploadError.message);
    return;
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(storagePath);

  const publicUrl = urlData.publicUrl;
  console.log(`Uploaded: ${storagePath} -> ${publicUrl}`);

  // Upsert the coloring_pages record
  const { error: upsertError } = await supabase
    .from('coloring_pages')
    .upsert(
      {
        title: metadata.title,
        theme: metadata.theme,
        collection_month: metadata.collection_month,
        collection_name: metadata.collection_name,
        is_premium: metadata.is_premium,
        sort_order: metadata.sort_order,
        file_url: publicUrl,
        preview_url: publicUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'title,collection_month' },
    );

  if (upsertError) {
    console.error(`Failed to upsert DB record for "${metadata.title}":`, upsertError.message);
  } else {
    console.log(`Upserted DB record: "${metadata.title}" (${metadata.collection_month})`);
  }
}

async function main() {
  console.log(`Reading generated pages from: ${GENERATED_DIR}\n`);

  if (!fs.existsSync(GENERATED_DIR)) {
    console.error(`Directory not found: ${GENERATED_DIR}`);
    process.exit(1);
  }

  await ensureBucket();

  const pngFiles = fs
    .readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith('.png'))
    .sort();

  if (pngFiles.length === 0) {
    console.log('No .png files found in generated-pages/');
    return;
  }

  console.log(`Found ${pngFiles.length} page(s) to upload\n`);

  for (const file of pngFiles) {
    await uploadPage(file);
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
