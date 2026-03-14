#!/usr/bin/env python3
"""Launch Ink & Meadow Meta ad campaigns via the Marketing API."""

import json
import os
import time
import requests

ACCESS_TOKEN = "EAAd9Mk6N8M8BQ6idrh9C88yguLrbNCmkSZC3dKygyPoxABqhaMzlmZBZCC6b0eznnNuCZB9eDZB3Wvm988xFNhMrGpGkuE2FWpErVWOGGjmeqIi5hpBmHhruglvOJ54BZCMqiHw60oaJFRh8sj32dclGA7bZAUhjAYS821JSqedx3k6EwCJB2ZBY57xZB2BxOhhM6ZCEsleJZAHrPoNdHhZC"
AD_ACCOUNT_ID = "act_364969284829337"
PIXEL_ID = "392123258845113"
PAGE_URL = "https://inkandmeadow.com"
API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{API_VERSION}"

CREATIVES_DIR = os.path.join(os.path.dirname(__file__), "creatives")


def api_post(endpoint, data=None, files=None):
    """Make a POST request to the Meta API."""
    url = f"{BASE_URL}/{endpoint}"
    if data is None:
        data = {}
    data["access_token"] = ACCESS_TOKEN
    resp = requests.post(url, data=data, files=files)
    result = resp.json()
    if "error" in result:
        print(f"  ERROR: {result['error'].get('message', result['error'])}")
        return None
    return result


def api_get(endpoint, params=None):
    """Make a GET request to the Meta API."""
    url = f"{BASE_URL}/{endpoint}"
    if params is None:
        params = {}
    params["access_token"] = ACCESS_TOKEN
    resp = requests.get(url, params=params)
    return resp.json()


