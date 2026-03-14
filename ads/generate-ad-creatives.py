#!/usr/bin/env python3
"""Generate ad creative images for Ink & Meadow Meta campaigns using Gemini Imagen."""

import os
import time
from google import genai

API_KEY = "AIzaSyByFszIb0fXHPUCwMkcN_h9Cqa9B8m4Ngs"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "creatives")
os.makedirs(OUTPUT_DIR, exist_ok=True)

client = genai.Client(api_key=API_KEY)

# Ad creative prompts - lifestyle/marketing style photos (NOT coloring pages)
AD_IMAGES = [
    # Single image ads - lifestyle flat lays
    {
        "filename": "flatlay-starter-grid.png",
        "prompt": (
            "Overhead flat lay photograph of 6 beautiful black and white coloring pages "
            "spread out on a warm wooden table. The pages show cottagecore illustrations of "
            "cute animals - kittens, bunnies, fawns. Around the pages: colored pencils in "
            "earthy tones, a cup of tea with steam, a small candle, dried flowers. "
            "Warm natural lighting, cozy aesthetic. Photography style, not illustration. "
            "Instagram ad format, square aspect ratio."
        ),
    },
    {
        "filename": "lifestyle-coloring-evening.png",
        "prompt": (
            "Close-up photograph of a woman's hands coloring a detailed black and white "
            "cottagecore coloring page with colored pencils. The page shows a cute kitten "
            "sitting on a stack of books surrounded by flowers. Visible on the table: a mug "
            "of tea, a cozy knit blanket edge, warm lamp light. Shallow depth of field, "
            "warm tones, evening ambiance. Lifestyle photography for Instagram ad."
        ),
    },
    {
        "filename": "gift-presentation.png",
        "prompt": (
            "Aesthetic photograph of a small stack of printed coloring pages tied with a "
            "sage green ribbon, placed on tissue paper inside a kraft paper envelope. "
            "Around it: dried eucalyptus sprigs, a handwritten gift tag. Clean white "
            "marble surface. The coloring pages show cute cottagecore animal illustrations. "
            "Gift-giving concept. Bright, airy photography, Instagram ad format."
        ),
    },
    # Lifestyle - iPad coloring
    {
        "filename": "ipad-coloring-cozy.png",
        "prompt": (
            "Cozy photograph of an iPad on a soft blanket showing a partially colored "
            "cottagecore coloring page of a fox among roses. An Apple Pencil rests beside it. "
            "Background: fuzzy blanket, a candle, a cup of hot chocolate. Warm evening "
            "lighting, hygge aesthetic. Top-down angle. Instagram ad photography style."
        ),
    },
    # Carousel card backgrounds - clean with coloring page previews
    {
        "filename": "carousel-bg-cream.png",
        "prompt": (
            "Clean aesthetic product photograph: a single printed coloring page showing a "
            "cute baby deer (fawn) in a wildflower meadow, lying on a cream linen surface. "
            "A few colored pencils arranged neatly beside it. Minimal, clean composition. "
            "Soft natural light from the left. No text. Square format for Instagram carousel."
        ),
    },
    {
        "filename": "carousel-bg-kitten.png",
        "prompt": (
            "Clean aesthetic product photograph: a single printed coloring page showing an "
            "adorable kitten sitting on books surrounded by flowers, lying on a warm wooden "
            "desk surface. A cup of tea and 2-3 colored pencils nearby. Minimal composition. "
            "Soft natural light. No text. Square format for Instagram carousel."
        ),
    },
    {
        "filename": "carousel-bg-bunny.png",
        "prompt": (
            "Clean aesthetic product photograph: a single printed coloring page showing a "
            "cute bunny in a teacup with daisies, lying on a sage green linen surface. "
            "A small potted plant and colored pencils nearby. Minimal, aesthetic composition. "
            "Soft natural light. No text. Square format for Instagram carousel."
        ),
    },
    {
        "filename": "carousel-bg-fox.png",
        "prompt": (
            "Clean aesthetic product photograph: a single printed coloring page showing a "
            "fox under rose arches, lying on a white wooden table. A jar of colored pencils "
            "and a small vase of wildflowers nearby. Cottagecore aesthetic. Minimal composition. "
            "Soft natural light. No text. Square format for Instagram carousel."
        ),
    },
    {
        "filename": "carousel-bg-corgi.png",
        "prompt": (
            "Clean aesthetic product photograph: a single printed coloring page showing a "
            "corgi puppy in a flower basket, lying on a knit blanket. A mug of coffee and "
            "colored pencils scattered artfully. Cozy, warm aesthetic. Minimal composition. "
            "Soft natural light. No text. Square format for Instagram carousel."
        ),
    },
]


def generate_image(prompt: str, filename: str, retries: int = 3) -> bool:
    """Generate a single image with retries."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(filepath):
        print(f"  [skip] {filename} already exists")
        return True

    for attempt in range(retries):
        try:
            response = client.models.generate_images(
                model="imagen-4.0-generate-001",
                prompt=prompt,
                config=genai.types.GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio="1:1",
                    safety_filter_level="BLOCK_LOW_AND_ABOVE",
                ),
            )

            if response.generated_images:
                image = response.generated_images[0]
                image.image.save(filepath)
                print(f"  [ok] {filename}")
                return True
            else:
                print(f"  [empty] {filename} - no image returned (attempt {attempt + 1})")

        except Exception as e:
            err = str(e)
            if "429" in err or "RESOURCE_EXHAUSTED" in err:
                wait = 30 * (attempt + 1)
                print(f"  [rate limit] waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"  [error] {filename}: {err}")
                if attempt < retries - 1:
                    time.sleep(5)

    return False


def main():
    print(f"Generating {len(AD_IMAGES)} ad creatives...\n")

    success = 0
    for i, img in enumerate(AD_IMAGES):
        print(f"[{i + 1}/{len(AD_IMAGES)}] {img['filename']}")
        time.sleep(6)  # Rate limit spacing
        if generate_image(img["prompt"], img["filename"]):
            success += 1

    print(f"\nDone: {success}/{len(AD_IMAGES)} images generated")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
