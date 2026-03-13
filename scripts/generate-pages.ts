import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = path.join(__dirname, '..', 'generated-pages');

interface PagePrompt {
  title: string;
  theme: string;
  collection_month: string;
  collection_name: string;
  is_premium: boolean;
  prompt: string;
}

// March 2026: Spring Awakening
const MARCH_PAGES: PagePrompt[] = [
  // 10 Regular pages (Meadow tier)
  { title: 'Wildflower Cottage', theme: 'Florals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A charming small cottage surrounded by blooming wildflowers, daisies, and lavender. Garden path leading to the front door. Butterflies in the air.' },
  { title: 'Morning Garden Gate', theme: 'Gardens', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'An ornate garden gate covered in climbing roses and ivy, opening to a lush cottage garden with stepping stones. Morning dew on petals.' },
  { title: 'Herb Window Box', theme: 'Botanicals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A rustic windowsill with terracotta pots of herbs: rosemary, basil, thyme, lavender. Lace curtain behind, small watering can beside.' },
  { title: 'Bunny in the Meadow', theme: 'Animals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A fluffy bunny rabbit sitting in a spring meadow surrounded by clover, dandelions, and tiny wildflowers. Gentle hills in background.' },
  { title: 'Spring Tea Setting', theme: 'Cozy Spaces', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A vintage tea set on a garden table: teapot with floral pattern, cups and saucers, scones on a tiered stand, surrounded by fresh flowers.' },
  { title: 'Bluebird on a Branch', theme: 'Animals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A bluebird perched on a flowering cherry blossom branch, petals falling gently. Detailed feathers and delicate blossoms.' },
  { title: 'Potting Shed', theme: 'Gardens', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'Interior of a cozy potting shed with shelves of seedlings, hanging dried herbs, gardening tools, terracotta pots, and a sunny window.' },
  { title: 'Wisteria Archway', theme: 'Florals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A stone archway completely covered in cascading wisteria blooms, leading to a secret garden with a birdbath and bench.' },
  { title: 'Basket of Spring', theme: 'Florals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A woven wicker basket overflowing with freshly cut tulips, daffodils, and hyacinths. Ribbon tied around the handle, garden shears nearby.' },
  { title: 'Cottage Kitchen Herbs', theme: 'Cozy Spaces', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: false, prompt: 'A warm cottage kitchen corner with bundles of drying herbs hanging from a wooden beam, copper pots, a farmhouse sink with a window view of a garden.' },

  // 15 Premium pages (Cottage tier)
  { title: 'Enchanted Greenhouse', theme: 'Gardens', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A Victorian-style greenhouse filled with exotic plants, hanging ferns, climbing vines, a small fountain, and wrought iron details.' },
  { title: 'Fox Family Den', theme: 'Animals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A mother fox and two cubs at the entrance of their den, surrounded by spring wildflowers, ferns, and a hollow log.' },
  { title: 'Lavender Fields Forever', theme: 'Florals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'Rolling hills of lavender rows stretching to the horizon, a small stone farmhouse in the distance, beehives at the edge of the field.' },
  { title: 'Fairy Mushroom Circle', theme: 'Fantasy', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A circle of whimsical mushrooms and toadstools of various sizes, with tiny fairy doors, dewdrops, moss, and ferns surrounding them.' },
  { title: 'Spring Mandala Garden', theme: 'Mandalas', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'An intricate circular mandala made of spring flowers: tulips, daisies, cherry blossoms, and ferns arranged in a symmetrical radial pattern.' },
  { title: 'Meadow Stream Bridge', theme: 'Landscapes', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A small arched stone bridge over a babbling brook in a meadow, weeping willows, water lilies, a duck family swimming below.' },
  { title: 'Honeybee Haven', theme: 'Animals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'Detailed honeybees visiting various spring flowers: sunflowers, clover, apple blossoms. A traditional beehive in the background, honeycomb pattern border.' },
  { title: 'Garden Tool Collection', theme: 'Botanicals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'An artistic arrangement of vintage garden tools: pruning shears, trowel, rake, watering can, surrounded by seed packets, twine, and small potted seedlings.' },
  { title: 'Rose Arbor Reading Nook', theme: 'Cozy Spaces', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A cozy reading nook under a rose-covered arbor with a cushioned bench, stack of books, a cup of tea, and a sleeping cat curled up.' },
  { title: 'Butterfly Botanical', theme: 'Animals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A large detailed butterfly with intricate wing patterns, surrounded by a botanical frame of various spring flowers and leaves.' },
  { title: 'Cottage Door Welcome', theme: 'Cozy Spaces', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A charming cottage front door painted in a cheerful color, with a wreath, potted plants on the steps, a welcome mat, boots by the door, and climbing roses.' },
  { title: 'Woodland Deer', theme: 'Animals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A graceful deer standing in a sun-dappled forest clearing, ferns and wildflowers at its feet, rays of light streaming through the trees.' },
  { title: 'Botanical Letters: SPRING', theme: 'Botanicals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'The word SPRING written in large decorative letters, each letter filled with and surrounded by different spring flowers, vines, and small birds.' },
  { title: 'Rainy Day Window', theme: 'Cozy Spaces', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'A window view on a rainy spring day: raindrops on the glass, a steaming mug on the windowsill, a candle, a book, and the garden visible outside.' },
  { title: 'Spring Wreath', theme: 'Florals', collection_month: '2026-03', collection_name: 'Spring Awakening', is_premium: true, prompt: 'An elaborate circular wreath made of intertwined branches, spring flowers, birds nest with eggs, ribbon, and feathers. Highly detailed and symmetrical.' },
];

const ALL_PAGES = [...MARCH_PAGES];

const BASE_PROMPT = `Create a coloring book page illustration. The image must be:
- Pure black and white line art only, NO grayscale, NO shading, NO filled areas
- Clean, crisp outlines suitable for coloring with pencils or markers
- White background
- Intricate but not overwhelming detail — suitable for adults
- No text or words in the image
- Style: hand-drawn illustration, cottagecore aesthetic

Subject: `;

async function generatePage(page: PagePrompt, index: number): Promise<void> {
  const filename = `${page.collection_month}_${String(index + 1).padStart(2, '0')}_${page.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  // Skip if already generated
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ Skipping "${page.title}" (already exists)`);
    return;
  }

  console.log(`  🎨 Generating "${page.title}"...`);

  try {
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

    // Download image
    const imgResponse = await fetch(imageUrl);
    const buffer = Buffer.from(await imgResponse.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    // Save metadata alongside
    const metaPath = filepath.replace('.png', '.json');
    fs.writeFileSync(metaPath, JSON.stringify({
      ...page,
      filename,
      sort_order: index + 1,
      generated_at: new Date().toISOString(),
    }, null, 2));

    console.log(`  ✅ Saved: ${filename}`);
  } catch (err: any) {
    console.error(`  ❌ Failed "${page.title}": ${err.message}`);
    // Save error for retry
    const errorPath = path.join(OUTPUT_DIR, `ERROR_${filename}.txt`);
    fs.writeFileSync(errorPath, err.message);
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`\n🌿 Ink & Meadow — Coloring Page Generator`);
  console.log(`📦 Generating ${ALL_PAGES.length} pages for March 2026: Spring Awakening\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < ALL_PAGES.length; i++) {
    const page = ALL_PAGES[i];
    const badge = page.is_premium ? '💎 Premium' : '🌱 Regular';
    console.log(`[${i + 1}/${ALL_PAGES.length}] ${badge} | ${page.theme}`);

    try {
      const filepath = path.join(OUTPUT_DIR, `${page.collection_month}_${String(i + 1).padStart(2, '0')}_${page.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`);
      if (fs.existsSync(filepath)) {
        skipped++;
        console.log(`  ⏭ Skipping "${page.title}" (already exists)`);
      } else {
        await generatePage(page, i);
        generated++;
        // Small delay to avoid rate limits
        if (i < ALL_PAGES.length - 1) {
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    } catch {
      failed++;
    }
  }

  console.log(`\n📊 Results: ${generated} generated, ${skipped} skipped, ${failed} failed`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);
}

main().catch(console.error);
