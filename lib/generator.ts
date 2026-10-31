/**
 * Prompt engine. Pure functions, no network, no paid APIs.
 * Every output is assembled from curated phrase banks with a seeded random pick,
 * so each click gives different (but coherent) variations.
 */
export type Mode = "video" | "text" | "image" | "camera" | "animation" | "negative";
export type Values = Record<string, string | string[]>;
export type Result = { label: string; text: string };
export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "chips" | "multi";
  options?: readonly string[];
  placeholder?: string;
  required?: boolean;
};
type R = () => number;

/* ---------- small helpers ---------- */
function makeRng(seed: number): R {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(r: R, a: readonly T[]): T => a[Math.floor(r() * a.length)];
const sample = <T,>(r: R, a: readonly T[], n: number): T[] => {
  const c = [...a];
  const o: T[] = [];
  while (o.length < n && c.length) o.push(c.splice(Math.floor(r() * c.length), 1)[0]);
  return o;
};
const s = (v: Values, k: string) => (typeof v[k] === "string" ? (v[k] as string).trim() : "");
const list = (v: Values, k: string) => (Array.isArray(v[k]) ? (v[k] as string[]) : []);
const clean = (t: string) => t.replace(/[.\s]+$/g, "");
const cap = (t: string) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);
const mid = (t: string) => t.replace(/^(A|An|The)\s/, (m) => m.toLowerCase());
const secs = (d: string) => parseInt(d, 10) || 5;

/* ---------- option lists ---------- */
export const PLATFORMS = ["Kling", "Runway", "Veo", "Sora", "Seedance"] as const;
export const ASPECTS = ["16:9", "9:16", "1:1"] as const;
export const DURATIONS = ["3 seconds", "5 seconds", "8 seconds", "10 seconds", "15 seconds"] as const;
export const STYLES = ["Realistic", "Cinematic", "Anime", "3D Animation", "Documentary"] as const;
export const CAMERAS = ["Zoom In", "Zoom Out", "Drone Shot", "Orbit", "Tracking Shot", "Flythrough"] as const;
export const ENVIRONMENTS = ["City", "Nature", "Ocean", "Space", "Interior"] as const;
export const LIGHTINGS = ["Golden Hour", "Night", "Neon", "Studio Lighting"] as const;

