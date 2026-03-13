// Mock data for Ink & Meadow member portal

export interface ColoringPage {
  id: string;
  title: string;
  theme: "Florals" | "Animals" | "Cozy Spaces" | "Nature" | "Cottagecore" | "Seasonal";
  isPremium: boolean;
  collectionId: string;
  downloadCount: number;
}

export interface Collection {
  id: string;
  title: string;
  month: string; // e.g. "March 2026"
  subtitle: string;
  pages: ColoringPage[];
}

export type MemberPlan = "starter" | "meadow";

export interface Member {
  id: string;
  name: string;
  email: string;
  plan: MemberPlan;
  joinedDate: string;
  avatarInitials: string;
  totalDownloads: number;
  purchasedPageIds: string[];
}

// ─── March 2026: Spring Awakening ─────────────────────────────────────

const marchRegularPages: ColoringPage[] = [
  { id: "mar-01", title: "Wildflower Cottage", theme: "Florals", isPremium: false, collectionId: "march-2026", downloadCount: 342 },
  { id: "mar-02", title: "Morning Garden Gate", theme: "Cottagecore", isPremium: false, collectionId: "march-2026", downloadCount: 289 },
  { id: "mar-03", title: "Herb Window Box", theme: "Florals", isPremium: false, collectionId: "march-2026", downloadCount: 256 },
  { id: "mar-04", title: "Bunny in the Meadow", theme: "Animals", isPremium: false, collectionId: "march-2026", downloadCount: 415 },
  { id: "mar-05", title: "Spring Robin's Nest", theme: "Animals", isPremium: false, collectionId: "march-2026", downloadCount: 378 },
  { id: "mar-06", title: "Daffodil Path", theme: "Florals", isPremium: false, collectionId: "march-2026", downloadCount: 198 },
  { id: "mar-07", title: "Potting Shed", theme: "Cottagecore", isPremium: false, collectionId: "march-2026", downloadCount: 167 },
  { id: "mar-08", title: "Wisteria Archway", theme: "Florals", isPremium: false, collectionId: "march-2026", downloadCount: 301 },
  { id: "mar-09", title: "Lambs in Clover", theme: "Animals", isPremium: false, collectionId: "march-2026", downloadCount: 445 },
  { id: "mar-10", title: "Blossoming Apple Tree", theme: "Nature", isPremium: false, collectionId: "march-2026", downloadCount: 223 },
];

