# Midjourney Coloring Page Prompts

## How to use
1. Open Midjourney (Discord or web UI)
2. Copy a prompt below and paste it
3. Pick the best of the 4 variations
4. Upscale it (U1-U4)
5. Download the full-res image
6. Run through the post-processing pipeline:
   ```
   source .venv/bin/activate
   python scripts/process-coloring-page.py downloaded-image.png
   ```
7. Upload the processed PNG to Supabase

## Base prompt formula

Every prompt follows this structure:
```
[subject description], black and white line art coloring page, clean outlines,
no shading, no gray tones, no color, white background, detailed illustration
suitable for adult coloring book, consistent line weight, all areas enclosed
for coloring, cottagecore aesthetic --v 6 --style raw --s 50 --no color,
shading, gradient, gray, shadow, watermark, text
```

**Key parameters:**
- `--v 6` — Midjourney v6 (best for line art)
- `--style raw` — less Midjourney "style," more faithful to prompt
- `--s 50` — lower stylization for cleaner lines
- `--no` — negative prompts to prevent color/shading bleed

---

## April Collection: Secret Garden (30 prompts)

### Garden Paths & Structures
1. `A winding stone path through a secret garden with an ornate iron gate covered in climbing roses, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring, cottagecore aesthetic --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

2. `A crumbling stone archway overgrown with wisteria and ivy leading into a hidden garden, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

3. `An old wooden garden door set into a stone wall with roses growing over the top and a keyhole, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

4. `A secret garden greenhouse with glass panels, hanging ferns, potted orchids, and a watering can, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

5. `A garden pergola covered in climbing jasmine with a wooden bench underneath, surrounded by flower beds, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

### Flowers & Botanicals
6. `A detailed close-up of a peony bush in full bloom with buds and leaves, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring, botanical illustration style --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

7. `A circular wreath made of sweet peas, honeysuckle, and garden roses with ribbons, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

8. `A vintage watering can overflowing with wildflowers including daisies, cornflowers, and poppies, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

9. `A garden window sill with potted herbs — rosemary, lavender, basil — and a butterfly visiting, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

10. `A moss-covered stone fountain surrounded by lily pads, water lilies, and dragonflies, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

### Woodland Creatures
11. `A fox sleeping curled up under a rose bush in a secret garden, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring, cute whimsical style --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

12. `Two rabbits sitting among garden clovers and dandelions near a garden wall, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

13. `A hedgehog family walking through a garden path lined with mushrooms and ferns, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

14. `A bluebird perched on a garden spade handle with seedlings sprouting nearby, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

15. `A squirrel sitting on a moss-covered garden statue holding an acorn, surrounded by flowers, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

### Cozy Scenes
16. `A garden tea table set for two with teacups, a teapot, scones, and a vase of fresh-cut flowers, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

17. `A reading nook in a garden with a hammock strung between two trees, books, and a blanket, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

18. `A cozy garden potting bench with terra cotta pots, seed packets, gardening gloves, and trailing ivy, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

19. `A garden bicycle with a flower-filled basket parked against a picket fence with climbing roses, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

20. `A cozy garden shed with an open door showing tools inside, flower boxes on the windows, and a cat napping on the doorstep, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

### Whimsical & Fairy-tale
21. `A fairy door at the base of an old oak tree surrounded by toadstools, ferns, and tiny flowers, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

22. `A secret garden sundial covered in morning glory vines with butterflies, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

23. `A garden mandala made of concentric circles of different flowers — roses, daisies, tulips, lavender, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

24. `A treehouse in a flowering cherry tree with a rope ladder and bunting flags, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

25. `A garden bridge over a small stream with koi fish, water lilies, and weeping willows, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

### Seasonal Botanicals
26. `A detailed botanical illustration of a climbing rose branch with thorns, buds, open blooms, and leaves, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, scientific botanical illustration style, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

27. `A collection of spring vegetables in a garden basket — radishes, peas in pods, carrots with tops, lettuce, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

28. `A beehive in a garden with bees visiting nearby lavender and clover flowers, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

29. `A decorative garden urn overflowing with trailing ivy, geraniums, and petunias on a stone pedestal, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

30. `A garden gate at sunset with climbing sweet peas, a stone path leading away, and birds flying overhead, black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text`

---

## Tips for best results

1. **Generate 4, pick 1** — Always look at all 4 variations and upscale only the best
2. **Re-roll if needed** — If none of the 4 are good, hit re-roll rather than settling
3. **Check for issues before processing:**
   - Lines that don't connect (areas won't be colorable)
   - Weird anatomy on animals
   - Text or watermark artifacts
   - Too much detail in small areas (won't print well)
   - Areas that are too large with nothing in them (boring to color)
4. **Vary detail level** — Mix some detailed pages (experienced colorists) with simpler ones (relaxing)
5. **The `--no` parameter is critical** — Without it, Midjourney often adds shading or color tints

## Quick prompt template (copy and customize)

```
[YOUR SUBJECT HERE], black and white line art coloring page, clean outlines, no shading, no gray tones, no color, white background, detailed illustration suitable for adult coloring book, consistent line weight, all areas enclosed for coloring, cottagecore aesthetic --v 6 --style raw --s 50 --no color, shading, gradient, gray, shadow, watermark, text
```