/* ---------- phrase banks ---------- */
const STYLE: Record<string, string[]> = {
  Realistic: ["photorealistic footage", "natural skin and material textures", "true-to-life color grading", "shallow depth of field"],
  Cinematic: ["cinematic film look", "anamorphic lens character", "rich color grade with deep contrast", "subtle film grain"],
  Anime: ["Japanese anime style", "hand-painted backgrounds", "expressive line work", "vibrant cel shading"],
  "3D Animation": ["stylized 3D animation", "soft global illumination", "polished character rendering", "smooth physically based materials"],
  Documentary: ["handheld documentary footage", "natural available light", "authentic observational feel", "slightly desaturated true color"],
};
const CAMERA: Record<string, string[]> = {
  "Zoom In": ["a smooth, slow zoom in that gradually tightens on the subject", "a steady push-in that builds intimacy"],
  "Zoom Out": ["a smooth zoom out that slowly reveals the wider scene", "a gradual pull-back revealing the scale of the surroundings"],
  "Drone Shot": ["a sweeping aerial drone shot gliding forward and slightly downward", "a high drone shot rising to reveal the scale of the scene"],
  Orbit: ["a smooth orbit around the subject with the subject kept centered", "a slow circular orbit that reveals the subject from every side"],
  "Tracking Shot": ["a steady tracking shot following the subject", "a lateral tracking shot moving in parallel with the subject"],
  Flythrough: ["a continuous flythrough weaving through the scene", "a fluid flythrough passing close to foreground elements"],
  "Static Shot": ["a locked-off static camera with all motion happening inside the frame"],
};
const ENV: Record<string, { place: string[]; detail: string[]; sound: string[] }> = {
  City: {
    place: ["a dense modern city at street level", "a glittering metropolis skyline", "a busy downtown intersection"],
    detail: ["glass towers, moving traffic and distant pedestrians", "reflections on wet asphalt and glowing storefronts", "steam rising from street vents"],
    sound: ["distant traffic hum and city ambience", "muffled footsteps and faint horns"],
  },
  Nature: {
    place: ["a lush forest valley", "an open alpine meadow", "a misty woodland trail"],
    detail: ["swaying grass and drifting pollen", "layers of fog between tall trees", "light filtering through leaves"],
    sound: ["birdsong and rustling leaves", "gentle wind through the trees"],
  },
  Ocean: {
    place: ["a wide open ocean", "a rugged coastline with crashing waves", "a calm turquoise bay"],
    detail: ["rolling swells and sea spray", "foam curling along the shoreline", "sunlight sparkling on the water"],
    sound: ["rolling waves and distant seabirds", "deep ocean wind and surf"],
  },
  Space: {
    place: ["deep space near a glowing nebula", "the surface of an alien planet", "orbit above a blue planet"],
    detail: ["distant stars and drifting cosmic dust", "swirling gas clouds in violet and teal", "a slowly rotating planet on the horizon"],
    sound: ["a low ambient hum with a soft synth drone", "near silence with a faint deep rumble"],
  },
  Interior: {
    place: ["a cozy modern interior", "a minimalist loft studio", "an elegant, dimly lit room"],
    detail: ["dust motes floating in the air", "soft fabrics, wood textures and gentle reflections", "curtains stirring in a light breeze"],
    sound: ["quiet room tone with soft ambience", "a faint clock tick and distant street murmur"],
  },
};
const LIGHT: Record<string, string[]> = {
  "Golden Hour": ["warm golden hour sunlight with long soft shadows", "a low sun casting an amber glow and gentle lens flare"],
  Night: ["moody night lighting with deep blue shadows", "a dark atmosphere lit by moonlight and practical lights"],
  Neon: ["vivid neon lighting in magenta and cyan with glowing reflections", "colorful neon glow with high contrast"],
  "Studio Lighting": ["clean studio lighting with a soft key light and subtle rim light", "controlled softbox lighting with smooth gradients"],
};
const MOTION = ["with subtle, natural motion", "with fluid, continuous movement", "with confident, purposeful movement"];
const SOUND = ["subtle ambient sound design", "soft atmospheric ambience", "natural environmental sound"];

/** Platform-specific packaging of a core prompt. */
function wrap(platform: string, core: string, d: number, aspect: string, r: R): string {
  switch (platform) {
    case "Runway":
      return `${core}\n\nSettings: ${d}s, ${aspect}`;
    case "Veo":
      return `${core}\nAudio: ${pick(r, SOUND)}.\nSettings: ${d}s, ${aspect}`;
    case "Sora":
      return `${core}\n\nFormat: ${d} seconds, ${aspect}.`;
    case "Seedance":
      return `${core} Pacing builds gradually across ${d} seconds, ${aspect}.`;
    default:
      return `${core} ${d}-second clip, ${aspect}, smooth natural motion, high detail.`;
  }
}

