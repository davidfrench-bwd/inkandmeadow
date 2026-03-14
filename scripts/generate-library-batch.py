#!/usr/bin/env python3
"""
Generate 80 coloring pages using Google Gemini Imagen 4.0 to fill out the 100+ page library.

Usage:
    source .venv/bin/activate
    python scripts/generate-library-batch.py --api-key YOUR_KEY
    python scripts/generate-library-batch.py --api-key YOUR_KEY --start 1 --end 10
"""

import argparse
import time
from pathlib import Path

from google import genai
from google.genai import types

# ── 80 prompts: heavy on cute animals in cottagecore settings ──
# ~50% cute animals, ~15% animals + cozy objects, ~15% whimsical/fantasy, ~10% botanicals, ~10% cozy scenes

PAGES = [
    # ── Cute Animals in Cottagecore (1-20) ──
    ("31_kitten-teacup", "An adorable fluffy kitten curled up inside an oversized vintage floral teacup on a saucer, steam rising, daisies and lavender around it, cute whimsical style"),
    ("32_hedgehog-mushroom-house", "A hedgehog wearing a tiny knitted scarf sitting beside a mushroom house door with a welcome mat, acorns and berries scattered around, cute whimsical style"),
    ("33_owl-reading-library", "A wise little owl wearing round glasses perched on a stack of old books in a cozy library corner with ivy growing on shelves, candle flickering, cute whimsical style"),
    ("34_duckling-pond-lily", "Five fluffy ducklings following their mother across a pond with lily pads, cattails, dragonflies, and a weeping willow overhead, cute whimsical style"),
    ("35_squirrel-picnic", "A squirrel having a tiny picnic on a tree stump with a checkered blanket, acorn sandwiches, berries, and tiny wildflowers around, cute whimsical style"),
    ("36_sleeping-fox-hollow", "A fox curled up sleeping in a cozy hollow of a tree trunk, autumn leaves as bedding, mushrooms and ferns growing nearby, cute whimsical style"),
    ("37_rabbit-family-burrow", "A cross-section view of a rabbit burrow showing a cozy underground home with a family of bunnies, tiny furniture, root systems above, flowers on the surface, cute whimsical style"),
    ("38_cat-windowsill-rain", "A fluffy cat lounging on a wide windowsill watching rain, surrounded by potted herbs, a lace curtain, a book open beside it, cute whimsical style"),
    ("39_garden-birds-bath", "Three songbirds (robin, wren, finch) splashing in an ornate birdbath in a cottage garden surrounded by roses and daisies, cute whimsical style"),
    ("40_deer-forest-stream", "A young fawn drinking from a misty forest stream at dawn, surrounded by ferns, wildflowers, and sunbeams filtering through trees, cute whimsical style"),
    ("41_baby-otters-creek", "Two baby otters playing in a shallow creek, one floating on its back holding a small flower, water lilies and reeds around them, cute whimsical style"),
    ("42_raccoon-garden-mischief", "A baby raccoon peeking out from behind a flower pot in a cottage garden, surrounded by tomato plants, sunflowers, and a butterfly on its nose, cute whimsical style"),
    ("43_lamb-wildflowers", "A fluffy lamb lying in a meadow of wildflowers with daisies and buttercups, a butterfly perched on its ear, rolling hills in the distance, cute whimsical style"),
    ("44_chipmunk-acorn-home", "A chipmunk sitting in the doorway of a tiny acorn-shaped home built into a tree, with a miniature garden and tiny fence, cute whimsical style"),
    ("45_swan-lake-cottage", "A graceful swan with two cygnets swimming on a calm lake near a stone cottage, reeds, water lilies, and a wooden dock with trailing wisteria, cute whimsical style"),
    ("46_hamster-baking", "A hamster in a tiny apron standing on a kitchen counter next to a miniature mixing bowl, surrounded by berries, flour, and a tiny rolling pin, cute whimsical style"),
    ("47_kittens-yarn-basket", "Three kittens playing in and around a wicker basket overflowing with yarn balls, knitting needles, and a half-finished scarf, cute whimsical style"),
    ("48_bunny-garden-cart", "A bunny sitting in a wooden garden cart filled with freshly picked vegetables — carrots, lettuce, radishes — with a straw hat hanging on the side, cute whimsical style"),
    ("49_fox-cubs-wildflowers", "Two fox cubs playing together in a field of poppies and cornflowers, one jumping over the other, butterflies around them, cute whimsical style"),
    ("50_puppy-cottage-door", "A golden retriever puppy sitting on the doorstep of a cottage covered in climbing roses, with rain boots, a welcome mat, and potted plants, cute whimsical style"),

    # ── Animals + Cozy Objects (21-32) ──
    ("51_cat-stack-books-tea", "A tabby cat napping on top of a tall stack of books beside a steaming teacup, reading glasses, and a vase of wildflowers on a wooden table, cute whimsical style"),
    ("52_bird-vintage-key", "A small wren perched on a giant ornate vintage key surrounded by forget-me-nots, ivy, and a trailing ribbon, cute whimsical style"),
    ("53_mouse-teapot-home", "A little mouse living inside a cracked china teapot, with a tiny window, curtains, and a garden of flowers growing around the teapot, cute whimsical style"),
    ("54_bunny-watering-can", "A bunny sitting inside a large galvanized watering can surrounded by sprouting seedlings, daisies, and small butterflies, cute whimsical style"),
    ("55_hedgehog-boots-garden", "A hedgehog peeking out of a rain boot in a garden, next to other boots with flowers growing out of them, cute whimsical style"),
    ("56_kitten-mailbox-flowers", "A kitten sitting on top of a rustic mailbox covered in morning glories and climbing vines, with letters peeking out, cute whimsical style"),
    ("57_owl-lantern-night", "An owl perched on a vintage lantern glowing softly at night, surrounded by moths, fireflies, and night-blooming flowers, cute whimsical style"),
    ("58_frog-lily-pad-reading", "A frog wearing tiny glasses sitting on a lily pad reading a miniature book, surrounded by water lilies and a dragonfly, cute whimsical style"),
    ("59_cat-sewing-basket", "A cat curled up in a vintage sewing basket with spools of thread, fabric scraps, pincushion, and scissors, cute whimsical style"),
    ("60_squirrel-birdhouse", "A squirrel decorating a birdhouse with tiny flowers and bunting, perched on a branch with other birdhouses nearby, cute whimsical style"),
    ("61_dog-fireplace-nap", "A cozy dog sleeping on a cushion by a stone fireplace with a crackling fire, knitted blanket, and a mug on the hearth, cute whimsical style"),
    ("62_robin-nest-window", "A robin tending a nest of eggs on a cottage windowsill planter, with blooming flowers, lace curtains visible through the window, cute whimsical style"),

    # ── Whimsical & Fantasy (33-44) ──
    ("63_fairy-cottage-tree", "A tiny fairy cottage built into a tree trunk with a round wooden door, mushroom stepping stones, glowing lanterns, and a miniature garden, cute whimsical style"),
    ("64_treehouse-village", "A magical treehouse connected by rope bridges between large trees, lanterns hanging from branches, a rope ladder, birds visiting, cute whimsical style"),
    ("65_enchanted-bookshop", "A magical bookshop interior with towering curved shelves, books floating in the air, a spiral staircase, a cat sleeping on books, ivy growing on shelves, cute whimsical style"),
    ("66_mushroom-village", "A village of mushroom houses of various shapes and sizes with tiny paths, glowing lanterns, a small stream with a log bridge, and woodland animals peeking out, cute whimsical style"),
    ("67_potion-bottles-shelf", "A collection of ornate glass potion bottles of various shapes on a curved shelf, surrounded by herbs, crystals, a mortar and pestle, and a curious cat, cute whimsical style"),
    ("68_hot-air-balloon-cottage", "A decorative hot air balloon with patchwork patterns floating over a countryside of cottages, patchwork fields, and a winding river below, cute whimsical style"),
    ("69_lantern-forest-path", "A forest path lit by hanging lanterns and mason jars with fairy lights, wildflowers on both sides, fireflies glowing, a distant cottage, cute whimsical style"),
    ("70_wishing-well-garden", "A stone wishing well covered in moss and climbing roses, coins visible through clear water, ferns around the base, a bird perched on the handle, cute whimsical style"),
    ("71_magic-garden-gate", "An ornate wrought iron garden gate slightly open with glowing light beyond, magical vines and flowers growing through it, sparkles in the air, cute whimsical style"),
    ("72_clock-tower-overgrown", "An old clock tower beautifully overgrown with flowers, vines, and ivy, birds nesting in it, a garden growing at its base, cute whimsical style"),
    ("73_cloud-cottage", "A tiny cottage sitting on top of a fluffy cloud, with a garden path, flowers growing from the cloud, a rainbow, and birds flying around, cute whimsical style"),
    ("74_bottle-garden", "A miniature garden growing inside a giant glass bottle, with tiny trees, a path, a bench, mushrooms, and a butterfly inside, cute whimsical style"),

    # ── Botanicals & Nature (45-56) ──
    ("75_sunflower-study", "A detailed botanical study of a large sunflower with leaves, stem, seeds, and a smaller bud, a bee visiting, scientific illustration style, cute whimsical style"),
    ("76_rose-varieties", "Three different rose varieties displayed side by side — a full bloom, a bud, and a climbing rose — with thorns, leaves, and a small ladybug, cute whimsical style"),
    ("77_wildflower-bouquet", "A hand-tied bouquet of mixed wildflowers — Queen Anne's lace, cornflowers, poppies, buttercups — wrapped in brown paper and twine, cute whimsical style"),
    ("78_mushroom-collection", "A collection of different whimsical mushroom varieties arranged on a page — chanterelle, fly agaric, oyster, morel — with tiny snails and moss, cute whimsical style"),
    ("79_fern-fronds", "Several varieties of unfurling fern fronds and mature leaves arranged artistically, with fiddle heads and a small bird hiding among them, cute whimsical style"),
    ("80_berry-branches", "Branches of different berries — blackberries, strawberries, blueberries, raspberries — with leaves, flowers, and a small mouse eating one, cute whimsical style"),
    ("81_pressed-flowers", "A collection of pressed flowers arranged on a page like a herbarium — daisy, violet, forget-me-not, clover, buttercup — each with delicate detail, cute whimsical style"),
    ("82_succulent-pots", "An arrangement of various succulents and small cacti in different shaped pots — terracotta, ceramic, painted — on a rustic wooden shelf, cute whimsical style"),
    ("83_peony-bloom-full", "A large detailed peony flower in full bloom with multiple layers of petals, buds, and lush foliage, filling the entire page, cute whimsical style"),
    ("84_herb-window-garden", "A kitchen windowsill with labelled herb pots — rosemary, basil, thyme, lavender, mint — a watering can, and sunshine streaming in, cute whimsical style"),
    ("85_autumn-harvest", "An arrangement of autumn harvest items — pumpkins, apples, corn, dried sunflowers, wheat sheaves — in and around a wooden crate, cute whimsical style"),
    ("86_spring-wreath", "An elaborate circular wreath made of intertwined branches, spring flowers, a bird's nest with eggs, ribbon, and a small butterfly, cute whimsical style"),

    # ── Mandalas with Cottagecore Elements (57-64) ──
    ("87_floral-mandala", "An intricate circular mandala made entirely of flower motifs — roses, daisies, tulips, and leaves — in a radially symmetrical pattern"),
    ("88_butterfly-bee-mandala", "A mandala formed by butterflies and bees arranged in a circular pattern, with flower petals and honeycomb accents between them"),
    ("89_mushroom-mandala", "A mandala made of various mushroom types, ferns, and forest floor elements arranged in radial symmetry with intricate detail"),
    ("90_bird-feather-mandala", "A circular mandala featuring songbirds, feathers, nests, and eggs arranged symmetrically, surrounded by flowering branches"),
    ("91_herb-wreath-mandala", "A circular mandala wreath made of detailed herbs — rosemary, lavender, sage, thyme, basil — each section with roots and flowers"),
    ("92_ocean-shell-mandala", "A mandala with ocean and beach elements — shells, starfish, seahorses, waves, coral — arranged in beautiful radial symmetry"),
    ("93_celestial-mandala", "A mandala with sun, moon, stars, and clouds arranged in a day-to-night circular pattern with intricate geometric floral patterns"),
    ("94_cottage-mandala", "A mandala incorporating cottagecore elements — tiny cottages, teacups, books, candles, flowers — arranged in a circular symmetrical pattern"),

    # ── Cozy Scenes (65-80) ──
    ("95_fireside-reading", "A cozy armchair by a stone fireplace with a knitted blanket, stack of books, steaming mug, and a sleeping cat, crackling fire, cute whimsical style"),
    ("96_kitchen-baking", "A warm cottage kitchen with fresh bread cooling on a rack, mixing bowls, flour, rolling pin, checked curtains, herbs in jars, and a cat on the counter, cute whimsical style"),
    ("97_bedroom-nook", "A cozy cottage bedroom with a brass bed, patchwork quilt, bedside table with candle and book, dried flower wreath on wall, a cat curled on the bed, cute whimsical style"),
    ("98_pantry-shelves", "Rustic pantry shelves filled with mason jars of preserves, honey, dried herbs, bread, and a small mouse peeking out from behind a jar, cute whimsical style"),
    ("99_window-seat-rainy", "A window seat with plush cushions and pillows, rain streaming down the window, a mug of cocoa, open journal, cozy blanket, and a cat watching the rain, cute whimsical style"),
    ("100_writing-desk", "An antique writing desk with an inkwell, fountain pen, stack of letters tied with ribbon, pressed flowers, a candlestick, and a window view of a garden, cute whimsical style"),
    ("101_tea-time-spread", "An afternoon tea spread on a lace tablecloth: tiered cake stand with scones and pastries, floral teapot, jam jars, fresh cream, and a kitten sniffing a scone, cute whimsical style"),
    ("102_covered-bridge", "A charming covered wooden bridge over a gentle stream, autumn trees, fallen leaves in the water, a family of ducks swimming below, cute whimsical style"),
    ("103_village-square", "A quaint village square with a stone fountain, cobblestones, flower boxes on windows, a bakery with an awning, and a bicycle with a basket, cute whimsical style"),
    ("104_thatched-cottage", "A thatched roof stone cottage in the English countryside, smoke from chimney, garden gate, rolling hills behind, sheep in the distance, cute whimsical style"),
    ("105_lakeside-cabin", "A small log cabin beside a calm lake with mountain reflection, a canoe tied to a wooden dock, pine trees, wildflowers, and a deer on the shore, cute whimsical style"),
    ("106_orchard-bloom", "An apple orchard in full spring bloom, rows of flowering trees, a ladder against one tree, basket of apples, and a bunny hopping through, cute whimsical style"),
    ("107_farmers-market", "A farmers market scene with stalls of fresh produce, flowers, baked goods, jars of honey and jam, bunting, and a dog sitting beside a basket, cute whimsical style"),
    ("108_garden-picnic", "A spring picnic on a blanket under a blossoming cherry tree — basket, sandwiches, fruit, lemonade, books, a kite, and a cat sleeping on the blanket, cute whimsical style"),
    ("109_seed-starting", "A windowsill filled with seed starting trays, tiny sprouts emerging, seed packets, a spray bottle, sunshine streaming in, and a curious kitten sniffing a sprout, cute whimsical style"),
    ("110_beekeeping-garden", "A traditional beehive in a cottage garden with honeybees buzzing among flowers, a beekeeper hat and smoker nearby, honey jar, and a bear cub watching from behind a bush, cute whimsical style"),
]