def upload_image(filename):
    """Upload an ad image and return the image hash."""
    filepath = os.path.join(CREATIVES_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  [skip] {filename} not found")
        return None

    with open(filepath, "rb") as f:
        result = api_post(
            f"{AD_ACCOUNT_ID}/adimages",
            files={"filename": (filename, f, "image/png")},
        )

    if result and "images" in result:
        img_data = list(result["images"].values())[0]
        print(f"  [ok] Uploaded {filename} -> {img_data['hash']}")
        return img_data["hash"]
    return None


def create_campaign(name, objective, daily_budget_cents, status="PAUSED"):
    """Create a campaign with CBO."""
    result = api_post(
        f"{AD_ACCOUNT_ID}/campaigns",
        {
            "name": name,
            "objective": objective,
            "status": status,
            "special_ad_categories": "[]",
            "daily_budget": daily_budget_cents,
            "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
        },
    )
    if result and "id" in result:
        print(f"  [ok] Campaign: {name} -> {result['id']}")
        return result["id"]
    return None


def create_adset(campaign_id, name, targeting, daily_budget_cents=None,
                 optimization_goal="OFFSITE_CONVERSIONS", status="PAUSED"):
    """Create an ad set."""
    data = {
        "campaign_id": campaign_id,
        "name": name,
        "optimization_goal": optimization_goal,
        "billing_event": "IMPRESSIONS",
        "status": status,
        "targeting": json.dumps(targeting),
        "promoted_object": json.dumps({"pixel_id": PIXEL_ID, "custom_event_type": "PURCHASE"}),
    }

    if daily_budget_cents:
        data["daily_budget"] = daily_budget_cents

    result = api_post(f"{AD_ACCOUNT_ID}/adsets", data)
    if result and "id" in result:
        print(f"  [ok] Ad Set: {name} -> {result['id']}")
        return result["id"]
    return None


def create_ad_creative_single(name, image_hash, primary_text, headline,
                               description, link_url, cta_type="SHOP_NOW"):
    """Create a single image ad creative."""
    result = api_post(
        f"{AD_ACCOUNT_ID}/adcreatives",
        {
            "name": name,
            "object_story_spec": json.dumps({
                "page_id": "",  # Will be set below
                "link_data": {
                    "image_hash": image_hash,
                    "link": link_url,
                    "message": primary_text,
                    "name": headline,
                    "description": description,
                    "call_to_action": {"type": cta_type},
                },
            }),
        },
    )
    if result and "id" in result:
        print(f"  [ok] Creative: {name} -> {result['id']}")
        return result["id"]
    return None


def create_ad_creative_carousel(name, cards, primary_text, link_url, cta_type="SHOP_NOW"):
    """Create a carousel ad creative."""
    child_attachments = []
    for card in cards:
        child_attachments.append({
            "image_hash": card["image_hash"],
            "name": card.get("headline", ""),
            "description": card.get("description", ""),
            "link": link_url,
            "call_to_action": {"type": cta_type},
        })

    result = api_post(
        f"{AD_ACCOUNT_ID}/adcreatives",
        {
            "name": name,
            "object_story_spec": json.dumps({
                "page_id": "",  # Will be set below
                "link_data": {
                    "message": primary_text,
                    "link": link_url,
                    "child_attachments": child_attachments,
                    "multi_share_end_card": False,
                },
            }),
        },
    )
    if result and "id" in result:
        print(f"  [ok] Carousel Creative: {name} -> {result['id']}")
        return result["id"]
    return None


def create_ad(adset_id, creative_id, name, status="PAUSED"):
    """Create an ad."""
    result = api_post(
        f"{AD_ACCOUNT_ID}/ads",
        {
            "adset_id": adset_id,
            "creative": json.dumps({"creative_id": creative_id}),
            "name": name,
            "status": status,
        },
    )
    if result and "id" in result:
        print(f"  [ok] Ad: {name} -> {result['id']}")
        return result["id"]
    return None


def get_page_id():
    """Get the Facebook Page ID associated with the ad account."""
    result = api_get(f"{AD_ACCOUNT_ID}/promoted_objects")
    # Try getting pages the user manages
    result = api_get("me/accounts", {"fields": "id,name,category"})
    if result and "data" in result:
        for page in result["data"]:
            print(f"  Found page: {page['name']} ({page['id']})")
        if result["data"]:
            return result["data"][0]["id"]
    return None


def main():
    print("=" * 60)
    print("Ink & Meadow — Meta Ad Campaign Launcher")
    print("=" * 60)

    # ── Step 1: Get Facebook Page ID ────────────────────────
    print("\n1. Finding Facebook Page...")
    page_id = get_page_id()
    if not page_id:
        print("  ERROR: No Facebook Page found. You need a Facebook Page to run ads.")
        print("  Create one at facebook.com/pages/create or link one in Business Settings.")
        return

    # ── Step 2: Upload creatives ────────────────────────────
    print("\n2. Uploading ad images...")
    image_hashes = {}
    images_to_upload = [
        "flatlay-starter-grid.png",
        "lifestyle-coloring-evening.png",
        "gift-presentation.png",
        "ipad-coloring-cozy.png",
        "carousel-bg-cream.png",
        "carousel-bg-kitten.png",
        "carousel-bg-bunny.png",
        "carousel-bg-fox.png",
        "carousel-bg-corgi.png",
    ]
    for img in images_to_upload:
        h = upload_image(img)
        if h:
            image_hashes[img] = h
        time.sleep(1)

    if len(image_hashes) < 5:
        print("  ERROR: Not enough images uploaded. Aborting.")
        return

    # ── Step 3: Create Campaign 1 — Prospecting (CBO) ──────
    print("\n3. Creating Campaign 1: Prospecting (Sales, CBO)...")
    camp1_id = create_campaign(
        name="IM — Prospecting — Sales",
        objective="OUTCOME_SALES",
        daily_budget_cents=2500,  # $25/day
        status="PAUSED",
    )
    if not camp1_id:
        print("  Failed to create prospecting campaign. Aborting.")
        return

    # ── Step 4: Create Ad Sets ──────────────────────────────
    print("\n4. Creating Ad Sets...")

    # Shared targeting base
    base_targeting = {
        "age_min": 25,
        "age_max": 55,
        "genders": [2],  # Women
        "geo_locations": {"countries": ["US"]},
        "publisher_platforms": ["facebook", "instagram"],
        "facebook_positions": ["feed", "video_feeds", "story", "reels"],
        "instagram_positions": ["stream", "story", "reels", "explore"],
    }

    # Ad Set A: Crafty Colorists
    targeting_a = {
        **base_targeting,
        "flexible_spec": [
            {
                "interests": [
                    {"id": "6003384401438", "name": "Coloring book"},
                    {"id": "6003012949775", "name": "Arts and crafts"},
                    {"id": "6003310895498", "name": "Scrapbooking"},
                    {"id": "6003246460498", "name": "Drawing"},
                ],
            }
        ],
    }
    adset_a_id = create_adset(camp1_id, "Crafty Colorists", targeting_a)

    # Ad Set B: Mindful Souls
    targeting_b = {
        **base_targeting,
        "flexible_spec": [
            {
                "interests": [
                    {"id": "6003277229438", "name": "Meditation"},
                    {"id": "6003384204838", "name": "Mindfulness"},
                    {"id": "6003396041838", "name": "Yoga"},
                    {"id": "6003519055698", "name": "Self-help"},
                ],
            }
        ],
    }
    adset_b_id = create_adset(camp1_id, "Mindful Souls", targeting_b)

    # Ad Set C: Cottagecore Life
    targeting_c = {
        **base_targeting,
        "flexible_spec": [
            {
                "interests": [
                    {"id": "6003442858438", "name": "Gardening"},
                    {"id": "6003020834238", "name": "Interior design"},
                    {"id": "6003305411198", "name": "Nature"},
                    {"id": "6003233044838", "name": "Home and Garden"},
                ],
            }
        ],
    }
    adset_c_id = create_adset(camp1_id, "Cottagecore Life", targeting_c)

    # ── Step 5: Create Ad Creatives ─────────────────────────
    print("\n5. Creating Ad Creatives...")

    # Carousel: Starter Collection
    carousel_cards = [
        {"image_hash": image_hashes.get("carousel-bg-kitten.png"), "headline": "Kitten on Books", "description": "Adorable cottagecore design"},
        {"image_hash": image_hashes.get("carousel-bg-cream.png"), "headline": "Fawn in Meadow", "description": "Peaceful woodland scene"},
        {"image_hash": image_hashes.get("carousel-bg-bunny.png"), "headline": "Bunny & Teacup", "description": "Charming garden moment"},
        {"image_hash": image_hashes.get("carousel-bg-fox.png"), "headline": "Fox in Roses", "description": "Enchanted garden detail"},
        {"image_hash": image_hashes.get("carousel-bg-corgi.png"), "headline": "Corgi & Flowers", "description": "Irresistibly cute"},
    ]
    # Filter out any with None hashes
    carousel_cards = [c for c in carousel_cards if c["image_hash"]]

    # Ad 1: Scroll Stopper Carousel (Starter)
    creative_carousel = None
    if len(carousel_cards) >= 3:
        creative_carousel = api_post(
            f"{AD_ACCOUNT_ID}/adcreatives",
            {
                "name": "Starter — Carousel — Scroll Stopper",
                "object_story_spec": json.dumps({
                    "page_id": page_id,
                    "link_data": {
                        "message": (
                            "Your evenings deserve better than another hour of scrolling.\n\n"
                            "30 hand-drawn cottagecore coloring pages — cozy kittens, wildflower "
                            "meadows, woodland creatures — designed to help you actually unwind.\n\n"
                            "Download instantly. Print at home. Color with a cup of tea.\n\n"
                            "Just $7. Yours to keep forever."
                        ),
                        "link": f"{PAGE_URL}/checkout?plan=starter",
                        "child_attachments": [
                            {
                                "image_hash": c["image_hash"],
                                "name": c["headline"],
                                "description": c["description"],
                                "link": f"{PAGE_URL}/checkout?plan=starter",
                                "call_to_action": {"type": "SHOP_NOW"},
                            }
                            for c in carousel_cards
                        ],
                        "multi_share_end_card": False,
                    },
                }),
            },
        )
        if creative_carousel and "id" in creative_carousel:
            print(f"  [ok] Carousel Creative -> {creative_carousel['id']}")
            creative_carousel = creative_carousel["id"]
        else:
            creative_carousel = None

    # Ad 2: Single Image — Flat Lay (Starter)
    creative_flatlay = None
    if "flatlay-starter-grid.png" in image_hashes:
        creative_flatlay = api_post(
            f"{AD_ACCOUNT_ID}/adcreatives",
            {
                "name": "Starter — Single — Less Than a Latte",
                "object_story_spec": json.dumps({
                    "page_id": page_id,
                    "link_data": {
                        "image_hash": image_hashes["flatlay-starter-grid.png"],
                        "link": f"{PAGE_URL}/checkout?plan=starter",
                        "message": (
                            "For less than your morning latte, you get 30 beautiful coloring "
                            "pages you can print over and over.\n\n"
                            "Kittens on books. Foxes in rose gardens. Bunnies in teacups. "
                            "Fawns in wildflower meadows.\n\n"
                            "Cottagecore coloring pages designed for women who'd rather "
                            "create than consume.\n\n"
                            "$7 one-time. No subscription required. 30-day money-back guarantee."
                        ),
                        "name": "23¢ Per Page. Yours Forever.",
                        "description": "Print-ready PDF + iPad PNG included.",
                        "call_to_action": {"type": "SHOP_NOW"},
                    },
                }),
            },
        )
        if creative_flatlay and "id" in creative_flatlay:
            print(f"  [ok] Flat Lay Creative -> {creative_flatlay['id']}")
            creative_flatlay = creative_flatlay["id"]
        else:
            creative_flatlay = None

    # Ad 3: Single Image — Lifestyle/Calm (Starter)
    creative_lifestyle = None
    if "lifestyle-coloring-evening.png" in image_hashes:
        creative_lifestyle = api_post(
            f"{AD_ACCOUNT_ID}/adcreatives",
            {
                "name": "Starter — Single — Calm Evening",
                "object_story_spec": json.dumps({
                    "page_id": page_id,
                    "link_data": {
                        "image_hash": image_hashes["lifestyle-coloring-evening.png"],
                        "link": f"{PAGE_URL}/checkout?plan=starter",
                        "message": (
                            "Studies show 20 minutes of coloring lowers cortisol as "
                            "effectively as meditation.\n\n"
                            "We made 30 cottagecore coloring pages so your wind-down ritual "
                            "is as beautiful as it is calming.\n\n"
                            "Cozy animals. Wildflower gardens. Woodland scenes. "
                            "Print at home or color on iPad.\n\n"
                            "Try it risk-free — $7 with a 30-day money-back guarantee."
                        ),
                        "name": "Your New Evening Ritual",
                        "description": "Clinically proven stress relief — in coloring page form.",
                        "call_to_action": {"type": "SHOP_NOW"},
                    },
                }),
            },
        )
        if creative_lifestyle and "id" in creative_lifestyle:
            print(f"  [ok] Lifestyle Creative -> {creative_lifestyle['id']}")
            creative_lifestyle = creative_lifestyle["id"]
        else:
            creative_lifestyle = None

    # Ad 4: Meadow Subscription — iPad cozy
    creative_meadow = None
    if "ipad-coloring-cozy.png" in image_hashes:
        creative_meadow = api_post(
            f"{AD_ACCOUNT_ID}/adcreatives",
            {
                "name": "Meadow — Single — Tea & Pages",
                "object_story_spec": json.dumps({
                    "page_id": page_id,
                    "link_data": {
                        "image_hash": image_hashes["ipad-coloring-cozy.png"],
                        "link": f"{PAGE_URL}/checkout?plan=meadow",
                        "message": (
                            "A cup of tea. A cozy blanket. A brand-new coloring page.\n\n"
                            "That's the Meadow life.\n\n"
                            "Every month, we deliver 30 hand-curated cottagecore pages to "
                            "your portal — woodland creatures, wildflower gardens, cozy scenes "
                            "you'll actually want to color.\n\n"
                            "Print at home or color on your iPad. Your choice.\n\n"
                            "Start for $9/month. Cancel with one click, anytime."
                        ),
                        "name": "The Coloring Club for Quiet Souls",
                        "description": "30 new pages every month. Yours to keep.",
                        "call_to_action": {"type": "SUBSCRIBE"},
                    },
                }),
            },
        )
        if creative_meadow and "id" in creative_meadow:
            print(f"  [ok] Meadow Creative -> {creative_meadow['id']}")
            creative_meadow = creative_meadow["id"]
        else:
            creative_meadow = None

    # Ad 5: Gift angle
    creative_gift = None
    if "gift-presentation.png" in image_hashes:
        creative_gift = api_post(
            f"{AD_ACCOUNT_ID}/adcreatives",
            {
                "name": "Starter — Single — Gift Her Calm",
                "object_story_spec": json.dumps({
                    "page_id": page_id,
                    "link_data": {
                        "image_hash": image_hashes["gift-presentation.png"],
                        "link": f"{PAGE_URL}/checkout?plan=starter",
                        "message": (
                            "Know a woman who deserves a break from her screen?\n\n"
                            "Gift her 30 gorgeous cottagecore coloring pages — kittens, "
                            "bunnies, foxes, and wildflower meadows — for just $7.\n\n"
                            "Instant delivery. She can print at home or color on her iPad. "
                            "No wrapping required.\n\n"
                            "The most thoughtful gift under $10."
                        ),
                        "name": "The Perfect Gift for $7",
                        "description": "Instant digital delivery. Print unlimited copies.",
                        "call_to_action": {"type": "SHOP_NOW"},
                    },
                }),
            },
        )
        if creative_gift and "id" in creative_gift:
            print(f"  [ok] Gift Creative -> {creative_gift['id']}")
            creative_gift = creative_gift["id"]
        else:
            creative_gift = None

    # ── Step 6: Create Ads ──────────────────────────────────
    print("\n6. Creating Ads...")

    creatives = [
        ("Scroll Stopper Carousel", creative_carousel),
        ("Less Than a Latte", creative_flatlay),
        ("Calm Evening", creative_lifestyle),
        ("Tea & Pages (Meadow)", creative_meadow),
        ("Gift Her Calm", creative_gift),
    ]
    creatives = [(n, c) for n, c in creatives if c]

    adsets = [
        ("Crafty Colorists", adset_a_id),
        ("Mindful Souls", adset_b_id),
        ("Cottagecore Life", adset_c_id),
    ]
    adsets = [(n, a) for n, a in adsets if a]

    ad_count = 0
    for adset_name, adset_id in adsets:
        for creative_name, creative_id in creatives:
            ad_name = f"{adset_name} — {creative_name}"
            ad_id = create_ad(adset_id, creative_id, ad_name, status="PAUSED")
            if ad_id:
                ad_count += 1
            time.sleep(0.5)

    # ── Step 7: Campaign 2 — Pixel Warm-Up (Traffic) ───────
    print("\n7. Creating Campaign 2: Pixel Warm-Up (Traffic)...")
    camp2_id = create_campaign(
        name="IM — Pixel Warm-Up — Traffic",
        objective="OUTCOME_TRAFFIC",
        daily_budget_cents=1500,  # $15/day
        status="PAUSED",
    )

    if camp2_id:
        warmup_targeting = {
            **base_targeting,
            "flexible_spec": [
                {
                    "interests": [
                        {"id": "6003384401438", "name": "Coloring book"},
                        {"id": "6003012949775", "name": "Arts and crafts"},
                        {"id": "6003277229438", "name": "Meditation"},
                        {"id": "6003384204838", "name": "Mindfulness"},
                    ],
                }
            ],
        }
        warmup_adset = create_adset(
            camp2_id,
            "Broad — Coloring + Mindfulness",
            warmup_targeting,
            optimization_goal="LINK_CLICKS",
        )
        if warmup_adset and creative_flatlay:
            create_ad(warmup_adset, creative_flatlay, "Warm-Up — Flat Lay", status="PAUSED")

    # ── Summary ─────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("LAUNCH SUMMARY")
    print("=" * 60)
    print(f"  Campaigns created: 2 (Prospecting + Pixel Warm-Up)")
    print(f"  Ad Sets created: {len(adsets)} prospecting + 1 warm-up")
    print(f"  Ad Creatives: {len(creatives)}")
    print(f"  Ads created: {ad_count} + 1 warm-up")
    print(f"\n  STATUS: ALL PAUSED")
    print(f"  Go to Meta Ads Manager to review and turn them on.")
    print(f"  https://business.facebook.com/adsmanager/manage/campaigns?act={AD_ACCOUNT_ID.replace('act_', '')}")
    print(f"\n  Retargeting campaign should be created in Week 2")
    print(f"  after pixel collects enough data.")
    print("=" * 60)


if __name__ == "__main__":
    main()