/* ---------- video (+ text-to-video) ---------- */
function videoPrompt(v: Values, r: R, structured: boolean): string {
  const subject = clean(s(v, "subject") || s(v, "idea"));
  const action = clean(s(v, "action"));
  const mood = s(v, "mood");
  const style = sample(r, STYLE[s(v, "style")] ?? STYLE.Cinematic, 2).join(", ");
  const cam = pick(r, CAMERA[s(v, "camera")] ?? CAMERA["Tracking Shot"]);
  const env = ENV[s(v, "environment")] ?? ENV.City;
  const place = pick(r, env.place);
  const detail = pick(r, env.detail);
  const sound = pick(r, env.sound);
  const light = pick(r, LIGHT[s(v, "lighting")] ?? LIGHT["Golden Hour"]);
  const d = secs(s(v, "duration"));
  const aspect = s(v, "aspect") || "16:9";
  const platform = s(v, "platform") || "Kling";
  const subj = cap(action ? `${subject}, ${action}` : `${subject} ${pick(r, MOTION)}`);

  if (structured) {
    return [
      `Scene: ${cap(subject)} in ${place}, ${detail}.`,
      `Action: ${cap(action || `the subject moves ${pick(r, MOTION)}`)}.`,
      `Camera: ${cap(cam)}.`,
      `Look: ${cap(style)}; ${light}${mood ? `; ${mood.toLowerCase()} mood` : ""}.`,
      `Audio: ${cap(sound)}.`,
      `Technical: ${d} seconds, ${aspect}, written for ${platform}.`,
    ].join("\n");
  }

  switch (platform) {
    case "Runway":
      return `${cap(cam)}. ${subj} in ${place}. ${cap(light)}, ${style}.\n\nSettings: ${d}s, ${aspect}`;
    case "Veo":
      return `${subj} in ${place}, ${detail}. ${cap(cam)}. ${cap(light)}. ${cap(style)}.\nAudio: ${cap(sound)}.\nSettings: ${d}s, ${aspect}`;
    case "Sora":
      return [
        `Shot: ${cap(cam)}.`,
        `Subject and action: ${subj}.`,
        `Setting: ${cap(place)}, ${detail}.`,
        `Lighting: ${cap(light)}.`,
        `Look: ${cap(style)}.`,
        `Format: ${d} seconds, ${aspect}.`,
      ].join("\n");
    case "Seedance": {
      const a = Math.max(1, Math.round(d / 3));
      const b = Math.max(a + 1, Math.round((2 * d) / 3));
      return [
        `${subj} in ${place}. ${cap(light)}. ${cap(style)}. ${aspect}, ${d}s.`,
        `0-${a}s: Establishing view of ${place}, ${detail}.`,
        `${a}-${b}s: ${cap(cam)} as ${mid(subject)} ${action || "moves with purpose"}.`,
        `${b}-${d}s: The camera settles on a strong final composition of ${mid(subject)}.`,
      ].join("\n");
    }
    default:
      return `${subj} in ${place}, ${detail}. Camera: ${cam}. Lighting: ${light}. Style: ${style}. ${d}-second clip, ${aspect}, smooth natural motion, high detail.`;
  }
}

/* ---------- image to video ---------- */
const IMG_MOTION: Record<string, string[]> = {
  Subtle: ["gentle, barely perceptible movement", "soft, breathing-like motion"],
  Moderate: ["natural, clearly visible movement", "smooth, lifelike motion"],
  Dynamic: ["energetic, expressive movement", "bold, dynamic motion"],
};
const IMG_CAMERA: Record<string, string> = {
  Static: "locked-off static camera",
  "Slow zoom in": "slow, smooth push-in",
  "Slow zoom out": "slow pull-back that reveals more of the scene",
  "Pan left": "gentle pan to the left",
  "Pan right": "gentle pan to the right",
  Orbit: "slow orbit around the subject with subtle parallax",
  "Parallax push-in": "slow 2.5D parallax push-in with clear depth separation",
  "Tilt up": "slow tilt up",
};
const AMBIENT: Record<string, string> = {
  Wind: "wind moving hair, fabric and foliage",
  "Water ripples": "water rippling and catching the light",
  "Clouds drifting": "clouds drifting slowly across the sky",
  "Floating particles": "dust and light particles floating in the air",
  "Light flicker": "soft light flickering and shifting",
  Rain: "light rain falling with small splashes",
  Mist: "mist curling and drifting through the scene",
};

function imagePrompt(v: Values, r: R): string {
  const desc = clean(s(v, "description"));
  const intensity = s(v, "intensity") || "Moderate";
  const motion = pick(r, IMG_MOTION[intensity] ?? IMG_MOTION.Moderate);
  const subjectMotion = clean(s(v, "subjectMotion"));
  const cam = IMG_CAMERA[s(v, "camera")] ?? IMG_CAMERA["Slow zoom in"];
  const amb = list(v, "ambient").map((k) => AMBIENT[k]).filter(Boolean);
  const d = secs(s(v, "duration"));
  const aspect = s(v, "aspect") || "16:9";
  const keep = pick(r, [
    "Preserve the original composition, subject identity, colors and lighting; no morphing and no new objects.",
    "Keep the subject's appearance, framing and color palette exactly as in the image; avoid warping or sudden changes.",
  ]);
  const core =
    `Animate this image: ${desc}. Use ${motion}${subjectMotion ? `: ${subjectMotion}` : ""}. ` +
    `Camera: ${cam}. Ambient motion: ${amb.length ? amb.join(", ") : "subtle natural environmental movement"}. ${keep}`;
  return wrap(s(v, "platform") || "Kling", core, d, aspect, r);
}

