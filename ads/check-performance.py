#!/usr/bin/env python3
"""Check Ink & Meadow ad campaign performance."""

import json
import requests

TOKEN = "EAAd9Mk6N8M8BQ6idrh9C88yguLrbNCmkSZC3dKygyPoxABqhaMzlmZBZCC6b0eznnNuCZB9eDZB3Wvm988xFNhMrGpGkuE2FWpErVWOGGjmeqIi5hpBmHhruglvOJ54BZCMqiHw60oaJFRh8sj32dclGA7bZAUhjAYS821JSqedx3k6EwCJB2ZBY57xZB2BxOhhM6ZCEsleJZAHrPoNdHhZC"
AD_ACCOUNT_ID = "act_364969284829337"
CAMPAIGN_ID = "120241031628460760"
BASE = "https://graph.facebook.com/v21.0"


def api_get(endpoint, params=None):
    if params is None:
        params = {}
    params["access_token"] = TOKEN
    return requests.get(f"{BASE}/{endpoint}", params=params).json()


def main():
    # Campaign level
    print("=" * 70)
    print("INK & MEADOW — CAMPAIGN PERFORMANCE")
    print("=" * 70)

    camp = api_get(CAMPAIGN_ID, {
        "fields": "name,status,daily_budget,insights{spend,impressions,clicks,ctr,cpc,cpm,actions,cost_per_action_type}",
    })
    print(f"\nCampaign: {camp.get('name')} | Status: {camp.get('status')} | Budget: ${int(camp.get('daily_budget', 0)) / 100}/day")

    if "insights" in camp and "data" in camp["insights"]:
        ins = camp["insights"]["data"][0]
        spend = ins.get("spend", "0")
        impressions = ins.get("impressions", "0")
        clicks = ins.get("clicks", "0")
        ctr = ins.get("ctr", "0")
        cpc = ins.get("cpc", "0")
        cpm = ins.get("cpm", "0")
        print(f"  Spend: ${spend} | Impressions: {impressions} | Clicks: {clicks}")
        print(f"  CTR: {ctr}% | CPC: ${cpc} | CPM: ${cpm}")

        actions = ins.get("actions", [])
        purchases = [a for a in actions if a.get("action_type") == "purchase"]
        if purchases:
            print(f"  Purchases: {purchases[0].get('value', 0)}")

        cost_per = ins.get("cost_per_action_type", [])
        purchase_cost = [a for a in cost_per if a.get("action_type") == "purchase"]
        if purchase_cost:
            print(f"  Cost per Purchase: ${purchase_cost[0].get('value', '?')}")
    else:
        print("  No data yet (campaign may still be in learning phase)")

    # Ad Set level
    print(f"\n{'─' * 70}")
    print("AD SET BREAKDOWN")
    print(f"{'─' * 70}")

    adsets = api_get(f"{CAMPAIGN_ID}/adsets", {
        "fields": "name,status,insights{spend,impressions,clicks,ctr,cpc,actions,cost_per_action_type}",
    })

    for adset in adsets.get("data", []):
        name = adset.get("name", "?")
        status = adset.get("status", "?")
        print(f"\n  {name} [{status}]")

        if "insights" in adset and "data" in adset["insights"]:
            ins = adset["insights"]["data"][0]
            spend = ins.get("spend", "0")
            clicks = ins.get("clicks", "0")
            ctr = ins.get("ctr", "0")
            cpc = ins.get("cpc", "0")
            print(f"    Spend: ${spend} | Clicks: {clicks} | CTR: {ctr}% | CPC: ${cpc}")

            actions = ins.get("actions", [])
            purchases = [a for a in actions if a.get("action_type") == "purchase"]
            if purchases:
                print(f"    Purchases: {purchases[0].get('value', 0)}")
        else:
            print("    No data yet")

    # Ad level
    print(f"\n{'─' * 70}")
    print("AD BREAKDOWN")
    print(f"{'─' * 70}")

    ads = api_get(f"{AD_ACCOUNT_ID}/ads", {
        "fields": "name,status,insights{spend,impressions,clicks,ctr,cpc,actions}",
        "filtering": json.dumps([{"field": "campaign.id", "operator": "EQUAL", "value": CAMPAIGN_ID}]),
    })

    for ad in ads.get("data", []):
        name = ad.get("name", "?")
        status = ad.get("status", "?")

        if "insights" in ad and "data" in ad["insights"]:
            ins = ad["insights"]["data"][0]
            spend = ins.get("spend", "0")
            clicks = ins.get("clicks", "0")
            ctr = ins.get("ctr", "0")
            impressions = ins.get("impressions", "0")

            actions = ins.get("actions", [])
            purchases = [a for a in actions if a.get("action_type") == "purchase"]
            purchase_count = purchases[0].get("value", "0") if purchases else "0"

            print(f"  {name}")
            print(f"    ${spend} spent | {impressions} imp | {clicks} clicks | {ctr}% CTR | {purchase_count} purchases")
        else:
            if status == "ACTIVE":
                print(f"  {name} — no data yet")

    print(f"\n{'=' * 70}")


if __name__ == "__main__":
    main()
