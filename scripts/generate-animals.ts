import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = path.join(__dirname, '..', 'generated-pages');

const BASE_PROMPT = `Create a coloring book page illustration. The image must be:
- Pure black and white line art only, NO grayscale, NO shading, NO filled areas, NO color whatsoever
- Clean, crisp outlines suitable for coloring with pencils or markers
- Completely white background
- Intricate but not overwhelming detail — suitable for adults
- No text or words in the image
- Style: hand-drawn illustration, cottagecore aesthetic

Subject: `;

interface PageToGenerate {
  filename: string;
  title: string;
  theme: string;
  collection_month: string;
  collection_name: string;
  is_premium: boolean;
  prompt: string;
  sort_order: number;
  force: boolean; // overwrite if exists
}

const PAGES: PageToGenerate[] = [
  // Fix: regenerate bunny with stronger line-art-only instructions
  {
    filename: '2026-03_04_bunny-in-the-meadow.png',
    title: 'Bunny in the Meadow',
    theme: 'Animals',
    collection_month: '2026-03',
    collection_name: 'Spring Awakening',
    is_premium: false,
    sort_order: 4,
    force: true,
    prompt: 'A fluffy bunny rabbit sitting in a spring meadow surrounded by clover, dandelions, and tiny wildflowers. Gentle hills in background. The bunny should be cute and detailed with visible fur texture in line art.',
  },
  // New animal pages
  {
    filename: '2026-03_26_kitten-in-the-garden.png',
    title: 'Kitten in the Garden',
    theme: 'Animals',
    collection_month: '2026-03',
    collection_name: 'Spring Awakening',
    is_premium: false,
    sort_order: 26,
    force: false,
    prompt: 'An adorable fluffy kitten playing with a ball of yarn in a cottage garden, surrounded by daisies and lavender. A garden fence and birdhouse in the background. Cute expressive eyes.',
  },
  {
    filename: '2026-03_27_hedgehog-and-mushrooms.png',
    title: 'Hedgehog & Mushrooms',
    theme: 'Animals',
    collection_month: '2026-03',
    collection_name: 'Spring Awakening',
    is_premium: false,
    sort_order: 27,
    force: false,
    prompt: 'A cute hedgehog curled up among wild mushrooms, fallen leaves, acorns, and tiny ferns on a forest floor. Detailed quills and whimsical mushroom varieties.',
  },
  {
    filename: '2026-03_28_baby-owl-in-oak.png',
    title: 'Baby Owl in the Oak',
    theme: 'Animals',
    collection_month: '2026-03',
    collection_name: 'Spring Awakening',
    is_premium: true,
    sort_order: 28,
    force: false,
    prompt: 'A fluffy baby owl perched in the hollow of a large oak tree, surrounded by ivy, acorns, and small woodland flowers. Big round eyes, detailed feathers. A crescent moon visible behind branches.',
  },
  {
    filename: '2026-03_29_ducklings-at-the-pond.png',
    title: 'Ducklings at the Pond',
    theme: 'Animals',
    collection_month: '2026-03',
    collection_name: 'Spring Awakening',
    is_premium: false,
    sort_order: 29,
    force: false,
    prompt: 'A mother duck followed by five baby ducklings swimming in a calm pond. Water lilies, cattails, and dragonflies around them. Reflections in the water. Willows in the background.',
  },
  {
    filename: '2026-03_30_squirrel-with-acorns.png',
    title: 'Squirrel with Acorns',
    theme: 'Animals',
    collection_month: '2026-03',
    collection_name: 'Spring Awakening',
    is_premium: false,
    sort_order: 30,
    force: false,
    prompt: 'A bushy-tailed squirrel sitting on a tree branch holding an acorn, surrounded by oak leaves, spring blossoms, and small birds. Detailed fur texture and expressive face.',
  },
];

async function generatePage(page: PageToGenerate): Promise<void> {
  const filepath = path.join(OUTPUT_DIR, page.filename);

  if (fs.existsSync(filepath) && !page.force) {
    console.log(`  ⏭ Skipping "${page.title}" (already exists)`);
    return;
  }

  console.log(`  🎨 Generating "${page.title}"${page.force ? ' (REGENERATING)' : ''}...`);

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: BASE_PROMPT + page.prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    style: 'natural',
  });

  const imageUrl = response.data[0]?.url;
  if (!imageUrl) throw new Error('No image URL returned');

  const imgResponse = await fetch(imageUrl);
  const buffer = Buffer.from(await imgResponse.arrayBuffer());
  fs.writeFileSync(filepath, buffer);

  // Save metadata
  const metaPath = filepath.replace('.png', '.json');
  fs.writeFileSync(metaPath, JSON.stringify({
    title: page.title,
    theme: page.theme,
    collection_month: page.collection_month,
    collection_name: page.collection_name,
    is_premium: page.is_premium,
    filename: page.filename,
    sort_order: page.sort_order,
    generated_at: new Date().toISOString(),
  }, null, 2));

  console.log(`  ✅ Saved: ${page.filename}`);
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`\n🐾 Ink & Meadow — Animal Pages Generator`);
  console.log(`📦 Generating ${PAGES.length} pages\n`);

  for (let i = 0; i < PAGES.length; i++) {
    const page = PAGES[i];
    console.log(`[${i + 1}/${PAGES.length}] ${page.is_premium ? '💎 Premium' : '🌱 Regular'} | ${page.title}`);
    try {
      await generatePage(page);
      if (i < PAGES.length - 1) {
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (err: any) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }

  console.log('\n✅ Done! Now run the upload script to push to Supabase.\n');
}

main().catch(console.error);