/* ---------- camera movement ---------- */
const MOVES: Record<string, { phrases: string[]; use: string }> = {
  "Zoom In": { phrases: ["a smooth zoom in toward the subject", "a gradual push-in that tightens the framing"], use: "emotional beats and reveals of detail" },
  "Zoom Out": { phrases: ["a smooth zoom out that reveals the wider scene", "a slow pull-back widening the frame"], use: "showing scale and context" },
  "Dolly In": { phrases: ["a physical dolly move toward the subject with natural parallax", "the camera glides forward on a dolly, background shifting subtly"], use: "dramatic emphasis with real depth" },
  "Dolly Out": { phrases: ["the camera dollies backward, widening the view with natural parallax"], use: "endings and isolation" },
  Pan: { phrases: ["a smooth horizontal pan across the scene", "a slow pan that follows the action across the frame"], use: "landscapes and following action" },
  Tilt: { phrases: ["a slow vertical tilt from the ground up to the subject", "a smooth tilt up that reveals height and scale"], use: "tall subjects and architecture" },
  "Crane Shot": { phrases: ["a crane shot rising smoothly while keeping the subject in frame", "a sweeping crane move that lifts and reveals the surroundings"], use: "opening and closing shots" },
  "Drone Shot": { phrases: ["a sweeping aerial drone shot gliding forward", "a high drone shot descending toward the subject"], use: "landscapes and establishing shots" },
  Orbit: { phrases: ["a smooth 360-degree orbit around the subject", "a slow circular orbit keeping the subject centered"], use: "product shots and hero characters" },
  "Tracking Shot": { phrases: ["a steady tracking shot following the subject", "a side tracking shot moving in parallel with the subject"], use: "walking, driving and chase scenes" },
  Flythrough: { phrases: ["a continuous flythrough weaving through the environment", "a fluid flythrough passing close to foreground elements"], use: "environments and architecture" },
  "Handheld": { phrases: ["a natural handheld camera with subtle organic shake", "an observational handheld shot with gentle sway"], use: "documentary realism" },
  "Whip Pan": { phrases: ["a fast whip pan with motion blur transitioning to the next view"], use: "energetic transitions" },
  "FPV Dive": { phrases: ["a fast first-person FPV drone dive swooping through the scene", "an aggressive FPV run weaving past obstacles"], use: "high-energy action and reveals" },
  "Dolly Zoom": { phrases: ["a dolly zoom where the background stretches while the subject stays the same size"], use: "tension and shock" },
  "Rack Focus": { phrases: ["a rack focus shifting from the foreground object to the subject"], use: "shifting attention within a shot" },
};
const SPEED: Record<string, string> = { Slow: "slow and steady", Medium: "moderately paced", Fast: "fast and energetic" };

function cameraPrompt(v: Values, r: R): string {
  const subject = clean(s(v, "subject"));
  const m = MOVES[s(v, "movement")] ?? MOVES["Orbit"];
  const d = secs(s(v, "duration"));
  const speed = SPEED[s(v, "speed")] ?? SPEED.Slow;
  const lead = subject ? `${cap(subject)}. ` : "";
  const core = `${lead}Camera: ${pick(r, m.phrases)}, ${speed}, lasting the full ${d} seconds. Keep the subject sharp and the movement free of jitter.`;
  const pair = pick(r, Object.values(LIGHT).flat());
  return `${wrap(s(v, "platform") || "Kling", core, d, s(v, "aspect") || "16:9", r)}\n\nBest for: ${m.use}.\nPairs well with: ${pair}.`;
}

