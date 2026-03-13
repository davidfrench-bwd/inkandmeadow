#!/usr/bin/env python3
"""
Upload processed coloring pages to Supabase Storage.

Usage:
    source .venv/bin/activate
    python scripts/upload-to-supabase.py --supabase-url URL --service-key KEY [--collection 2026-04]
"""

import argparse
import sys
from pathlib import Path

import httpx


def upload_file(base_url: str, service_key: str, bucket: str, remote_path: str, local_path: Path):
    """Upload a single file to Supabase Storage."""
    url = f"{base_url}/storage/v1/object/{bucket}/{remote_path}"
    headers = {
        "Authorization": f"Bearer {service_key}",
        "apikey": service_key,
        "Content-Type": "image/png",
        "x-upsert": "true",
    }
    with open(local_path, "rb") as f:
        data = f.read()

    resp = httpx.put(url, headers=headers, content=data, timeout=60)
    return resp.status_code, resp.text


def main():
    parser = argparse.ArgumentParser(description="Upload coloring pages to Supabase Storage")
    parser.add_argument("--supabase-url", required=True, help="Supabase project URL")
    parser.add_argument("--service-key", required=True, help="Supabase service role key")
    parser.add_argument("--bucket", default="coloring-pages", help="Storage bucket name")
    parser.add_argument("--collection", default="2026-04", help="Collection folder name")
    parser.add_argument("--input-dir", default="./output/coloring-pages", help="Directory of processed PNGs")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    files = sorted(p for p in input_dir.iterdir() if p.suffix == ".png")

    if not files:
        print("No PNG files found")
        sys.exit(1)

    print(f"\nUploading {len(files)} pages to {args.bucket}/{args.collection}/\n")

    success = 0
    for f in files:
        remote_path = f"{args.collection}/{f.name}"
        status, text = upload_file(args.supabase_url, args.service_key, args.bucket, remote_path, f)
        if status in (200, 201):
            size_kb = f.stat().st_size / 1024
            print(f"  OK  {remote_path} ({size_kb:.0f} KB)")
            success += 1
        else:
            print(f"  ERR {remote_path} — {status}: {text}")

    print(f"\nDone! {success}/{len(files)} uploaded.")
    public_base = f"{args.supabase_url}/storage/v1/object/public/{args.bucket}/{args.collection}"
    print(f"Public URL: {public_base}/")


if __name__ == "__main__":
    main()