const marchPremiumPages: ColoringPage[] = [
  { id: "mar-p01", title: "Secret Garden Door", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 89 },
  { id: "mar-p02", title: "Lavender Fields Forever", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 112 },
  { id: "mar-p03", title: "Butterfly Conservatory", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 78 },
  { id: "mar-p04", title: "Stone Bridge Over Creek", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 65 },
  { id: "mar-p05", title: "Tulip Market Stand", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 91 },
  { id: "mar-p06", title: "Fawn in Wildflowers", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 134 },
  { id: "mar-p07", title: "Mossy Stone Wall", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 56 },
  { id: "mar-p08", title: "Garden Shed Interior", theme: "Cozy Spaces", isPremium: true, collectionId: "march-2026", downloadCount: 72 },
  { id: "mar-p09", title: "Peony Bouquet", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 98 },
  { id: "mar-p10", title: "Honeybee on Blossom", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 87 },
  { id: "mar-p11", title: "Winding Garden Path", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 43 },
  { id: "mar-p12", title: "Trellis with Climbing Roses", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 67 },
  { id: "mar-p13", title: "Hedgehog Family", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 156 },
  { id: "mar-p14", title: "Rain on the Window", theme: "Cozy Spaces", isPremium: true, collectionId: "march-2026", downloadCount: 81 },
  { id: "mar-p15", title: "Cherry Blossom Lane", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 102 },
  { id: "mar-p16", title: "Duckling Pond", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 119 },
  { id: "mar-p17", title: "Herb Garden Labels", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 55 },
  { id: "mar-p18", title: "Fairy Ring Mushrooms", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 93 },
  { id: "mar-p19", title: "Sundial in the Garden", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 41 },
  { id: "mar-p20", title: "Magnolia Branch", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 74 },
  { id: "mar-p21", title: "Songbird Chorus", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 88 },
  { id: "mar-p22", title: "Garden Tea Party", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 147 },
  { id: "mar-p23", title: "Clover Patch Detail", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 36 },
  { id: "mar-p24", title: "Watering Can Bouquet", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 105 },
  { id: "mar-p25", title: "Greenhouse Interior", theme: "Cozy Spaces", isPremium: true, collectionId: "march-2026", downloadCount: 62 },
  { id: "mar-p26", title: "Caterpillar on Leaf", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 48 },
  { id: "mar-p27", title: "Primrose Border", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 57 },
  { id: "mar-p28", title: "Cobblestone Courtyard", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 39 },
  { id: "mar-p29", title: "Morning Dew Drops", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 72 },
  { id: "mar-p30", title: "Wrens in the Ivy", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 84 },
  { id: "mar-p31", title: "Potted Succulents", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 95 },
  { id: "mar-p32", title: "Spring Cleaning Shelf", theme: "Cozy Spaces", isPremium: true, collectionId: "march-2026", downloadCount: 31 },
  { id: "mar-p33", title: "Bluebell Woodland", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 113 },
  { id: "mar-p34", title: "Nest with Eggs", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 127 },
  { id: "mar-p35", title: "Lily of the Valley", theme: "Florals", isPremium: true, collectionId: "march-2026", downloadCount: 86 },
  { id: "mar-p36", title: "Cottage Front Door", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 142 },
  { id: "mar-p37", title: "Vegetable Garden Rows", theme: "Cottagecore", isPremium: true, collectionId: "march-2026", downloadCount: 53 },
  { id: "mar-p38", title: "Dragonfly on Pond", theme: "Animals", isPremium: true, collectionId: "march-2026", downloadCount: 69 },
  { id: "mar-p39", title: "Flowering Dogwood", theme: "Nature", isPremium: true, collectionId: "march-2026", downloadCount: 44 },
  { id: "mar-p40", title: "Spring Wreath", theme: "Seasonal", isPremium: true, collectionId: "march-2026", downloadCount: 158 },
];

// ─── February 2026: Fireside Comfort ──────────────────────────────────

const febRegularPages: ColoringPage[] = [
  { id: "feb-01", title: "Cozy Reading Nook", theme: "Cozy Spaces", isPremium: false, collectionId: "feb-2026", downloadCount: 512 },
  { id: "feb-02", title: "Steaming Tea Cup", theme: "Cottagecore", isPremium: false, collectionId: "feb-2026", downloadCount: 487 },
  { id: "feb-03", title: "Knitted Blanket Pattern", theme: "Cozy Spaces", isPremium: false, collectionId: "feb-2026", downloadCount: 334 },
  { id: "feb-04", title: "Fireplace Mantel", theme: "Cozy Spaces", isPremium: false, collectionId: "feb-2026", downloadCount: 401 },
  { id: "feb-05", title: "Cat on a Cushion", theme: "Animals", isPremium: false, collectionId: "feb-2026", downloadCount: 556 },
  { id: "feb-06", title: "Candlelit Window", theme: "Cozy Spaces", isPremium: false, collectionId: "feb-2026", downloadCount: 278 },
  { id: "feb-07", title: "Stack of Old Books", theme: "Cottagecore", isPremium: false, collectionId: "feb-2026", downloadCount: 345 },
  { id: "feb-08", title: "Hot Cocoa with Marshmallows", theme: "Seasonal", isPremium: false, collectionId: "feb-2026", downloadCount: 423 },
  { id: "feb-09", title: "Valentine Rose Bouquet", theme: "Florals", isPremium: false, collectionId: "feb-2026", downloadCount: 389 },
  { id: "feb-10", title: "Wool Yarn Basket", theme: "Cottagecore", isPremium: false, collectionId: "feb-2026", downloadCount: 201 },
];