/* ---------- animation ---------- */
const ANIM: Record<string, string[]> = {
  "2D Hand-Drawn": ["traditional hand-drawn 2D animation", "visible pencil line work with fluid frame-by-frame motion"],
  Anime: ["anime-style animation", "dynamic speed lines, expressive eyes and painterly backgrounds"],
  "Stylized 3D": ["stylized 3D character animation", "soft subsurface lighting and appealing exaggerated poses"],
  Claymation: ["stop-motion claymation", "tactile clay textures with slight handmade frame-to-frame variation"],
  "Motion Graphics": ["clean vector motion graphics", "flat shapes, smooth easing and bold color blocking"],
  "Paper Cut-Out": ["paper cut-out animation", "layered paper textures with soft shadow depth"],
  "Pixel Art": ["retro pixel-art animation", "limited color palette, crisp chunky pixels and looping motion"],
};
const MOOD: Record<string, string> = {
  Playful: "playful, bouncy energy",
  Epic: "epic, sweeping and heroic",
  Calm: "calm, soft and soothing",
  Mysterious: "mysterious, quiet and atmospheric",
  Heartwarming: "warm, gentle and heartwarming",
};

function animationPrompt(v: Values, r: R): string {
  const subject = clean(s(v, "subject"));
  const action = clean(s(v, "action"));
  const st = ANIM[s(v, "animStyle")] ?? ANIM["Stylized 3D"];
  const cam = pick(r, CAMERA[s(v, "camera")] ?? CAMERA["Static Shot"]);
  const d = secs(s(v, "duration"));
  const core =
    `${cap(st[0])}: ${subject}${action ? `, ${action}` : ""}. ${cap(st[1])}. ` +
    `Mood: ${MOOD[s(v, "mood")] ?? MOOD.Playful}. Camera: ${cam}. Consistent character design and smooth, readable motion.`;
  return wrap(s(v, "platform") || "Kling", core, d, s(v, "aspect") || "16:9", r);
}

/* ---------- negative prompts ---------- */
export const ISSUES: Record<string, { neg: string; pos: string }> = {
  "Distorted hands": { neg: "deformed hands, extra fingers, fused fingers", pos: "anatomically correct hands" },
  "Extra limbs or faces": { neg: "extra limbs, duplicate faces, distorted anatomy", pos: "natural, correct anatomy" },
  Flicker: { neg: "flickering, strobing, inconsistent lighting between frames", pos: "stable, consistent lighting across frames" },
  Morphing: { neg: "morphing, warping, shape-shifting objects", pos: "objects keep a consistent shape and identity" },
  Blur: { neg: "blurry, out of focus, motion smear", pos: "sharp focus with clean detail" },
  "Low quality": { neg: "low resolution, pixelated, compression artifacts, grainy noise", pos: "high resolution, clean image" },
  "Text and watermarks": { neg: "watermark, logo, subtitles, random text, captions", pos: "clean frame with no text, logos or watermarks" },
  Jitter: { neg: "jittery motion, stuttering, unnatural camera shake", pos: "smooth, stable motion" },
  Oversaturation: { neg: "oversaturated colors, harsh contrast, blown-out highlights", pos: "balanced natural color and exposure" },
  "Plastic skin": { neg: "plastic skin, uncanny face, waxy look", pos: "natural realistic skin and faces" },
};
const CATEGORIES: Record<string, string[]> = {
  "General video": ["bad quality", "distorted", "unnatural motion"],
  "People and characters": ["bad anatomy", "asymmetrical eyes", "uncanny valley"],
  Animation: ["inconsistent character design", "frame skipping", "off-model drawing"],
  "Product shots": ["warped product shape", "misspelled label text", "dust and fingerprints"],
  Landscapes: ["tilted horizon", "duplicated trees", "oversaturated sky"],
};

function negativeResults(v: Values): Result[] {
  const chosen = list(v, "issues").filter((k) => ISSUES[k]);
  const extras = CATEGORIES[s(v, "category")] ?? CATEGORIES["General video"];
  const first = (k: string) => ISSUES[k].neg.split(", ")[0];
  const build = (neg: string[], pos: string[]) =>
    `Negative prompt: ${neg.join(", ")}\n\nPositive alternative (for tools without a negative field): ${pos.join("; ")}.`;
  const short = chosen.slice(0, 5);
  return [
    { label: "Short", text: build([...short.map(first), extras[0]], short.slice(0, 3).map((k) => ISSUES[k].pos)) },
    { label: "Standard", text: build([...chosen.map((k) => ISSUES[k].neg), extras[0]], chosen.map((k) => ISSUES[k].pos)) },
    { label: "Thorough", text: build([...chosen.map((k) => ISSUES[k].neg), ...extras], chosen.map((k) => ISSUES[k].pos)) },
  ];
}

