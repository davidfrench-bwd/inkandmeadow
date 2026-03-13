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
PROMPTS = [
    # Garden Paths & Structures (1-5)
    "A winding stone path through a secret garden with an ornate iron gate covered in climbing roses",
    "A crumbling stone archway overgrown with wisteria and ivy leading into a hidden garden",
    "An old wooden garden door set into a stone wall with roses growing over the top and a keyhole",
    "A secret garden greenhouse with glass panels, hanging ferns, potted orchids, and a watering can",
    "A garden pergola covered in climbing jasmine with a wooden bench underneath, surrounded by flower beds",
    # Flowers & Botanicals (6-10)
    "A detailed close-up of a peony bush in full bloom with buds and leaves, botanical illustration style",
    "A circular wreath made of sweet peas, honeysuckle, and garden roses with ribbons",
    "A vintage watering can overflowing with wildflowers including daisies, cornflowers, and poppies",
    "A garden window sill with potted herbs — rosemary, lavender, basil — and a butterfly visiting",
    "A moss-covered stone fountain surrounded by lily pads, water lilies, and dragonflies",
    # Woodland Creatures (11-15)
    "A fox sleeping curled up under a rose bush in a secret garden, cute whimsical style",
    "Two rabbits sitting among garden clovers and dandelions near a garden wall",
    "A hedgehog family walking through a garden path lined with mushrooms and ferns",
    "A bluebird perched on a garden spade handle with seedlings sprouting nearby",
    "A squirrel sitting on a moss-covered garden statue holding an acorn, surrounded by flowers",
    # Cozy Scenes (16-20)
    "A garden tea table set for two with teacups, a teapot, scones, and a vase of fresh-cut flowers",
    "A reading nook in a garden with a hammock strung between two trees, books, and a blanket",
    "A cozy garden potting bench with terra cotta pots, seed packets, gardening gloves, and trailing ivy",
    "A garden bicycle with a flower-filled basket parked against a picket fence with climbing roses",
    "A cozy garden shed with an open door showing tools inside, flower boxes on the windows, and a cat napping on the doorstep",
    # Whimsical & Fairy-tale (21-25)
    "A fairy door at the base of an old oak tree surrounded by toadstools, ferns, and tiny flowers",
    "A secret garden sundial covered in morning glory vines with butterflies",
    "A garden mandala made of concentric circles of different flowers — roses, daisies, tulips, lavender",
    "A treehouse in a flowering cherry tree with a rope ladder and bunting flags",
    "A garden bridge over a small stream with koi fish, water lilies, and weeping willows",
    # Seasonal Botanicals (26-30)
    "A detailed botanical illustration of a climbing rose branch with thorns, buds, open blooms, and leaves, scientific botanical illustration style",
    "A collection of spring vegetables in a garden basket — radishes, peas in pods, carrots with tops, lettuce",
    "A beehive in a garden with bees visiting nearby lavender and clover flowers",
    "A decorative garden urn overflowing with trailing ivy, geraniums, and petunias on a stone pedestal",
    "A garden gate with climbing sweet peas, a stone path leading away, and birds flying overhead",
]

FILENAMES = [
    # Garden Paths & Structures
    "01_secret-garden-gate",
    "02_wisteria-archway",
    "03_garden-door-in-wall",
    "04_garden-greenhouse",
    "05_jasmine-pergola",
    # Flowers & Botanicals
    "06_peony-bush-bloom",
    "07_flower-wreath",
    "08_wildflower-watering-can",
    "09_herb-windowsill",
    "10_stone-fountain-lilies",
    # Woodland Creatures
    "11_fox-under-roses",
    "12_rabbits-in-clovers",
    "13_hedgehog-family",
    "14_bluebird-on-spade",
    "15_squirrel-garden-statue",
    # Cozy Scenes
    "16_garden-tea-table",
    "17_garden-hammock-reading",
    "18_potting-bench",
    "19_bicycle-picket-fence",
    "20_garden-shed-cat",
    # Whimsical & Fairy-tale
    "21_fairy-door-oak-tree",
    "22_sundial-morning-glory",
    "23_flower-mandala",
    "24_cherry-tree-treehouse",
    "25_garden-bridge-koi",
    # Seasonal Botanicals
    "26_climbing-rose-botanical",
    "27_spring-vegetable-basket",
    "28_beehive-lavender",
    "29_garden-urn-flowers",
    "30_garden-gate-sweet-peas",
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
