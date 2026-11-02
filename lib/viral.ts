export type ViralPrompt = {
  slug: string;
  title: string;
  category: string;
  catSlug: string;
  aspect: string;
  duration: string;
  tags: string[];
  why: string;
  prompt: string;
  date: string;
};

export const cats = [
  {
    name: "Product Ads", slug: "product-ads",
    intro: "Product video prompts for ads, shop listings and social media. These focus on one hero object, a clean surface and a slow, premium camera move.",
    tips: ["Keep one hero product and a simple background so the model does not invent extra objects.", "Name the surface (glossy black, mirrored acrylic, wet slate), because reflections sell a premium look.", "Use a slow orbit or push-in. Fast moves can warp edges and logos.", "Leave out brand names and written labels, then add text in your video editor."],
  },
  {
    name: "Food and ASMR", slug: "food-and-asmr",
    intro: "Satisfying food and ASMR-style prompts built around texture, steam, slow motion and macro framing.",
    tips: ["Use texture words such as glossy, molten, crisp and steaming.", "Macro framing plus slow motion makes food feel satisfying.", "If your platform generates audio, name the sound you want, such as sizzle or crunch.", "Keep hands out of frame unless needed, since hands are harder for models."],
  },
  {
    name: "Nature and Animals", slug: "nature-and-animals",
    intro: "Wildlife and nature prompts with a documentary feel: one animal, one clear behavior and natural light.",
    tips: ["Name the species and one clear behavior.", "A long lens and shallow depth of field add wildlife realism.", "Natural light terms such as golden hour, overcast and mist add believability.", "Use one continuous shot rather than fast cuts."],
  },
  {
    name: "Fantasy and Sci-Fi", slug: "fantasy-and-sci-fi",
    intro: "Epic worlds, creatures and futuristic scenes. Large-scale prompts that work best with slow, sweeping camera moves.",
    tips: ["Anchor the fantasy with scale cues like buildings, trees or a tiny human figure.", "Pick two main colors to keep the palette consistent.", "Describe atmosphere: fog, dust, glow, rain.", "Use slow camera moves so large objects stay stable."],
  },
  {
    name: "Cinematic and Action", slug: "cinematic-and-action",
    intro: "Movie-style action and drama prompts with clear camera language, weather and strong motion verbs.",
    tips: ["Name the lens feel and the camera move once, clearly.", "Keep the action simple: one vehicle or one character.", "Use motion verbs like skid, sweep, drift and leap.", "Add weather or time of day to set the mood."],
  },
  {
    name: "Lifestyle and Social", slug: "lifestyle-and-social",
    intro: "Cozy, relatable scenes made for Reels, Shorts and TikTok: vertical framing, warm light and simple settings.",
    tips: ["Vertical 9:16 suits social platforms.", "Avoid tight close-ups of faces and hands for the most stable results.", "Use time-lapse wording for transformations.", "Keep the setting specific and cozy: a window, a desk, a train seat."],
  },
] as const;

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// [category index, title, aspect, duration, tags, why it works, prompt]
type Raw = [number, string, string, string, string, string, string];
const raw: Raw[] = [
  // Product Ads
  [0, "Floating Sneaker Hero Shot", "9:16", "5 seconds", "sneakers, product ad, studio, rotation", "A weightless product spin on a glossy surface is a staple of premium ads and is easy for models to render cleanly.", "A pair of plain white running sneakers floating above a glossy black surface, slowly rotating as a soft light sweeps across the fabric texture, tiny dust particles drifting in the air. Smooth dolly pull-back from macro to wide, clean studio lighting with a subtle rim light, premium commercial look, ultra-sharp detail."],
  [0, "Perfume Bottle Water Splash", "9:16", "5 seconds", "perfume, water, luxury, slow motion", "Suspended droplets around a mirrored base create instant luxury and give the camera something beautiful to orbit.", "A clear glass perfume bottle on a mirrored surface as a ring of water splashes up in slow motion around its base, droplets suspended in the air catching soft pink light. Slow orbit around the bottle, shallow depth of field, elegant studio lighting, luxury advertisement style, no text or logos."],
  [0, "Skincare Droplet Macro", "9:16", "5 seconds", "skincare, macro, serum, beauty", "Macro liquid motion feels calming and clean, which fits beauty and wellness content.", "Extreme macro shot of a single golden serum droplet falling from a glass dropper into a pool of cream, ripples spreading outward in slow motion. Soft diffused white light, creamy pastel background, smooth push-in, clean and calming skincare commercial look."],
  [0, "Coffee Steam Close-Up", "9:16", "5 seconds", "coffee, steam, cozy, close-up", "Rising steam and warm window light add motion to a still subject with almost no risk of distortion.", "Close-up of a ceramic cup of black coffee on a dark wooden table, steam curling upward in slow motion as warm morning light streams through a window. Gentle push-in, shallow depth of field, cozy and inviting mood, realistic textures."],
  [0, "Smartwatch Orbit Reveal", "16:9", "5 seconds", "tech, smartwatch, orbit, rim light", "A 360-degree orbit with rim lighting is the classic tech reveal and shows off form without needing a busy scene.", "A sleek black smartwatch with a blank glowing screen resting on a slab of dark stone, camera in a smooth 360-degree orbit with cool blue rim light tracing its edges, faint mist at the base. Modern tech commercial, high contrast, razor-sharp detail."],
  [0, "Energy Can Ice Burst", "9:16", "5 seconds", "drink, ice, burst, high energy", "An explosive burst toward the camera gives a short clip instant energy and a strong thumbnail frame.", "A silver unbranded drink can bursting through a block of ice in slow motion, ice shards and cold mist flying toward the camera, bright cyan backlight. Low angle, fast-feeling but smooth motion, high-energy commercial look, crisp detail."],
  [0, "Jewelry Sparkle Rotation", "1:1", "5 seconds", "jewelry, ring, sparkle, macro", "Light glinting off facets creates natural motion on a nearly static subject, ideal for square ad formats.", "A diamond ring on a black velvet cushion slowly rotating, light catching the facets and throwing tiny sparkles across the frame. Macro lens, shallow depth of field, soft bokeh highlights, elegant and luxurious, slow push-in."],
  // Food and ASMR
  [1, "Honey Drizzle on Pancakes", "9:16", "5 seconds", "honey, pancakes, macro, food", "Slow, thick liquid motion is one of the most satisfying things to watch, and it loops well.", "Golden honey slowly drizzling over a tall stack of fluffy pancakes topped with berries, thick strands stretching and pooling down the sides. Macro close-up, warm kitchen light, slow motion, glossy highlights, mouthwatering food commercial style."],
  [1, "Glass Fruit Slice (ASMR)", "9:16", "5 seconds", "asmr, glass fruit, slicing, satisfying", "The surreal idea of cutting glass fruit pairs a familiar ASMR action with an unexpected visual.", "A sharp knife slowly slicing through a strawberry made of translucent glass on a wooden board, clean cross-section revealing glowing red layers, tiny glass shards sparkling. Macro close-up, soft studio light, satisfying slow motion, crisp sound of cutting."],
  [1, "Molten Chocolate Pour", "9:16", "5 seconds", "chocolate, dessert, pour, slow motion", "A thick glossy pour reads as indulgent instantly and gives the camera a clear focal point.", "Warm molten chocolate pouring over a round dessert in slow motion, a thick glossy ribbon flowing down the sides and pooling on the plate, cocoa dust floating in the air. Close-up, warm dark background, shallow depth of field, indulgent mood."],
  [1, "Street Food Wok Fire", "9:16", "5 seconds", "street food, wok, fire, night", "Flames, sparks and steam add dramatic movement and a strong sense of place.", "A chef tossing noodles and vegetables in a roaring wok at a night street stall, flames bursting upward, sparks and steam rising. Handheld close-up with slight shake, warm orange firelight, realistic documentary look, sizzling sound."],
  [1, "Ice Cream Melt Time-Lapse", "9:16", "5 seconds", "ice cream, melting, summer, time-lapse", "Melting is a simple visual story with a built-in beginning and end, perfect for a short loop.", "A scoop of vanilla ice cream in a waffle cone melting in warm sunlight, creamy drips sliding down the cone, time-lapse feel with soft summer light, pastel blue sky background. Close-up, bright and playful, smooth natural motion."],
  [1, "Rainy Night Ramen", "9:16", "8 seconds", "ramen, rain, neon, cozy", "Warm food against a cold, rainy window creates a strong comfort contrast.", "A steaming bowl of ramen with a soft egg and green onions on a counter by a rain-streaked window at night, neon reflections shimmering on the glass. Slow push-in, warm light on the bowl, cozy cinematic mood, rising steam."],
  [1, "Cheese Pull Slow Motion", "9:16", "5 seconds", "pizza, cheese pull, slow motion, appetizing", "The stretching cheese pull is a proven appetite trigger and an easy motion for models to follow.", "A slice of hot pizza lifted away from the pie, long strands of melted mozzarella stretching in slow motion, steam rising. Side-angle close-up, warm rustic lighting, shallow depth of field, rich and appetizing."],
  // Nature and Animals
  [2, "Fox Leaping in Fresh Snow", "16:9", "8 seconds", "fox, snow, wildlife, slow motion", "A playful animal moment with a clear start, peak and payoff keeps viewers watching to the end.", "A red fox leaping headfirst into deep fresh snow in a quiet pine forest, powder exploding around it before it pops up with snow on its nose. Telephoto lens, soft overcast light, tracking shot, ultra-realistic fur detail, slow motion."],
  [2, "Whale Breach at Sunrise", "16:9", "8 seconds", "whale, ocean, sunrise, drone", "A massive animal and a glowing sky give a sense of awe that works well for travel and nature channels.", "A humpback whale breaching out of calm ocean water at sunrise, water streaming off its body as it arcs through the air and crashes back with a big splash. Wide aerial drone shot slowly descending, golden light, realistic documentary look."],
  [2, "Hummingbird Macro", "16:9", "5 seconds", "hummingbird, macro, slow motion, flowers", "Fast wings in slow motion against soft bokeh is a classic nature shot that looks impressive and natural.", "A tiny hummingbird hovering beside a bright red flower, wings a blur, drinking nectar. Extreme close-up slow motion, creamy green bokeh background, soft morning sunlight, sharp feather detail."],
  [2, "Kitten and Firefly", "9:16", "5 seconds", "kitten, cat, pet, firefly, cute", "Pet content with a small story beat, a curious pounce, performs very well on short-video platforms.", "A fluffy ginger kitten sitting on a porch at dusk, watching a glowing firefly drift by and pouncing playfully, warm string lights glowing behind. Low camera at kitten height, shallow depth of field, soft cinematic light, heartwarming mood."],
  [2, "Baby Elephant River Splash", "16:9", "8 seconds", "elephant, river, wildlife, joyful", "Joyful animal behavior with splashing water gives the clip energy and emotional warmth.", "A baby elephant splashing in a shallow river beside its mother, water spraying in sparkling arcs, trunk raised in joy. Late afternoon golden light, telephoto tracking shot, realistic wildlife documentary, slow motion."],
  [2, "Misty Forest Deer", "16:9", "8 seconds", "deer, forest, fog, dawn", "Fog and shafts of light create depth and calm with very little movement to render.", "A stag standing in a misty forest clearing at dawn, breath visible in the cold air, shafts of sunlight cutting through the trees as it slowly turns its head. Slow push-in, soft fog, calm and majestic, shallow depth of field."],
  [2, "Sea Turtle Glide", "16:9", "8 seconds", "turtle, underwater, coral reef, serene", "Slow underwater motion and rippling light make a relaxing clip that suits ambient and wellness content.", "A green sea turtle gliding over a sunlit coral reef, rays of light rippling across its shell as small colorful fish swim past. Underwater slow tracking shot, clear turquoise water, serene mood, natural color."],
  // Fantasy and Sci-Fi
  [3, "Miniature World in a Jar", "9:16", "8 seconds", "miniature, tilt-shift, jar, whimsical", "Tiny living worlds trigger curiosity, and the glass jar gives a clear frame for the action.", "A tiny living city inside a glass jar on a wooden desk, miniature cars moving along streets, windows glowing, small clouds drifting inside the glass. Macro lens, slow orbit around the jar, warm lamp light, whimsical and detailed, tilt-shift look."],
  [3, "Giant Creature Behind the Skyline", "16:9", "8 seconds", "monster, city, scale, dusk", "Contrasting a colossal silhouette with a familiar skyline makes the scale feel real.", "A colossal horned creature slowly rising from behind a foggy city skyline at dusk, its silhouette towering over the skyscrapers as birds scatter. Wide establishing shot, slow upward tilt, moody orange and teal palette, cinematic scale."],
  [3, "Floating Islands Flythrough", "16:9", "10 seconds", "fantasy, islands, waterfall, flythrough", "A smooth flythrough shows off depth and world-building in a single continuous shot.", "A smooth flythrough between floating green islands with waterfalls pouring into the clouds below, ancient stone bridges connecting them, glowing birds in the distance. Golden hour light, epic fantasy landscape, fluid camera movement."],
  [3, "Astronaut on Alien Dunes", "16:9", "8 seconds", "astronaut, alien planet, dunes, drone", "A lone figure in a vast landscape tells a story of exploration with minimal motion.", "A lone astronaut in a white suit walking across red alien dunes under two pale moons, wind blowing dust across the ground, footprints trailing behind. Slow drone shot pulling back, cinematic sci-fi, warm low sunlight, vast scale."],
  [3, "Cyberpunk Rain Alley", "16:9", "8 seconds", "cyberpunk, neon, rain, night", "Neon reflections in rain are visually rich and forgiving, making them a reliable look for AI video.", "A narrow cyberpunk alley at night, heavy rain falling through pink and cyan neon signs, puddles reflecting the glow, steam rising from grates, a lone figure with a glowing umbrella walking away. Slow tracking shot, anamorphic look, moody and cinematic."],
  [3, "Dragon Over the Castle", "16:9", "8 seconds", "dragon, castle, fantasy, aerial", "A classic fantasy image with slow wing beats and sweeping camera movement feels epic without being chaotic.", "A huge dragon with emerald scales soaring over a mountain castle at sunrise, wings beating slowly, clouds streaming past. Sweeping aerial orbit, epic fantasy film look, golden light, detailed textures."],
  [3, "Portal in the Forest", "16:9", "5 seconds", "portal, magic, forest, glow", "A glowing portal lights its surroundings, so the effect looks integrated into the scene.", "A swirling blue-violet portal opening between two ancient trees in a dark forest, glowing particles spiraling outward and lighting the mossy ground. Slow push-in, misty atmosphere, magical and mysterious, cinematic lighting."],
  // Cinematic and Action
  [4, "Car Drift at Dusk", "16:9", "5 seconds", "car, drift, dusk, action", "A single vehicle, one move and heavy atmosphere make an action shot models can handle.", "A vintage sports car drifting around a mountain bend at dusk, tires kicking up smoke, headlights cutting through the haze. Low tracking shot, motion blur on the road, warm orange sky, cinematic action look, slow motion."],
  [4, "FPV Canyon Dive", "16:9", "10 seconds", "fpv, drone, canyon, speed", "The fast first-person view is a social favorite for its sense of speed and freedom.", "A fast first-person FPV drone dive through a narrow red rock canyon, skimming the walls and banking around curves, a river glittering below. Wide-angle lens, bright midday light, thrilling speed, smooth stabilized motion."],
  [4, "Samurai Petal Duel", "16:9", "8 seconds", "samurai, duel, petals, slow motion", "Stillness, falling petals and a held breath create tension before any action happens.", "Two samurai facing each other in a quiet courtyard as cherry blossom petals swirl in the wind, one slowly drawing a sword. Slow motion, shallow depth of field, soft pink light, tense stillness before the strike, cinematic framing."],
  [4, "Rooftop Night Chase", "16:9", "5 seconds", "chase, rooftop, night, parkour", "A leap across a gap with city lights below delivers a clear action beat in a few seconds.", "A hooded runner sprinting across city rooftops at night and leaping over a gap, city lights glittering below. Handheld tracking shot, intense energy, cool blue tones with warm window glows, cinematic action."],
  [4, "Desert Highway Rider", "16:9", "8 seconds", "motorcycle, desert, sunset, aerial", "A lone rider and heat shimmer give a free, cinematic feeling with simple motion.", "A lone motorcyclist riding along an empty desert highway at sunset, heat shimmer rising from the asphalt, long shadow stretching behind. Aerial tracking shot circling the rider, warm golden tones, free and cinematic."],
  [4, "Lighthouse in the Storm", "16:9", "8 seconds", "lighthouse, storm, waves, drone", "Violent weather against a steady beam of light creates drama through contrast.", "A lighthouse on a rocky cliff during a violent storm, huge waves crashing against the rocks, its beam sweeping through rain and clouds. Slow drone orbit, dark dramatic sky, lightning flashes, realistic and epic."],
  // Lifestyle and Social
  [5, "Rainy Window Reading Nook", "9:16", "8 seconds", "cozy, rain, reading, window", "Cozy rainy scenes are among the most saved and rewatched on social platforms.", "A cozy reading nook by a large window on a rainy afternoon, a steaming mug and open book on a blanket, raindrops sliding down the glass, soft warm lamp glow. Slow push-in, shallow depth of field, calm and comforting mood."],
  [5, "Rooftop Golden Hour Dance", "9:16", "5 seconds", "dance, silhouette, golden hour, rooftop", "A silhouette against a glowing skyline avoids facial detail and looks cinematic on mobile.", "A dancer silhouetted on a city rooftop at golden hour, flowing fabric swirling as they spin, the skyline glowing behind. Smooth orbit, warm backlight, lens flare, graceful and cinematic."],
  [5, "Train Window Travel Vlog", "9:16", "8 seconds", "travel, train, mountains, vlog", "Scenery passing a window gives continuous natural motion and a strong travel mood.", "View from a train window as green mountains and a turquoise lake roll by, sunlight flickering across a small table with a coffee cup. Gentle handheld feel, warm travel vlog aesthetic, soft reflections in the glass."],
  [5, "Room Makeover Time-Lapse", "16:9", "10 seconds", "makeover, time-lapse, interior, cozy", "A transformation with a clear before and after is a proven format for engagement.", "Time-lapse of an empty room being transformed, furniture, plants and warm lighting appearing piece by piece until it becomes a cozy modern living room. Fixed wide camera, smooth transitions, bright natural light, satisfying makeover style."],
  [5, "City Sunrise Time-Lapse", "16:9", "8 seconds", "time-lapse, sunrise, skyline, calm", "Racing clouds and shifting color make a calm, uplifting clip that works for intros and backgrounds.", "A rooftop time-lapse of a city skyline waking up at sunrise, clouds racing past, the sky shifting from deep blue to pink and gold as windows light up and traffic trails glow below. Wide static shot, rich color, calm and uplifting."],
  [5, "Skateboard Plaza Tracking", "9:16", "5 seconds", "skateboard, urban, tracking shot, golden hour", "A low tracking shot with long shadows gives a simple street scene real cinematic style.", "A skateboarder gliding across an empty plaza at golden hour, board wheels clicking, long shadow stretching across the concrete. Smooth tracking shot at low angle, slight motion blur, warm light, cool urban mood."],
];

export const viral: ViralPrompt[] = raw.map(([c, title, aspect, duration, tags, why, prompt]) => ({
  slug: slugify(title),
  title,
  category: cats[c].name,
  catSlug: cats[c].slug,
  aspect,
  duration,
  tags: tags.split(",").map((t) => t.trim()),
  why,
  prompt,
  date: "2026-11-02",
}));

export const viralBySlug = (slug: string) => viral.find((p) => p.slug === slug);
export const catBySlug = (slug: string) => cats.find((c) => c.slug === slug);
export const viralInCat = (slug: string) => viral.filter((p) => p.catSlug === slug);
