#!/usr/bin/env python3
"""
Set up Meta retargeting campaign for Ink & Meadow.
Creates a Custom Audience of LP visitors who didn't purchase,
then creates a retargeting ad set with existing winning creatives.
"""

import json
import requests
import sys

TOKEN = "EAAd9Mk6N8M8BQ6idrh9C88yguLrbNCmkSZC3dKygyPoxABqhaMzlmZBZCC6b0eznnNuCZB9eDZB3Wvm988xFNhMrGpGkuE2FWpErVWOGGjmeqIi5hpBmHhruglvOJ54BZCMqiHw60oaJFRh8sj32dclGA7bZAUhjAYS821JSqedx3k6EwCJB2ZBY57xZB2BxOhhM6ZCEsleJZAHrPoNdHhZC"
AD_ACCOUNT_ID = "act_364969284829337"
PIXEL_ID = "392123258845113"
CAMPAIGN_ID = "120241031628460760"
PAGE_ID = "1048584835005915"

BASE = "https://graph.facebook.com/v21.0"

# Existing creative IDs (reuse best performers)
CREATIVES = [
    "4252128855046423",  # Carousel — Scroll Stopper
    "907847965362669",   # Flat Lay — Less Than a Latte
    "1157639519696539",  # Lifestyle — Calm Evening
]


def api_post(url, data):
    data["access_token"] = TOKEN
    r = requests.post(url, data=data)
    result = r.json()
    if "error" in result:
        print(f"ERROR: {json.dumps(result['error'], indent=2)}")
        sys.exit(1)
    return result


def api_get(url, params=None):
    params = params or {}
    params["access_token"] = TOKEN
    r = requests.get(url, params=params)
    return r.json()


def main():
    # Step 1: Create Custom Audience — website visitors (last 30 days) who visited /lp
    print("Creating Custom Audience: LP Visitors (no purchase)...")
    audience_data = {
        "name": "LP Visitors - No Purchase (30d)",
        "description": "People who visited /lp but did not complete a purchase in the last 30 days",
        "rule": json.dumps({
            "inclusions": {
                "operator": "or",
                "rules": [
                    {
                        "event_sources": [{"id": PIXEL_ID, "type": "pixel"}],
                        "retention_seconds": 2592000,  # 30 days
                        "filter": {
                            "operator": "and",
                            "filters": [
                                {
                                    "field": "url",
                                    "operator": "i_contains",
                                    "value": "/lp"
                                }
                            ]
                        }
                    }
                ]
            },
            "exclusions": {
                "operator": "or",
                "rules": [
                    {
                        "event_sources": [{"id": PIXEL_ID, "type": "pixel"}],
                        "retention_seconds": 2592000,
                        "filter": {
                            "operator": "and",
                            "filters": [
                                {
                                    "field": "event",
                                    "operator": "eq",
                                    "value": "Purchase"
                                }
                            ]
                        }
                    }
                ]
            }
        }),
    }
    audience_result = api_post(f"{BASE}/{AD_ACCOUNT_ID}/customaudiences", audience_data)
    audience_id = audience_result["id"]
    print(f"  Custom Audience created: {audience_id}")

    # Step 2: Create retargeting ad set
    print("\nCreating retargeting ad set...")
    adset_data = {
        "campaign_id": CAMPAIGN_ID,
        "name": "Retargeting — LP Visitors",
        "status": "PAUSED",  # Start paused, enable manually after review
        "billing_event": "IMPRESSIONS",
        "optimization_goal": "OFFSITE_CONVERSIONS",
        "promoted_object": json.dumps({"pixel_id": PIXEL_ID, "custom_event_type": "PURCHASE"}),
        "daily_budget": "500",  # $5/day
        "targeting": json.dumps({
            "custom_audiences": [{"id": audience_id}],
            "geo_locations": {"countries": ["US"]},
            "age_min": 25,
            "age_max": 55,
            "genders": [2],  # Women
            "publisher_platforms": ["facebook", "instagram"],
            "facebook_positions": ["feed"],
            "instagram_positions": ["stream", "explore", "reels"],
        }),
        "targeting_automation": json.dumps({"advantage_audience": 0}),
    }
    adset_result = api_post(f"{BASE}/{AD_ACCOUNT_ID}/adsets", adset_data)
    adset_id = adset_result["id"]
    print(f"  Ad set created: {adset_id}")

    # Step 3: Create ads using existing creatives
    print("\nCreating retargeting ads...")
    creative_names = ["Retarget — Scroll Stopper", "Retarget — Less Than a Latte", "Retarget — Calm Evening"]
    ad_ids = []
    for creative_id, name in zip(CREATIVES, creative_names):
        ad_data = {
            "adset_id": adset_id,
            "name": name,
            "status": "PAUSED",
            "creative": json.dumps({"creative_id": creative_id}),
        }
        ad_result = api_post(f"{BASE}/{AD_ACCOUNT_ID}/ads", ad_data)
        ad_ids.append(ad_result["id"])
        print(f"  Ad created: {name} ({ad_result['id']})")

    print(f"\n✅ Retargeting setup complete!")
    print(f"   Audience: {audience_id}")
    print(f"   Ad Set:   {adset_id} (PAUSED — enable when ready)")
    print(f"   Ads:      {', '.join(ad_ids)}")
    print(f"\n   Budget: $5/day")
    print(f"   Target: LP visitors who didn't purchase (30-day window)")


if __name__ == "__main__":
    main()
