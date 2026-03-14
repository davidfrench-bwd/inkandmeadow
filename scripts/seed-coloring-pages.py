#!/usr/bin/env python3
"""
Seed the coloring_pages table in Supabase with the April 2026 collection.

Usage:
    source .venv/bin/activate
    python scripts/seed-coloring-pages.py --supabase-url URL --service-key KEY
"""

import argparse
import json
import sys
import httpx

STORAGE_BASE = "https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04"

PAGES = [
    {"title": "Kitten on Books", "file": "01_kitten-on-books.png", "is_premium": False, "sort_order": 1},
    {"title": "Fox Under Roses", "file": "02_fox-under-roses.png", "is_premium": False, "sort_order": 2},
    {"title": "Baby Rabbits in Wildflowers", "file": "03_baby-rabbits-wildflowers.png", "is_premium": False, "sort_order": 3},
    {"title": "Hedgehog Family on Path", "file": "04_hedgehog-family-path.png", "is_premium": False, "sort_order": 4},
    {"title": "Fawn in Meadow", "file": "05_fawn-in-meadow.png", "is_premium": False, "sort_order": 5},
    {"title": "Owl Family in Tree", "file": "06_owl-family-tree.png", "is_premium": False, "sort_order": 6},
    {"title": "Cat on Cottage Windowsill", "file": "07_cat-cottage-windowsill.png", "is_premium": False, "sort_order": 7},
    {"title": "Ducklings in Garden Pond", "file": "08_ducklings-garden-pond.png", "is_premium": False, "sort_order": 8},
    {"title": "Squirrel on Tree Stump", "file": "09_squirrel-tree-stump.png", "is_premium": False, "sort_order": 9},
    {"title": "Hen & Chicks in Cottage Garden", "file": "10_hen-chicks-cottage.png", "is_premium": False, "sort_order": 10},
    {"title": "Birds in Cherry Blossom", "file": "11_birds-cherry-blossom.png", "is_premium": False, "sort_order": 11},
    {"title": "Bear Cub in Lavender", "file": "12_bear-cub-lavender.png", "is_premium": False, "sort_order": 12},
    {"title": "Mice in Pumpkin Cottage", "file": "13_mice-pumpkin-cottage.png", "is_premium": False, "sort_order": 13},
    {"title": "Corgi in Flower Basket", "file": "14_corgi-flower-basket.png", "is_premium": False, "sort_order": 14},
    {"title": "Lovebirds on Rose Arch", "file": "15_lovebirds-rose-arch.png", "is_premium": False, "sort_order": 15},
    {"title": "Cat on Armchair with Books", "file": "16_cat-armchair-books.png", "is_premium": False, "sort_order": 16},
    {"title": "Bunny & Teacup with Daisies", "file": "17_bunny-teacup-daisies.png", "is_premium": False, "sort_order": 17},
    {"title": "Bluebird on Watering Can", "file": "18_bluebird-watering-can.png", "is_premium": False, "sort_order": 18},
    {"title": "Kitten with Yarn", "file": "19_kitten-yarn-potting.png", "is_premium": False, "sort_order": 19},
    {"title": "Fox & Lantern in Garden", "file": "20_fox-lantern-garden.png", "is_premium": False, "sort_order": 20},
    {"title": "Mouse Reading on Mushroom", "file": "21_mouse-mushroom-reading.png", "is_premium": False, "sort_order": 21},
    {"title": "Flower Garden Mandala", "file": "22_flower-garden-mandala.png", "is_premium": True, "sort_order": 22},
    {"title": "Woodland Animal Mandala", "file": "23_woodland-animal-mandala.png", "is_premium": True, "sort_order": 23},
    {"title": "Butterfly Mandala", "file": "24_butterfly-mandala.png", "is_premium": True, "sort_order": 24},
    {"title": "Cat & Kitten Mandala", "file": "25_cat-kitten-mandala.png", "is_premium": True, "sort_order": 25},
    {"title": "Garden Tea Table with Cat", "file": "26_garden-tea-table-cat.png", "is_premium": True, "sort_order": 26},
    {"title": "Hammock Reading with Dog", "file": "27_hammock-reading-dog.png", "is_premium": True, "sort_order": 27},
    {"title": "Cottage Door with Cat", "file": "28_cottage-door-cat.png", "is_premium": True, "sort_order": 28},
    {"title": "Bicycle & Bird at Fence", "file": "29_bicycle-bird-fence.png", "is_premium": True, "sort_order": 29},
    {"title": "Treehouse with Squirrel", "file": "30_treehouse-squirrel.png", "is_premium": True, "sort_order": 30},
]


def main():
    parser = argparse.ArgumentParser(description="Seed coloring_pages table")
    parser.add_argument("--supabase-url", required=True)
    parser.add_argument("--service-key", required=True)
    parser.add_argument("--collection", default="2026-04")
    parser.add_argument("--delete-old", action="store_true", help="Delete all existing pages first")
    args = parser.parse_args()

    headers = {
        "apikey": args.service_key,
        "Authorization": f"Bearer {args.service_key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    base = f"{args.supabase_url}/rest/v1/coloring_pages"

    if args.delete_old:
        print("Deleting existing pages...")
        # Delete all rows (Supabase needs a filter, use id != impossible value)
        resp = httpx.delete(
            f"{base}?id=neq.00000000-0000-0000-0000-000000000000",
            headers=headers,
            timeout=30,
        )
        print(f"  Delete: {resp.status_code}")

    # Build insert payload
    rows = []
    for page in PAGES:
        rows.append({
            "title": page["title"],
            "theme": "Secret Garden",
            "collection_month": args.collection,
            "collection_name": "April 2026: Secret Garden",
            "is_premium": page["is_premium"],
            "file_url": f"{STORAGE_BASE}/{page['file']}",
            "sort_order": page["sort_order"],
        })

    print(f"\nInserting {len(rows)} pages for collection {args.collection}...")

    resp = httpx.post(
        base,
        headers=headers,
        content=json.dumps(rows),
        timeout=30,
    )

    if resp.status_code in (200, 201):
        print(f"  Success! {len(rows)} pages inserted.")
    else:
        print(f"  Error {resp.status_code}: {resp.text}")
        sys.exit(1)

    # Verify
    headers_read = {
        "apikey": args.service_key,
        "Authorization": f"Bearer {args.service_key}",
        "Prefer": "count=exact",
    }
    resp = httpx.get(
        f"{base}?select=count&collection_month=eq.{args.collection}",
        headers=headers_read,
        timeout=30,
    )
    print(f"\nVerification: {resp.text}")
    print("Done!")


if __name__ == "__main__":
    main()