/* ---------- public API ---------- */
export function generate(mode: Mode, v: Values, count: number, seed: number): Result[] {
  if (mode === "negative") return negativeResults(v);
  return Array.from({ length: count }, (_, i) => {
    const r = makeRng(seed + i * 7919);
    const text =
      mode === "video" ? videoPrompt(v, r, false)
      : mode === "text" ? videoPrompt(v, r, true)
      : mode === "image" ? imagePrompt(v, r)
      : mode === "camera" ? cameraPrompt(v, r)
      : animationPrompt(v, r);
    return { label: `Variation ${i + 1}`, text };
  });
}

/* ---------- form configuration ---------- */
const common = {
  duration: { key: "duration", label: "Duration", type: "chips", options: DURATIONS } as Field,
  aspect: { key: "aspect", label: "Aspect ratio", type: "chips", options: ASPECTS } as Field,
  platform: { key: "platform", label: "AI video platform", type: "chips", options: PLATFORMS } as Field,
};
const base: Values = { duration: "5 seconds", aspect: "16:9", platform: "Kling" };

const SUBJECTS = [
  "A lone astronaut in a silver suit crossing an alien desert",
  "A steaming ramen stall on a rainy neon street",
  "A humpback whale surfacing beside a small sailboat",
  "A glass perfume bottle rotating on a mirrored surface",
  "A red fox leaping through fresh snow in a pine forest",
  "A street dancer spinning under a flickering streetlight",
  "A vintage sports car driving along a coastal highway",
  "A tiny robot watering a rooftop garden at dawn",
  "A chef flipping vegetables in a flaming wok",
  "A paper boat drifting down a rain-filled gutter",
];