const febPremiumPages: ColoringPage[] = [
  { id: "feb-p01", title: "Library Corner", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 67 },
  { id: "feb-p02", title: "Heart-Shaped Wreath", theme: "Seasonal", isPremium: true, collectionId: "feb-2026", downloadCount: 134 },
  { id: "feb-p03", title: "Sleeping Puppy by Fire", theme: "Animals", isPremium: true, collectionId: "feb-2026", downloadCount: 189 },
  { id: "feb-p04", title: "Cinnamon Roll Platter", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 98 },
  { id: "feb-p05", title: "Patchwork Quilt Detail", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 76 },
  { id: "feb-p06", title: "Winter Roses", theme: "Florals", isPremium: true, collectionId: "feb-2026", downloadCount: 112 },
  { id: "feb-p07", title: "Armchair by the Window", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 88 },
  { id: "feb-p08", title: "Candle Collection", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 64 },
  { id: "feb-p09", title: "Owl on a Branch", theme: "Animals", isPremium: true, collectionId: "feb-2026", downloadCount: 143 },
  { id: "feb-p10", title: "Teapot Garden", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 91 },
  { id: "feb-p11", title: "Lace Doily Pattern", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 45 },
  { id: "feb-p12", title: "Pressed Flowers Journal", theme: "Florals", isPremium: true, collectionId: "feb-2026", downloadCount: 78 },
  { id: "feb-p13", title: "Cozy Cabin Exterior", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 102 },
  { id: "feb-p14", title: "Bread Baking Scene", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 87 },
  { id: "feb-p15", title: "Mittens and Scarf", theme: "Seasonal", isPremium: true, collectionId: "feb-2026", downloadCount: 56 },
  { id: "feb-p16", title: "Dried Flower Arrangement", theme: "Florals", isPremium: true, collectionId: "feb-2026", downloadCount: 69 },
  { id: "feb-p17", title: "Window Seat Pillows", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 81 },
  { id: "feb-p18", title: "Love Letters Desk", theme: "Seasonal", isPremium: true, collectionId: "feb-2026", downloadCount: 115 },
  { id: "feb-p19", title: "Hedgehog Hibernating", theme: "Animals", isPremium: true, collectionId: "feb-2026", downloadCount: 97 },
  { id: "feb-p20", title: "Spice Rack Detail", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 42 },
  { id: "feb-p21", title: "Velvet Curtains", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 38 },
  { id: "feb-p22", title: "Amaryllis in Bloom", theme: "Florals", isPremium: true, collectionId: "feb-2026", downloadCount: 83 },
  { id: "feb-p23", title: "Crackling Fire Close-up", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 71 },
  { id: "feb-p24", title: "Sleeping Fox Curled Up", theme: "Animals", isPremium: true, collectionId: "feb-2026", downloadCount: 167 },
  { id: "feb-p25", title: "Pie Cooling on Sill", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 94 },
  { id: "feb-p26", title: "Vintage Key Collection", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 58 },
  { id: "feb-p27", title: "Embroidery Hoop", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 63 },
  { id: "feb-p28", title: "Snowy Window View", theme: "Seasonal", isPremium: true, collectionId: "feb-2026", downloadCount: 89 },
  { id: "feb-p29", title: "Stacked Teacups", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 106 },
  { id: "feb-p30", title: "Sleeping Cat Mandala", theme: "Animals", isPremium: true, collectionId: "feb-2026", downloadCount: 152 },
  { id: "feb-p31", title: "Soup on the Stove", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 47 },
  { id: "feb-p32", title: "Bookshelf Treasures", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 73 },
  { id: "feb-p33", title: "Woven Basket Detail", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 35 },
  { id: "feb-p34", title: "Dried Herbs Bundles", theme: "Florals", isPremium: true, collectionId: "feb-2026", downloadCount: 61 },
  { id: "feb-p35", title: "Fairy Lights String", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 129 },
  { id: "feb-p36", title: "Robin on Fence Post", theme: "Animals", isPremium: true, collectionId: "feb-2026", downloadCount: 84 },
  { id: "feb-p37", title: "Copper Kettle", theme: "Cottagecore", isPremium: true, collectionId: "feb-2026", downloadCount: 52 },
  { id: "feb-p38", title: "Snowdrop Flowers", theme: "Florals", isPremium: true, collectionId: "feb-2026", downloadCount: 77 },
  { id: "feb-p39", title: "Cozy Socks Detail", theme: "Seasonal", isPremium: true, collectionId: "feb-2026", downloadCount: 66 },
  { id: "feb-p40", title: "Hygge Living Room", theme: "Cozy Spaces", isPremium: true, collectionId: "feb-2026", downloadCount: 141 },
];

