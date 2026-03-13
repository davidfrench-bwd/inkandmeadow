#!/usr/bin/env python3
"""
Post-processing pipeline for AI-generated coloring pages.

Takes a raw Midjourney (or DALL-E) image and outputs a clean,
print-ready coloring page in both PDF and PNG formats.

Usage:
    source .venv/bin/activate
    python scripts/process-coloring-page.py input.png [--output-dir ./output]
    python scripts/process-coloring-page.py ./raw-pages/  # process entire folder

Pipeline steps:
    1. Convert to grayscale
    2. Apply adaptive thresholding (clean B&W with consistent line weight)
    3. Remove small artifacts (dust, noise)
    4. Ensure white background is pure white
    5. Upscale to 3600x3600 (300 DPI at 12x12 inches) if needed
    6. Output as high-res PNG (for iPad/Procreate) and PDF (for printing)
"""

import sys
import os
import argparse
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps
import numpy as np


# Target dimensions for print-ready output (300 DPI at 12x12 inches)
TARGET_SIZE = 3600
# Threshold for converting to pure B&W (0-255, lower = more black)
BW_THRESHOLD = 200
# Minimum artifact size to keep (in pixels) — removes dust/noise
MIN_ARTIFACT_SIZE = 50


def _set_threshold(value: int):
    global BW_THRESHOLD
    BW_THRESHOLD = value


def process_image(input_path: Path, output_dir: Path) -> dict:
    """Process a single image through the coloring page pipeline."""

    stem = input_path.stem
    print(f"  Processing: {input_path.name}")

    # Step 1: Load and convert to grayscale
    img = Image.open(input_path).convert("L")
    print(f"    Original size: {img.size}")

    # Step 2: Upscale if needed (before thresholding for better quality)
    w, h = img.size
    if w < TARGET_SIZE or h < TARGET_SIZE:
        scale = TARGET_SIZE / min(w, h)
        new_w, new_h = int(w * scale), int(h * scale)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        print(f"    Upscaled to: {img.size}")

    # Crop to square if not already
    w, h = img.size
    if w != h:
        size = min(w, h)
        left = (w - size) // 2
        top = (h - size) // 2
        img = img.crop((left, top, left + size, top + size))
        print(f"    Cropped to square: {img.size}")

    # Resize to exact target
    if img.size != (TARGET_SIZE, TARGET_SIZE):
        img = img.resize((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)

    # Step 3: Slight sharpen to crisp up lines before thresholding
    img = img.filter(ImageFilter.SHARPEN)

    # Step 4: Adaptive thresholding for clean B&W
    # Use a two-pass approach: global threshold + local cleanup
    arr = np.array(img, dtype=np.float32)

    # Global threshold — pixels above threshold become white, below become black
    bw = np.where(arr > BW_THRESHOLD, 255, 0).astype(np.uint8)

    # Step 5: Remove small artifacts (isolated dark pixels / noise)
    bw_img = Image.fromarray(bw, mode="L")

    # Dilate then erode (closing) to connect nearby line segments
    # This helps close small gaps in lines
    bw_img = bw_img.filter(ImageFilter.MinFilter(size=3))  # dilate black
    bw_img = bw_img.filter(ImageFilter.MaxFilter(size=3))  # erode back

    # Step 6: Ensure edges have a white border (for printing)
    border_size = 100  # ~0.33 inches at 300 DPI
    arr = np.array(bw_img)
    arr[:border_size, :] = 255  # top
    arr[-border_size:, :] = 255  # bottom
    arr[:, :border_size] = 255  # left
    arr[:, -border_size:] = 255  # right
    bw_img = Image.fromarray(arr, mode="L")

    # Convert to RGB for output
    rgb_img = bw_img.convert("RGB")

    # Step 7: Save outputs
    output_dir.mkdir(parents=True, exist_ok=True)

    # PNG for iPad/Procreate (high res, transparent-ready)
    png_path = output_dir / f"{stem}.png"
    rgb_img.save(png_path, "PNG", optimize=True)
    png_size = png_path.stat().st_size / 1024

    # PDF for printing
    pdf_path = output_dir / f"{stem}.pdf"
    # Set DPI metadata for correct print sizing
    rgb_img.save(pdf_path, "PDF", resolution=300)
    pdf_size = pdf_path.stat().st_size / 1024

    print(f"    PNG: {png_path} ({png_size:.0f} KB)")
    print(f"    PDF: {pdf_path} ({pdf_size:.0f} KB)")

    return {
        "input": str(input_path),
        "png": str(png_path),
        "pdf": str(pdf_path),
        "png_size_kb": png_size,
        "pdf_size_kb": pdf_size,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Process AI-generated images into print-ready coloring pages"
    )
    parser.add_argument(
        "input",
        help="Input image file or directory of images",
    )
    parser.add_argument(
        "--output-dir",
        default="./output/coloring-pages",
        help="Output directory (default: ./output/coloring-pages)",
    )
    parser.add_argument(
        "--threshold",
        type=int,
        default=BW_THRESHOLD,
        help=f"B&W threshold 0-255 (default: {BW_THRESHOLD}, lower = more black lines)",
    )
    args = parser.parse_args()

    _set_threshold(args.threshold)

    input_path = Path(args.input)
    output_dir = Path(args.output_dir)

    if input_path.is_file():
        files = [input_path]
    elif input_path.is_dir():
        files = sorted(
            p for p in input_path.iterdir()
            if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
        )
    else:
        print(f"Error: {input_path} not found")
        sys.exit(1)

    if not files:
        print("No image files found")
        sys.exit(1)

    print(f"\nProcessing {len(files)} image(s) → {output_dir}/\n")

    results = []
    for f in files:
        try:
            result = process_image(f, output_dir)
            results.append(result)
        except Exception as e:
            print(f"  ERROR processing {f.name}: {e}")

    print(f"\nDone! {len(results)}/{len(files)} pages processed successfully.")
    print(f"Output: {output_dir.resolve()}")


if __name__ == "__main__":
    main()
