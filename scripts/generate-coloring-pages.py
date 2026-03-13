#!/usr/bin/env python3
"""
Generate coloring pages using Google Gemini's image generation.

Usage:
    source .venv/bin/activate
    python scripts/generate-coloring-pages.py --api-key YOUR_KEY
    python scripts/generate-coloring-pages.py --api-key YOUR_KEY --start 1 --end 5  # just first 5
"""

import argparse
import sys
import time
from pathlib import Path

from google import genai
from google.genai import types

# April "Secret Garden" collection prompts — subject only
# The script wraps each in the coloring page template
# Mix: ~50% animals in cottagecore, ~20% animals + cozy objects, ~15% mandalas, ~15% cozy scenes
PROMPTS = [
    # Cute Animals in Cottagecore Settings (1-15)
    "A fluffy kitten curled up sleeping on a stack of old books beside a window with climbing roses outside, cute whimsical style",
    "A fox sleeping curled up under a rose bush in a secret garden with mushrooms and ferns around it, cute whimsical style",
    "Two baby rabbits sitting together in a garden of wildflowers, clovers, and dandelions, cute whimsical style",
    "A hedgehog family walking along a cobblestone garden path with toadstools, ferns, and tiny daisies, cute whimsical style",
    "A baby deer fawn lying in a meadow of wildflowers with butterflies landing on its nose, cute whimsical style",
    "An owl family perched on a branch of a flowering tree with a crescent moon and stars, cute whimsical style",
    "A fluffy cat sitting on a cottage windowsill among potted flowers and herbs looking out at a garden, cute whimsical style",
    "Three little ducklings swimming in a garden pond with lily pads, water lilies, and dragonflies, cute whimsical style",
    "A squirrel sitting on a mossy tree stump holding an acorn surrounded by wildflowers and ferns, cute whimsical style",
    "A mother hen with baby chicks in a cottage garden with sunflowers and a white picket fence, cute whimsical style",
    "Two birds building a nest in a flowering cherry blossom tree with petals falling, cute whimsical style",
    "A sleeping bear cub nestled among lavender bushes and wildflowers in a forest clearing, cute whimsical style",
    "A family of field mice living in a tiny cottage made from a hollowed pumpkin surrounded by flowers, cute whimsical style",
    "A corgi puppy sitting in a wicker basket full of freshly picked flowers in a cottage garden, cute whimsical style",
    "A pair of lovebirds perched on a garden arch covered in climbing roses with a sunset sky, cute whimsical style",
    # Animals + Cozy Objects (16-21)
    "A tabby cat napping on a cozy armchair next to a stack of books, a teacup, and a vase of wildflowers, cute whimsical style",
    "A bunny sitting next to an oversized teacup surrounded by daisies and lavender sprigs, cute whimsical style",
    "A bluebird perched on the handle of a vintage watering can overflowing with wildflowers, cute whimsical style",
    "A kitten playing with a ball of yarn on a garden potting bench with terra cotta pots and trailing ivy, cute whimsical style",
    "A fox sitting beside a lantern on a garden path at twilight with fireflies and flowers all around, cute whimsical style",
    "A little mouse sitting on a mushroom reading a tiny book surrounded by forest flowers and ferns, cute whimsical style",
    # Mandalas & Patterns (22-25)
    "A garden mandala made of concentric circles of different flowers — roses, daisies, tulips, lavender, and peonies",
    "A mandala made of cute woodland animals arranged in a circle — foxes, rabbits, hedgehogs, birds — surrounded by flowers and vines",
    "An intricate butterfly mandala with detailed wings made of flower petals, leaves, and vines in concentric patterns",
    "A mandala made of cats and kittens in different cozy poses surrounded by rings of flowers, yarn balls, and teacups",
    # Cozy Scenes (26-30)
    "A garden tea table set for two with teacups, a teapot, scones, and a vase of fresh-cut flowers, with a cat sleeping under the table",
    "A cozy reading nook in a garden with a hammock strung between two flowering trees, books, a blanket, and a sleeping dog nearby",
    "A cottage front door with flower boxes on the windows, climbing roses, a welcome mat, and a cat sitting on the doorstep",
    "A garden bicycle with a flower-filled basket parked against a picket fence with a bird perched on the handlebars",
    "A fairy-tale treehouse in a giant oak tree with a rope ladder, bunting flags, flowers growing on the branches, and a squirrel on the railing",
]

FILENAMES = [
    # Cute Animals in Cottagecore Settings
    "01_kitten-on-books",
    "02_fox-under-roses",
    "03_baby-rabbits-wildflowers",
    "04_hedgehog-family-path",
    "05_fawn-in-meadow",
    "06_owl-family-tree",
    "07_cat-cottage-windowsill",
    "08_ducklings-garden-pond",
    "09_squirrel-tree-stump",
    "10_hen-chicks-cottage",
    "11_birds-cherry-blossom",
    "12_bear-cub-lavender",
    "13_mice-pumpkin-cottage",
    "14_corgi-flower-basket",
    "15_lovebirds-rose-arch",
    # Animals + Cozy Objects
    "16_cat-armchair-books",
    "17_bunny-teacup-daisies",
    "18_bluebird-watering-can",
    "19_kitten-yarn-potting",
    "20_fox-lantern-garden",
    "21_mouse-mushroom-reading",
    # Mandalas & Patterns
    "22_flower-garden-mandala",
    "23_woodland-animal-mandala",
    "24_butterfly-mandala",
    "25_cat-kitten-mandala",
    # Cozy Scenes
    "26_garden-tea-table-cat",
    "27_hammock-reading-dog",
    "28_cottage-door-cat",
    "29_bicycle-bird-fence",
    "30_treehouse-squirrel",
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
    print(f"       Prompt: {prompt_subject[:70]}...")

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
    parser = argparse.ArgumentParser(description="Generate coloring pages with Gemini Imagen")
    parser.add_argument("--api-key", required=True, help="Google AI API key")
    parser.add_argument("--output-dir", default="./raw-pages", help="Output directory for raw images")
    parser.add_argument("--start", type=int, default=1, help="Start at prompt N (1-indexed)")
    parser.add_argument("--end", type=int, default=30, help="End at prompt N (inclusive)")
    parser.add_argument("--delay", type=float, default=2, help="Seconds between requests (rate limiting)")
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    client = genai.Client(api_key=args.api_key)

    start_idx = max(0, args.start - 1)
    end_idx = min(len(PROMPTS), args.end)

    prompts_to_run = list(zip(PROMPTS[start_idx:end_idx], FILENAMES[start_idx:end_idx]))
    total = len(prompts_to_run)

    print(f"\nGenerating {total} coloring pages → {output_dir}/")
    print(f"Prompts {args.start} through {end_idx}\n")

    success = 0
    for i, (prompt, filename) in enumerate(prompts_to_run):
        result = generate_page(client, prompt, filename, output_dir, start_idx + i + 1)
        if result:
            success += 1

        # Rate limiting between requests
        if i < total - 1:
            time.sleep(args.delay)

    print(f"\n{'='*50}")
    print(f"Done! {success}/{total} pages generated successfully.")
    print(f"Raw images: {output_dir.resolve()}")
    print(f"\nNext step — run post-processing:")
    print(f"  python scripts/process-coloring-page.py {output_dir}/")


if __name__ == "__main__":
    main()