TEMPLATE = (
    "{subject}, black and white line art coloring page, clean outlines, "
    "no shading, no gray tones, no color, white background, detailed illustration "
    "suitable for adult coloring book, consistent line weight, all areas enclosed "
    "for coloring, cottagecore aesthetic"
)


def generate_page(client, prompt_subject: str, filename: str, output_dir: Path, index: int):
    full_prompt = TEMPLATE.format(subject=prompt_subject)
    print(f"\n  [{index}] Generating: {filename}")
    print(f"       Prompt: {prompt_subject[:80]}...")

    try:
        response = client.models.generate_images(
            model="imagen-4.0-generate-001",
            prompt=full_prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="1:1",
                safety_filter_level="BLOCK_LOW_AND_ABOVE",
            ),
        )

        if not response.generated_images:
            print(f"       ERROR: No images returned (may have been filtered)")
            return False

        image = response.generated_images[0]
        out_path = output_dir / f"{filename}.png"
        image.image.save(out_path)
        size_kb = out_path.stat().st_size / 1024
        print(f"       Saved: {out_path} ({size_kb:.0f} KB)")
        return True

    except Exception as e:
        print(f"       ERROR: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Generate 80 coloring pages with Gemini Imagen 4.0")
    parser.add_argument("--api-key", required=True, help="Google AI API key")
    parser.add_argument("--output-dir", default="./raw-pages", help="Output directory")
    parser.add_argument("--start", type=int, default=1, help="Start at page N (1-indexed)")
    parser.add_argument("--end", type=int, default=80, help="End at page N (inclusive)")
    parser.add_argument("--delay", type=float, default=2, help="Seconds between requests")
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    client = genai.Client(api_key=args.api_key)

    start_idx = max(0, args.start - 1)
    end_idx = min(len(PAGES), args.end)
    pages_to_run = PAGES[start_idx:end_idx]
    total = len(pages_to_run)

    print(f"\n🌿 Ink & Meadow — Library Expansion (Gemini Imagen 4.0)")
    print(f"📦 Generating pages {args.start}–{end_idx} ({total} pages) → {output_dir}/\n")

    success = 0
    skipped = 0

    for i, (filename, prompt) in enumerate(pages_to_run):
        actual_idx = start_idx + i + 1
        out_path = output_dir / f"{filename}.png"

        if out_path.exists():
            print(f"  [{actual_idx}] ⏭ Skipping {filename} (already exists)")
            skipped += 1
            continue

        result = generate_page(client, prompt, filename, output_dir, actual_idx)
        if result:
            success += 1

        if i < total - 1:
            time.sleep(args.delay)

    print(f"\n{'='*50}")
    print(f"Done! {success} generated, {skipped} skipped, {total - success - skipped} failed")
    print(f"Raw images: {output_dir.resolve()}")
    print(f"\nNext steps:")
    print(f"  1. python scripts/process-coloring-page.py raw-pages/")
    print(f"  2. python scripts/upload-to-supabase.py (upload + seed DB)")


if __name__ == "__main__":
    main()
