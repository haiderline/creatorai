export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  sections: { h: string; p: string[] }[];
  tool: string; // tool slug to link to
};

export const posts: Post[] = [
  {
    slug: "how-to-write-ai-video-prompts",
    title: "How to write AI video prompts that work",
    description: "A simple five-part formula for writing clear AI video prompts, with examples you can adapt for Kling, Runway, Veo, Sora and Seedance.",
    date: "2026-10-31",
    readMinutes: 4,
    tool: "ai-video-prompt-generator",
    sections: [
      { h: "Start with one subject and one action", p: ["Most weak AI video results come from prompts that try to do too much. A clip lasts a few seconds, so give it a single subject and a single action: a fox leaping through snow, a bottle rotating on glass, a drone rising over a coastline."] },
      { h: "Use the five-part formula", p: ["Write your prompt in this order: subject and action, setting, camera, lighting, style. For example: a lone astronaut crossing red dunes, an alien desert with drifting dust, slow drone shot gliding forward, low golden sunlight, cinematic film look.", "This order matches how models read prompts: what happens first, how it is filmed second, and how it looks last."] },
      { h: "Be concrete, not poetic", p: ["Replace abstract words with things a camera can see. Instead of a beautiful, emotional scene, write warm light on a woman's face as she looks out of a rain-streaked window. Specific nouns, materials and light direction give the model something to render."] },
      { h: "Set the format and keep clips short", p: ["Choose aspect ratio and duration before you generate. Vertical 9:16 suits Shorts, Reels and TikTok. Three to eight seconds is the most reliable range for coherent motion."] },
      { h: "Iterate one change at a time", p: ["If the result is close but not right, change one element, such as the camera move or the lighting, and generate again. This shows you which words control which parts of the output, and you will build a personal library of prompts that work."] },
    ],
  },
  {
    slug: "camera-movement-terms-for-ai-video",
    title: "Camera movement terms every AI video creator should know",
    description: "Learn the difference between zoom, dolly, orbit, crane, tracking and FPV shots, and when to use each in AI video prompts.",
    date: "2026-10-31",
    readMinutes: 4,
    tool: "cinematic-camera-movement-generator",
    sections: [
      { h: "Zoom versus dolly", p: ["A zoom changes the lens and keeps perspective flat. A dolly moves the camera through space, so the foreground and background shift against each other. If you want depth and a more cinematic feel, ask for a dolly. If you want a quick focus on detail, ask for a zoom."] },
      { h: "Orbit and tracking", p: ["An orbit circles the subject and is ideal for products and hero characters. A tracking shot follows a moving subject from behind, beside or in front, which suits walking, driving and running scenes."] },
      { h: "Crane and drone", p: ["Crane shots rise or fall smoothly and are common for openings and endings. Drone shots travel farther and higher, which makes them the natural choice for landscapes, cities and coastlines."] },
      { h: "Flythrough and FPV", p: ["A flythrough moves continuously through an environment, such as a forest or a building. FPV adds speed and agility, with sharp dives and turns. Use both sparingly, as fast moves are harder for models to keep stable."] },
      { h: "Add speed and purpose", p: ["Always state the speed: slow, steady or fast. Then say why. A slow push-in builds tension, while a fast whip pan creates energy. Naming the purpose helps models choose smoother motion."] },
    ],
  },
  {
    slug: "text-to-video-vs-image-to-video",
    title: "Text-to-video vs image-to-video: which should you use?",
    description: "Understand when to start from text and when to start from an image, with practical advice for getting consistent AI video results.",
    date: "2026-10-31",
    readMinutes: 3,
    tool: "image-to-video-prompt-generator",
    sections: [
      { h: "Text-to-video gives you freedom", p: ["With text-to-video, the model invents everything: subject, setting, lighting and motion. It is the fastest way to explore ideas and works well for scenery, abstract concepts and quick drafts."] },
      { h: "Image-to-video gives you control", p: ["With image-to-video you supply the exact look in a still image, and the prompt describes only the motion. It is the better choice for product shots, recurring characters, brand visuals and any project where consistency matters."] },
      { h: "A practical workflow", p: ["Many creators combine both. Generate or design a strong still image first, then animate it with a short motion prompt. Keep the motion subtle, use a slow camera move and tell the model to preserve the composition."] },
      { h: "Which prompt style to write", p: ["For text-to-video, describe the full scene: subject, action, setting, camera, lighting and style. For image-to-video, skip the visual description and focus on what moves, how the camera behaves and what must stay unchanged."] },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
