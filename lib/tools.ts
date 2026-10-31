import type { Mode } from "./generator";

export type Faq = { q: string; a: string };
export type Tool = {
  slug: string;
  mode: Mode;
  icon: string;
  name: string;
  blurb: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  steps: string[];
  tips: string[];
  faqs: Faq[];
  related: string[]; // blog slugs
};

export const tools: Tool[] = [
  {
    slug: "ai-video-prompt-generator",
    mode: "video",
    icon: "🎬",
    name: "AI Video Prompt Generator",
    blurb: "Pick subject, style, camera, lighting and platform to get ready-to-paste prompts.",
    title: "Free AI Video Prompt Generator for Kling, Veo and Sora",
    description:
      "Create detailed AI video prompts in seconds. Choose style, camera movement, environment, lighting, duration and platform for Kling, Runway, Veo, Sora or Seedance. Free, no sign-up.",
    h1: "AI Video Prompt Generator",
    intro:
      "Good AI video prompts describe five things: who or what is in the shot, how it moves, how the camera behaves, where it happens, and how it looks. This generator turns your idea into that structure and formats it for the platform you pick, so you spend less time rewriting and more time creating.",
    steps: [
      "Describe your subject in one sentence.",
      "Choose a style, camera movement, environment and lighting.",
      "Pick duration, aspect ratio and the AI video platform you will use.",
      "Press Generate, then copy or download the variation you like best.",
    ],
    tips: [
      "Keep one main subject and one main action per clip. Short clips follow prompts more faithfully.",
      "Use 9:16 for Shorts, Reels and TikTok, and 16:9 for YouTube and websites.",
      "Generate three variations and test the one that reads most clearly for your idea.",
      "If a result misses the mark, change a single option and generate again to see what moved.",
    ],
    faqs: [
      { q: "Is this AI video prompt generator really free?", a: "Yes. It runs in your browser, needs no account and uses no paid API. There is no usage limit." },
      { q: "Which AI video platforms are supported?", a: "Kling, Runway, Veo, Sora and Seedance. Each platform gets a slightly different layout, such as shot-by-shot timing for Seedance or an audio line for Veo." },
      { q: "Does it generate the video itself?", a: "No. It writes the prompt. You paste it into the video tool of your choice." },
      { q: "Are my prompts stored anywhere?", a: "Your history is saved only in your own browser using local storage. We never receive it, and you can clear it at any time." },
    ],
    related: ["how-to-write-ai-video-prompts", "text-to-video-vs-image-to-video"],
  },
  {
    slug: "image-to-video-prompt-generator",
    mode: "image",
    icon: "🖼️",
    name: "Image-to-Video Prompt Generator",
    blurb: "Describe your still image and get motion prompts that keep it consistent.",
    title: "Image-to-Video Prompt Generator for AI Animation",
    description:
      "Turn a still image into a motion prompt. Control subject movement, camera, ambient effects and motion strength for Kling, Runway, Veo, Sora and Seedance.",
    h1: "Image-to-Video Prompt Generator",
    intro:
      "When you animate an image, the picture already supplies the look. Your prompt only needs to describe motion and tell the model what to keep unchanged. This tool writes that kind of prompt: movement first, camera second, and a clear instruction to preserve the subject, framing and colors.",
    steps: [
      "Describe what is in your image in a short sentence.",
      "Choose how strongly the subject should move and which camera move to use.",
      "Select ambient motion such as wind, mist or floating particles.",
      "Generate, copy the prompt and upload your image to the video platform as the first frame.",
    ],
    tips: [
      "Start with Subtle motion. Strong motion is where faces and objects tend to morph.",
      "Describe only what should move. Do not re-describe details that are already in the image.",
      "Pick one camera move. Combining several often produces unstable results.",
      "Use an image whose aspect ratio matches the video format you choose.",
    ],
    faqs: [
      { q: "Do I upload my image here?", a: "No. The tool never receives your image. You describe it in words, then upload the image inside your chosen AI video platform." },
      { q: "Why does my subject change during animation?", a: "High motion strength and long durations increase drift. Use subtle motion, shorter clips and keep the preserve-composition instruction in the prompt." },
      { q: "Which camera movement is safest for image-to-video?", a: "A slow push-in, a slow pull-back or a gentle parallax move usually keeps the original image intact." },
      { q: "Can I use this for product photos?", a: "Yes. Choose Subtle motion, a slow orbit or push-in, and add light flicker or floating particles for a premium feel." },
    ],
    related: ["text-to-video-vs-image-to-video", "how-to-write-ai-video-prompts"],
  },
  {
    slug: "cinematic-camera-movement-generator",
    mode: "camera",
    icon: "🎥",
    name: "Cinematic Camera Movement Generator",
    blurb: "Get precise camera-move wording for dolly, crane, orbit, FPV and more.",
    title: "Cinematic Camera Movement Prompt Generator",
    description:
      "Generate precise camera movement wording for AI video: dolly, crane, orbit, tracking, drone, FPV, dolly zoom and more, with speed control and platform formatting.",
    h1: "Cinematic Camera Movement Generator",
    intro:
      "AI video models respond well to the language film crews use. Naming the exact move, its speed and its purpose gives you more predictable shots than saying the camera should look cool. Pick a movement and this tool writes it as a clear camera instruction you can drop into any prompt.",
    steps: [
      "Optionally add a subject so the prompt is ready to use on its own.",
      "Choose a camera movement and how fast it should happen.",
      "Select duration, aspect ratio and platform.",
      "Generate and paste the camera line into your main prompt, or use it alone.",
    ],
    tips: [
      "Match speed to emotion: slow for drama and beauty, fast for action and energy.",
      "A dolly moves through space and creates parallax. A zoom only changes the lens, so the perspective stays flat.",
      "Use Orbit for products and characters, Drone Shot for landscapes and Tracking Shot for people in motion.",
      "Every result lists what the move is best for and a lighting style that pairs well with it.",
    ],
    faqs: [
      { q: "What is the difference between a zoom and a dolly?", a: "A zoom changes the focal length and flattens depth. A dolly physically moves the camera forward or back, so objects at different distances shift against each other." },
      { q: "How long should a camera move last in AI video?", a: "Most clips are 3 to 10 seconds. One continuous move per clip is more reliable than several moves in a row." },
      { q: "What is an FPV shot?", a: "A first-person drone-style shot that moves fast and fluidly through an environment. It is popular for reveals and action." },
      { q: "Can I combine two camera moves?", a: "You can try, for example a slow push-in with a slight tilt up, but simple single moves are more consistent." },
    ],
    related: ["camera-movement-terms-for-ai-video", "how-to-write-ai-video-prompts"],
  },
  {
    slug: "ai-animation-prompt-generator",
    mode: "animation",
    icon: "✨",
    name: "AI Animation Prompt Generator",
    blurb: "Prompts for 2D, anime, 3D, claymation, paper cut-out and pixel art animation.",
    title: "AI Animation Prompt Generator for Cartoon and 3D Video",
    description:
      "Generate AI animation prompts for 2D hand-drawn, anime, stylized 3D, claymation, motion graphics, paper cut-out and pixel art. Free and works with every major AI video tool.",
    h1: "AI Animation Prompt Generator",
    intro:
      "Animated styles need different wording from realistic video. Characters have to stay on model, the motion style has to be named, and the mood sets the pacing. This generator pairs a character or scene with an animation technique and mood, then adds the consistency cues that help AI tools keep your design stable.",
    steps: [
      "Describe your character or scene and, optionally, what it does.",
      "Choose an animation style and a mood.",
      "Pick a camera setting, duration, aspect ratio and platform.",
      "Generate variations and copy the one that fits your story.",
    ],
    tips: [
      "Describe the character once, clearly: color, size and one distinctive feature.",
      "Name a technique, such as claymation or paper cut-out, instead of a vague word like cartoon.",
      "Use a static camera for characters that must stay consistent, and move the camera only when it helps.",
      "Keep actions simple. Bouncing, hopping, spinning and waving animate better than complex interactions.",
    ],
    faqs: [
      { q: "Can I make anime or cartoon videos with AI?", a: "Yes. Most current AI video tools can produce anime, 3D and stop-motion looks when the style is named clearly in the prompt." },
      { q: "How do I keep my character consistent?", a: "Keep the description short and identical across clips, use a static or slow camera, and prefer image-to-video from a fixed character image." },
      { q: "Does this copy any studio or franchise style?", a: "No. The styles are general animation techniques. Avoid naming protected characters or brands in prompts." },
      { q: "What duration works best for animation?", a: "Three to eight seconds. Short clips keep motion and design cleaner." },
    ],
    related: ["how-to-write-ai-video-prompts", "text-to-video-vs-image-to-video"],
  },
  {
    slug: "ai-video-negative-prompt-generator",
    mode: "negative",
    icon: "🚫",
    name: "AI Video Negative Prompt Generator",
    blurb: "Build negative prompts that reduce flicker, warping, bad hands and artifacts.",
    title: "AI Video Negative Prompt Generator",
    description:
      "Build negative prompts for AI video in seconds. Reduce flicker, morphing, distorted hands, blur, watermarks and artifacts, with positive rewrites for tools without a negative field.",
    h1: "AI Video Negative Prompt Generator",
    intro:
      "A negative prompt lists what you do not want to see. It helps reduce common video problems such as flicker, warped objects and distorted hands. Because not every platform has a negative field, each result also includes a positive rewrite you can add to a normal prompt instead.",
    steps: [
      "Choose the kind of video you are making.",
      "Tick the problems you want to avoid.",
      "Press Generate to get short, standard and thorough versions.",
      "Paste the negative line into the negative field, or use the positive alternative if your tool has none.",
    ],
    tips: [
      "Start with the short version. Very long negative lists can weaken the main prompt.",
      "Only include problems you actually see in your results.",
      "On tools without a negative field, describe what you want instead, for example sharp focus with stable lighting.",
      "Keep your negative prompt separate from your positive prompt and avoid contradictions between them.",
    ],
    faqs: [
      { q: "What is a negative prompt in AI video?", a: "It is a list of unwanted elements or qualities that the model should avoid, such as blur, text overlays or extra fingers." },
      { q: "Do all AI video platforms support negative prompts?", a: "No. Some provide a dedicated field and some do not. Check your platform. That is why each result includes a positive alternative." },
      { q: "Will a negative prompt fix everything?", a: "No. It reduces common issues but cannot guarantee a perfect result. Clear positive prompts and shorter clips matter more." },
      { q: "How many terms should I use?", a: "Five to fifteen focused terms is usually enough." },
    ],
    related: ["how-to-write-ai-video-prompts", "camera-movement-terms-for-ai-video"],
  },
  {
    slug: "text-to-video-prompt-generator",
    mode: "text",
    icon: "✍️",
    name: "Text-to-Video Prompt Generator",
    blurb: "Turn one idea into a structured scene, action, camera, look and audio prompt.",
    title: "Text-to-Video Prompt Generator: Idea to Scene",
    description:
      "Turn a one-line idea into a structured text-to-video prompt with scene, action, camera, look and audio. Free generator for Kling, Runway, Veo, Sora and Seedance.",
    h1: "Text-to-Video Prompt Generator",
    intro:
      "Text-to-video models work best when a prompt reads like a mini shot list. This tool takes a short idea and expands it into labeled parts: scene, action, camera, look, audio and technical settings. Labeled prompts are easy to edit, so you can adjust one part without rewriting the rest.",
    steps: [
      "Write your idea in one or two sentences.",
      "Add an optional action and choose a mood.",
      "Select style, camera, environment, lighting and output settings.",
      "Generate, then edit any labeled line you want to refine.",
    ],
    tips: [
      "Describe visible things only. Avoid abstract feelings that a camera cannot show.",
      "One action per clip gives the clearest results.",
      "Include audio direction if your platform generates sound.",
      "Reuse the same look line across clips to keep a series visually consistent.",
    ],
    faqs: [
      { q: "What is text-to-video?", a: "Text-to-video AI creates a short video clip from a written description. The quality of the clip depends heavily on the prompt." },
      { q: "How long should a text-to-video prompt be?", a: "Between 40 and 120 words is a good range. Enough detail to be specific, short enough to stay focused." },
      { q: "Why does the output include an audio line?", a: "Some platforms generate sound with video. If yours does not, simply delete the line." },
      { q: "Can I edit the generated prompt?", a: "Yes. Copy it and change any line. The labeled structure makes edits quick." },
    ],
    related: ["text-to-video-vs-image-to-video", "how-to-write-ai-video-prompts"],
  },
];

export const toolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