// ─── January 2026: Winter Woodland ────────────────────────────────────

const janRegularPages: ColoringPage[] = [
  { id: "jan-01", title: "Snow-Covered Cottage", theme: "Cottagecore", isPremium: false, collectionId: "jan-2026", downloadCount: 478 },
  { id: "jan-02", title: "Woodland Fox", theme: "Animals", isPremium: false, collectionId: "jan-2026", downloadCount: 534 },
  { id: "jan-03", title: "Frost on Branches", theme: "Nature", isPremium: false, collectionId: "jan-2026", downloadCount: 312 },
  { id: "jan-04", title: "Pine Forest Path", theme: "Nature", isPremium: false, collectionId: "jan-2026", downloadCount: 289 },
  { id: "jan-05", title: "Deer in Snowfall", theme: "Animals", isPremium: false, collectionId: "jan-2026", downloadCount: 567 },
  { id: "jan-06", title: "Frozen Creek", theme: "Nature", isPremium: false, collectionId: "jan-2026", downloadCount: 234 },
  { id: "jan-07", title: "Woodpecker on Oak", theme: "Animals", isPremium: false, collectionId: "jan-2026", downloadCount: 198 },
  { id: "jan-08", title: "Evergreen Wreath", theme: "Seasonal", isPremium: false, collectionId: "jan-2026", downloadCount: 356 },
  { id: "jan-09", title: "Winter Berries Branch", theme: "Nature", isPremium: false, collectionId: "jan-2026", downloadCount: 267 },
  { id: "jan-10", title: "Log Cabin in Woods", theme: "Cottagecore", isPremium: false, collectionId: "jan-2026", downloadCount: 445 },
];

const janPremiumPages: ColoringPage[] = [
  { id: "jan-p01", title: "Snowy Owl Portrait", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 156 },
  { id: "jan-p02", title: "Ice Crystal Patterns", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 89 },
  { id: "jan-p03", title: "Bear in Hibernate", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 134 },
  { id: "jan-p04", title: "Snowflake Mandala", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 201 },
  { id: "jan-p05", title: "Wooden Bridge in Snow", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 67 },
  { id: "jan-p06", title: "Squirrel with Acorn", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 178 },
  { id: "jan-p07", title: "Frost on Window Pane", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 92 },
  { id: "jan-p08", title: "Woodcutter's Shed", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 56 },
  { id: "jan-p09", title: "Holly and Ivy Border", theme: "Florals", isPremium: true, collectionId: "jan-2026", downloadCount: 113 },
  { id: "jan-p10", title: "Mountain View Cabin", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 88 },
  { id: "jan-p11", title: "Cardinal on Branch", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 145 },
  { id: "jan-p12", title: "Birch Tree Forest", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 76 },
  { id: "jan-p13", title: "Knitted Stockings", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 83 },
  { id: "jan-p14", title: "Rabbit Tracks in Snow", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 97 },
  { id: "jan-p15", title: "Pine Cone Collection", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 64 },
  { id: "jan-p16", title: "Cozy Cottage Kitchen", theme: "Cozy Spaces", isPremium: true, collectionId: "jan-2026", downloadCount: 121 },
  { id: "jan-p17", title: "Icicle Formations", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 45 },
  { id: "jan-p18", title: "Moose in Meadow", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 109 },
  { id: "jan-p19", title: "Woodpile Stack", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 38 },
  { id: "jan-p20", title: "Starry Winter Night", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 167 },
  { id: "jan-p21", title: "Chickadee Flock", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 82 },
  { id: "jan-p22", title: "Frozen Waterfall", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 94 },
  { id: "jan-p23", title: "Mittens Drying by Fire", theme: "Cozy Spaces", isPremium: true, collectionId: "jan-2026", downloadCount: 71 },
  { id: "jan-p24", title: "Winter Mushrooms", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 58 },
  { id: "jan-p25", title: "Elk Portrait", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 103 },
  { id: "jan-p26", title: "Snow-Laden Fence", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 42 },
  { id: "jan-p27", title: "Evergreen Garland", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 87 },
  { id: "jan-p28", title: "Tracks in Fresh Snow", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 53 },
  { id: "jan-p29", title: "Warm Scarf Pattern", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 66 },
  { id: "jan-p30", title: "Wolf Under Moon", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 198 },
  { id: "jan-p31", title: "Snowy Mailbox", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 74 },
  { id: "jan-p32", title: "Hot Cider Mug", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 91 },
  { id: "jan-p33", title: "Bare Oak Tree", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 49 },
  { id: "jan-p34", title: "Pheasant in Snow", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 62 },
  { id: "jan-p35", title: "Smoke from Chimney", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 118 },
  { id: "jan-p36", title: "Frozen Garden Gate", theme: "Cottagecore", isPremium: true, collectionId: "jan-2026", downloadCount: 55 },
  { id: "jan-p37", title: "Snowshoe Hare", theme: "Animals", isPremium: true, collectionId: "jan-2026", downloadCount: 131 },
  { id: "jan-p38", title: "Winter Solstice Wreath", theme: "Seasonal", isPremium: true, collectionId: "jan-2026", downloadCount: 143 },
  { id: "jan-p39", title: "Frosty Morning Meadow", theme: "Nature", isPremium: true, collectionId: "jan-2026", downloadCount: 78 },
  { id: "jan-p40", title: "Candlelit Cottage Window", theme: "Cozy Spaces", isPremium: true, collectionId: "jan-2026", downloadCount: 159 },
];

