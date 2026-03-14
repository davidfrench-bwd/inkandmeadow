#!/usr/bin/env python3
"""Fix ad sets with correct interest IDs and create ads."""

import json
import time
import requests

ACCESS_TOKEN = "EAAd9Mk6N8M8BQ6idrh9C88yguLrbNCmkSZC3dKygyPoxABqhaMzlmZBZCC6b0eznnNuCZB9eDZB3Wvm988xFNhMrGpGkuE2FWpErVWOGGjmeqIi5hpBmHhruglvOJ54BZCMqiHw60oaJFRh8sj32dclGA7bZAUhjAYS821JSqedx3k6EwCJB2ZBY57xZB2BxOhhM6ZCEsleJZAHrPoNdHhZC"
AD_ACCOUNT_ID = "act_364969284829337"
PIXEL_ID = "392123258845113"
API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{API_VERSION}"

# Campaign IDs from previous run
CAMP_PROSPECTING = "120241031628460760"
CAMP_WARMUP = "120241031635700760"

# Creative IDs from previous run
CREATIVES = {
    "carousel": "931162635972686",
    "flatlay": "1419589679277119",
    "lifestyle": "907079388780353",
    "meadow": "1436221417944464",
    "gift": "908302558764680",
}


def api_post(endpoint, data):
    data["access_token"] = ACCESS_TOKEN
    resp = requests.post(f"{BASE_URL}/{endpoint}", data=data)
    result = resp.json()
    if "error" in result:
        print(f"  ERROR: {json.dumps(result['error'], indent=2)}")
        return None
    return result


def create_adset(campaign_id, name, interests, optimization_goal="OFFSITE_CONVERSIONS"):
    targeting = {
        "age_min": 25,
        "age_max": 55,
        "genders": [2],
        "geo_locations": {"countries": ["US"]},
        "publisher_platforms": ["facebook", "instagram"],
        "facebook_positions": ["feed"],
        "instagram_positions": ["stream", "explore", "reels"],
        "flexible_spec": [{"interests": interests}],
        "targeting_automation": {"advantage_audience": 0},
    }

    data = {
        "campaign_id": campaign_id,
        "name": name,
        "optimization_goal": optimization_goal,
        "billing_event": "IMPRESSIONS",
        "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
        "status": "PAUSED",
        "targeting": json.dumps(targeting),
    }

    # For sales campaigns, need promoted_object with pixel
    if optimization_goal == "OFFSITE_CONVERSIONS":
        data["promoted_object"] = json.dumps({
            "pixel_id": PIXEL_ID,
            "custom_event_type": "PURCHASE",
        })

    result = api_post(f"{AD_ACCOUNT_ID}/adsets", data)
    if result and "id" in result:
        print(f"  [ok] Ad Set: {name} -> {result['id']}")
        return result["id"]
    return None


def create_ad(adset_id, creative_id, name):
    result = api_post(
        f"{AD_ACCOUNT_ID}/ads",
        {
            "adset_id": adset_id,
            "creative": json.dumps({"creative_id": creative_id}),
            "name": name,
            "status": "PAUSED",
        },
    )
    if result and "id" in result:
        print(f"  [ok] Ad: {name} -> {result['id']}")
        return result["id"]
    return None


def main():
    print("Fixing Ad Sets with correct interest IDs...\n")

    # Verified interest IDs from Meta search API
    # Ad Set A: Crafty Colorists
    print("Creating Ad Set A: Crafty Colorists...")
    adset_a = create_adset(CAMP_PROSPECTING, "Crafty Colorists", [
        {"id": "6003137191550", "name": "Coloring book"},
        {"id": "6003375043725", "name": "Scrapbooking"},
        {"id": "6003780025252", "name": "Drawing"},
        {"id": "6003102688634", "name": "Knitting"},
    ])

    # Ad Set B: Mindful Souls
    print("\nCreating Ad Set B: Mindful Souls...")
    adset_b = create_adset(CAMP_PROSPECTING, "Mindful Souls", [
        {"id": "6003656756487", "name": "Meditations"},
        {"id": "6003306084421", "name": "Yoga"},
        {"id": "6003244295567", "name": "Self care"},
        {"id": "6003400407018", "name": "Self-help"},
    ])

    # Ad Set C: Cottagecore Life
    print("\nCreating Ad Set C: Cottagecore Life...")
    adset_c = create_adset(CAMP_PROSPECTING, "Cottagecore Life", [
        {"id": "6003053056644", "name": "Gardening"},
        {"id": "6002920953955", "name": "Interior design"},
        {"id": "6003075578715", "name": "Home Decore"},
        {"id": "6003359996821", "name": "Nature (science)"},
    ])

    # Warm-up ad set
    print("\nCreating Warm-Up Ad Set...")
    warmup = create_adset(CAMP_WARMUP, "Broad — Coloring + Self Care", [
        {"id": "6003137191550", "name": "Coloring book"},
        {"id": "6003244295567", "name": "Self care"},
        {"id": "6003780025252", "name": "Drawing"},
    ], optimization_goal="LINK_CLICKS")

    # Create ads for each ad set
    print("\n\nCreating Ads...\n")

    adsets = [
        ("Crafty Colorists", adset_a),
        ("Mindful Souls", adset_b),
        ("Cottagecore Life", adset_c),
    ]

    # Each prospecting ad set gets: carousel, flatlay, lifestyle (starter ads)
    # Plus meadow and gift for variety
    starter_creatives = [
        ("Scroll Stopper Carousel", CREATIVES["carousel"]),
        ("Less Than a Latte", CREATIVES["flatlay"]),
        ("Calm Evening", CREATIVES["lifestyle"]),
        ("Tea & Pages Meadow", CREATIVES["meadow"]),
        ("Gift Her Calm", CREATIVES["gift"]),
    ]

    ad_count = 0
    for adset_name, adset_id in adsets:
        if not adset_id:
            continue
        for creative_name, creative_id in starter_creatives:
            name = f"{adset_name} — {creative_name}"
            if create_ad(adset_id, creative_id, name):
                ad_count += 1
            time.sleep(0.5)

    # Warm-up gets flatlay only
    if warmup:
        create_ad(warmup, CREATIVES["flatlay"], "Warm-Up — Less Than a Latte")
        ad_count += 1

    print(f"\n{'='*60}")
    print(f"DONE: {ad_count} ads created across all ad sets")
    print(f"All PAUSED — review in Ads Manager then turn on:")
    print(f"https://business.facebook.com/adsmanager/manage/campaigns?act=364969284829337")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