export const modeConfig: Record<Mode, { fields: Field[]; defaults: Values; examples: { name: string; values: Values }[]; pool: string[]; poolKey: string }> = {
  video: {
    poolKey: "subject",
    pool: SUBJECTS,
    fields: [
      { key: "subject", label: "Video subject", type: "textarea", required: true, placeholder: "e.g. A lone astronaut walking across red desert dunes" },
      { key: "style", label: "Video style", type: "chips", options: STYLES },
      { key: "camera", label: "Camera movement", type: "chips", options: CAMERAS },
      { key: "environment", label: "Environment", type: "chips", options: ENVIRONMENTS },
      { key: "lighting", label: "Lighting", type: "chips", options: LIGHTINGS },
      common.duration, common.aspect, common.platform,
    ],
    defaults: { subject: "", style: "Cinematic", camera: "Tracking Shot", environment: "City", lighting: "Golden Hour", ...base },
    examples: [
      { name: "Alien desert", values: { subject: SUBJECTS[0], style: "Cinematic", camera: "Drone Shot", environment: "Space", lighting: "Golden Hour", ...base, duration: "8 seconds", platform: "Veo" } },
      { name: "Neon ramen", values: { subject: SUBJECTS[1], style: "Realistic", camera: "Tracking Shot", environment: "City", lighting: "Neon", ...base, aspect: "9:16", platform: "Kling" } },
      { name: "Whale and boat", values: { subject: SUBJECTS[2], style: "Documentary", camera: "Orbit", environment: "Ocean", lighting: "Golden Hour", ...base, duration: "10 seconds", platform: "Sora" } },
      { name: "Perfume ad", values: { subject: SUBJECTS[3], style: "Realistic", camera: "Orbit", environment: "Interior", lighting: "Studio Lighting", ...base, aspect: "1:1", platform: "Runway" } },
    ],
  },
  text: {
    poolKey: "idea",
    pool: SUBJECTS,
    fields: [
      { key: "idea", label: "Your idea", type: "textarea", required: true, placeholder: "Describe the scene in one or two sentences" },
      { key: "action", label: "What happens (optional)", type: "text", placeholder: "e.g. slowly turns and looks at the camera" },
      { key: "mood", label: "Mood", type: "chips", options: ["Epic", "Calm", "Mysterious", "Joyful", "Tense"] },
      { key: "style", label: "Video style", type: "chips", options: STYLES },
      { key: "camera", label: "Camera movement", type: "chips", options: CAMERAS },
      { key: "environment", label: "Environment", type: "chips", options: ENVIRONMENTS },
      { key: "lighting", label: "Lighting", type: "chips", options: LIGHTINGS },
      common.duration, common.aspect, common.platform,
    ],
    defaults: { idea: "", action: "", mood: "Epic", style: "Cinematic", camera: "Zoom In", environment: "Nature", lighting: "Golden Hour", ...base },
    examples: [
      { name: "Fox in snow", values: { idea: SUBJECTS[4], action: "pauses, ears twitching, then bounds out of frame", mood: "Calm", style: "Realistic", camera: "Tracking Shot", environment: "Nature", lighting: "Golden Hour", ...base } },
      { name: "Street dancer", values: { idea: SUBJECTS[5], action: "spins and freezes in a sharp pose", mood: "Tense", style: "Cinematic", camera: "Orbit", environment: "City", lighting: "Night", ...base, aspect: "9:16" } },
      { name: "Coastal drive", values: { idea: SUBJECTS[6], action: "", mood: "Joyful", style: "Cinematic", camera: "Drone Shot", environment: "Ocean", lighting: "Golden Hour", ...base, duration: "10 seconds" } },
    ],
  },
  image: {
    poolKey: "description",
    pool: [
      "A woman in a red coat standing on a foggy mountain pass",
      "A cozy cabin with smoke rising from the chimney at dusk",
      "A close-up portrait of an elderly fisherman smiling",
      "A product photo of white sneakers on a concrete step",
      "A fantasy castle on a cliff above a stormy sea",
      "A cup of coffee on a wooden table beside a rain-streaked window",
    ],
    fields: [
      { key: "description", label: "What is in your image?", type: "textarea", required: true, placeholder: "e.g. A woman in a red coat on a foggy mountain pass" },
      { key: "subjectMotion", label: "Subject movement (optional)", type: "text", placeholder: "e.g. she turns her head and her coat flutters" },
      { key: "intensity", label: "Motion strength", type: "chips", options: ["Subtle", "Moderate", "Dynamic"] },
      { key: "camera", label: "Camera movement", type: "chips", options: Object.keys(IMG_CAMERA) },
      { key: "ambient", label: "Background motion", type: "multi", options: Object.keys(AMBIENT) },
      common.duration, common.aspect, common.platform,
    ],
    defaults: { description: "", subjectMotion: "", intensity: "Subtle", camera: "Slow zoom in", ambient: ["Wind", "Floating particles"], ...base },
    examples: [
      { name: "Mountain pass", values: { description: "A woman in a red coat standing on a foggy mountain pass", subjectMotion: "she turns her head and her coat flutters", intensity: "Subtle", camera: "Slow zoom in", ambient: ["Wind", "Mist"], ...base } },
      { name: "Cabin at dusk", values: { description: "A cozy cabin with smoke rising from the chimney at dusk", subjectMotion: "", intensity: "Subtle", camera: "Parallax push-in", ambient: ["Clouds drifting", "Light flicker"], ...base } },
      { name: "Coffee by the window", values: { description: "A cup of coffee on a wooden table beside a rain-streaked window", subjectMotion: "steam curls up from the cup", intensity: "Moderate", camera: "Static", ambient: ["Rain", "Light flicker"], ...base, aspect: "9:16" } },
    ],
  },
  camera: {
    poolKey: "subject",
    pool: SUBJECTS,
    fields: [
      { key: "subject", label: "Subject (optional)", type: "text", placeholder: "e.g. A skateboarder on an empty plaza" },
      { key: "movement", label: "Camera movement", type: "select", options: Object.keys(MOVES) },
      { key: "speed", label: "Speed", type: "chips", options: ["Slow", "Medium", "Fast"] },
      common.duration, common.aspect, common.platform,
    ],
    defaults: { subject: "", movement: "Orbit", speed: "Slow", ...base },
    examples: [
      { name: "Hero orbit", values: { subject: "A glass perfume bottle on a mirrored surface", movement: "Orbit", speed: "Slow", ...base } },
      { name: "Chase tracking", values: { subject: "A cyclist racing through a tunnel", movement: "Tracking Shot", speed: "Fast", ...base, aspect: "9:16" } },
      { name: "Epic reveal", values: { subject: "A castle on a mountain ridge", movement: "Crane Shot", speed: "Medium", ...base, duration: "8 seconds" } },
    ],
  },
  animation: {
    poolKey: "subject",
    pool: [
      "A fluffy blue monster learning to ride a bicycle",
      "A tiny robot watering a rooftop garden at dawn",
      "A paper boat drifting down a rain-filled gutter",
      "A fox spirit dancing between lanterns",
      "A sleepy cat chasing a glowing firefly",
      "A young wizard's apprentice juggling floating books",
    ],
    fields: [
      { key: "subject", label: "Character or scene", type: "textarea", required: true, placeholder: "e.g. A tiny robot watering a rooftop garden" },
      { key: "action", label: "Action (optional)", type: "text", placeholder: "e.g. hops between flower pots" },
      { key: "animStyle", label: "Animation style", type: "chips", options: Object.keys(ANIM) },
      { key: "mood", label: "Mood", type: "chips", options: Object.keys(MOOD) },
      { key: "camera", label: "Camera", type: "chips", options: ["Static Shot", ...CAMERAS] },
      common.duration, common.aspect, common.platform,
    ],
    defaults: { subject: "", action: "", animStyle: "Stylized 3D", mood: "Playful", camera: "Static Shot", ...base },
    examples: [
      { name: "Robot gardener", values: { subject: "A tiny robot watering a rooftop garden at dawn", action: "hops between flower pots", animStyle: "Stylized 3D", mood: "Heartwarming", camera: "Zoom Out", ...base } },
      { name: "Paper boat", values: { subject: "A paper boat drifting down a rain-filled gutter", action: "", animStyle: "Paper Cut-Out", mood: "Calm", camera: "Tracking Shot", ...base } },
      { name: "Fox spirit", values: { subject: "A fox spirit dancing between lanterns", action: "leaps and spins", animStyle: "Anime", mood: "Mysterious", camera: "Orbit", ...base, aspect: "9:16" } },
    ],
  },
  negative: {
    poolKey: "",
    pool: [],
    fields: [
      { key: "category", label: "What are you generating?", type: "chips", options: Object.keys(CATEGORIES) },
      { key: "issues", label: "Problems to avoid", type: "multi", options: Object.keys(ISSUES) },
    ],
    defaults: { category: "General video", issues: ["Distorted hands", "Flicker", "Morphing", "Blur", "Text and watermarks", "Low quality"] },
    examples: [
      { name: "Realistic people", values: { category: "People and characters", issues: ["Distorted hands", "Extra limbs or faces", "Plastic skin", "Flicker", "Blur"] } },
      { name: "Product ad", values: { category: "Product shots", issues: ["Morphing", "Text and watermarks", "Blur", "Low quality", "Oversaturation"] } },
      { name: "Animation", values: { category: "Animation", issues: ["Flicker", "Jitter", "Morphing", "Low quality"] } },
    ],
  },
};

export function randomValues(mode: Mode): Values {
  const cfg = modeConfig[mode];
  const out: Values = { ...cfg.defaults };
  const rnd = (n: number) => Math.floor(Math.random() * n);
  for (const f of cfg.fields) {
    if ((f.type === "chips" || f.type === "select") && f.options) out[f.key] = f.options[rnd(f.options.length)];
    else if (f.type === "multi" && f.options) out[f.key] = sample(Math.random, f.options, 2 + rnd(3));
  }
  if (cfg.poolKey) out[cfg.poolKey] = cfg.pool[rnd(cfg.pool.length)];
  return out;
}