// ─── Collections ──────────────────────────────────────────────────────

export const collections: Collection[] = [
  {
    id: "march-2026",
    title: "Spring Awakening",
    month: "March 2026",
    subtitle: "Celebrate the first blooms, garden gates, and gentle creatures of early spring",
    pages: [...marchRegularPages, ...marchPremiumPages],
  },
  {
    id: "feb-2026",
    title: "Fireside Comfort",
    month: "February 2026",
    subtitle: "Warm your heart with cozy interiors, fireside scenes, and winter warmth",
    pages: [...febRegularPages, ...febPremiumPages],
  },
  {
    id: "jan-2026",
    title: "Winter Woodland",
    month: "January 2026",
    subtitle: "Explore snow-covered forests, woodland creatures, and frosty landscapes",
    pages: [...janRegularPages, ...janPremiumPages],
  },
];

// ─── Mock Member ──────────────────────────────────────────────────────

export const mockMember: Member = {
  id: "mem-001",
  name: "Eleanor Primrose",
  email: "eleanor@example.com",
  plan: "meadow",
  joinedDate: "2025-11-15",
  avatarInitials: "EP",
  totalDownloads: 47,
  purchasedPageIds: [
    "jan-01", "jan-02", "jan-03", "jan-04", "jan-05",
    "jan-06", "jan-07", "jan-08", "jan-09", "jan-10",
    "feb-01", "feb-02", "feb-03", "feb-04", "feb-05",
    "feb-06", "feb-07", "feb-08", "feb-09", "feb-10",
    "mar-01", "mar-02", "mar-03", "mar-04", "mar-05",
    "mar-06", "mar-07",
  ],
};

// ─── Helper functions ─────────────────────────────────────────────────

export function getPagesForMember(collection: Collection, member: Member): ColoringPage[] {
  switch (member.plan) {
    case "meadow":
      return collection.pages; // All pages
    case "starter":
      return collection.pages.filter((p) => member.purchasedPageIds.includes(p.id));
    default:
      return [];
  }
}

export function getPremiumPagesCount(collection: Collection): number {
  return collection.pages.filter((p) => p.isPremium).length;
}

export function getThemeColor(theme: ColoringPage["theme"]): string {
  const colors: Record<string, string> = {
    Florals: "bg-rose-100 text-rose-700",
    Animals: "bg-amber-100 text-amber-700",
    "Cozy Spaces": "bg-orange-100 text-orange-700",
    Nature: "bg-emerald-100 text-emerald-700",
    Cottagecore: "bg-stone-200 text-stone-700",
    Seasonal: "bg-sky-100 text-sky-700",
  };
  return colors[theme] || "bg-stone-100 text-stone-600";
}
