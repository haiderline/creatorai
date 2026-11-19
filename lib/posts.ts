import automatedPosts from "@/content/automated-posts.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  sections: { h: string; p: string[] }[];
  tool: string; // tool slug to link to
  sources?: { title: string; url: string }[];
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

  {
    slug: "plan-multi-shot-ai-video-sequences",
    title: "How to Plan a Multi-Shot AI Video Sequence",
    description: "Turn one creative idea into a coherent sequence by planning shot roles, continuity, reference frames, and transitions before generating clips.",
    date: "2026-11-19", readMinutes: 6, tool: "text-to-video-prompt-generator",
    sections: [
      { h: "Write the sequence before writing individual prompts", p: ["A short film, product story, or social advert usually needs more than one camera angle. Instead of asking one generation to show an entire story, write a simple beat sheet first: what the viewer sees at the beginning, what changes, and what image should end the sequence. Three clear beats are often enough for a short edit.", "Give each clip one job. An establishing shot introduces the place, a detail shot shows an important object, and an action shot communicates the main event. This division makes each prompt easier to understand and gives you more control in editing."] },
      { h: "Create a continuity note", p: ["Before generating, record the details that must remain stable: character appearance, wardrobe, product design, location, time of day, lighting direction, and color palette. Reuse the same wording in every relevant prompt. A compact continuity note is more useful than rewriting a long character or product description from memory.", "Keep screen direction in mind. If a person exits frame to the right in one shot, plan the next shot so the movement feels intentional. For a product, keep its orientation and defining details consistent unless the story calls for a deliberate change."] },
      { h: "Choose a reference strategy", p: ["When a platform supports reference images or start frames, use a clean approved image for important characters, products, and locations. A reference gives the model a visual anchor that text alone may not provide. For less important background shots, a written description may be sufficient.", "Do not assume that using the same text guarantees identical results across separate generations. Review faces, labels, proportions, and background details before using clips together. Regenerate or simplify a shot when a continuity error is distracting."] },
      { h: "Give every shot its own camera instruction", p: ["Avoid repeating the same complicated camera move in every clip. Use a wide static or slow-moving shot to establish the scene, a controlled push-in to emphasize a detail, and a tracking shot when the subject travels. One understandable move per clip is easier to direct and edit than several unrelated movements.", "Write the camera instruction separately from the subject action. For example: the cyclist rides past the market stalls; the camera tracks alongside at a steady speed. This makes it easier to adjust the movement without changing the story beat."] },
      { h: "Generate, review, and assemble", p: ["Generate the clips in story order, but do not assume the first result is the best take. Review each clip for subject consistency, motion, framing, and whether it communicates its assigned beat. Keep a simple shot list with filenames and notes so you can identify the strongest version.", "Assemble the clips in an editor and use cuts, sound, and timing to create rhythm. If two shots do not connect, try changing the end pose or direction of movement in one clip, or insert a neutral detail shot. Generate only the missing shot rather than rebuilding the entire sequence."] }
    ]
  },
  {
    slug: "ai-product-video-prompts-that-show-material-and-detail",
    title: "How to Write AI Product Video Prompts That Show Material and Detail",
    description: "A practical framework for product clips: define the hero object, control reflections, choose a camera move, and protect product geometry.",
    date: "2026-11-19", readMinutes: 6, tool: "image-to-video-prompt-generator",
    sections: [
      { h: "Start with a product shot objective", p: ["Decide what the viewer should notice before choosing visual effects. A skincare bottle may need to communicate its shape and finish; a watch may need a readable dial and metal texture; food packaging may need color and surface detail. Choose one hero feature for the clip instead of asking the model to showcase everything at once.", "If the product has a real design, use a clear reference image where possible. Describe the non-negotiable details, such as silhouette, cap shape, material, color, and label placement. Avoid relying on text alone to reproduce small brand marks or exact typography."] },
      { h: "Describe materials in observable terms", p: ["Replace broad phrases such as premium material with details a camera can show. Examples include brushed steel with fine directional grain, clear glass with controlled edge reflections, matte ceramic with a soft diffuse highlight, or translucent liquid with visible refraction.", "Lighting should reveal the material rather than overwhelm it. A large soft source creates broad reflections on glossy objects, while a narrow strip light can reveal curved edges. For dark products, add a subtle rim light so the silhouette does not disappear into the background."] },
      { h: "Keep reflections and backgrounds intentional", p: ["Reflective products can become visually confusing when the prompt asks for many bright lights, mirrors, and moving backgrounds at once. Use a simple studio environment and specify where the main highlight should travel. Keep the background quiet unless it contributes directly to the product story.", "For a lifestyle scene, describe only a few environmental details that support the product. A coffee maker might sit on a clean kitchen counter with soft morning window light; a travel bag might be placed beside a train window. The setting should not compete with the object."] },
      { h: "Choose a camera move that suits the shape", p: ["A slow quarter-orbit can reveal the side profile of a bottle or watch. A macro push-in can emphasize a texture or functional detail. A controlled pull-back can reveal the product in its environment. A locked camera is often best when the model struggles to preserve geometry.", "State the movement and speed plainly, then keep the product action simple. For example: the bottle remains upright and centered while the camera makes a slow quarter-orbit from left to right. Avoid combining a full spin, a fast zoom, a dramatic tilt, and a moving product unless each movement is essential."] },
      { h: "Protect the product and inspect the result", p: ["Include concise preservation instructions for the product's proportions, number of components, cap or lid, color, and label position. These constraints can help communicate priorities but cannot guarantee exact brand fidelity. Always inspect the generated frames before using them in a commercial campaign.", "Check for warped edges, changing labels, duplicated parts, unstable reflections, and sudden camera movement. If a defect appears, simplify the prompt and change one variable at a time. For accurate packaging or regulated product information, composite approved artwork in post-production rather than trusting generated text."] }
    ]
  },
  {
    slug: "a-repeatable-ai-video-prompt-testing-workflow",
    title: "A Repeatable Workflow for Testing and Improving AI Video Prompts",
    description: "Use controlled prompt tests, version notes, and a simple review scorecard to learn what actually improves your AI video results.",
    date: "2026-11-19", readMinutes: 5, tool: "ai-video-prompt-generator",
    sections: [
      { h: "Treat each generation as a test", p: ["When a result misses the target, it is tempting to rewrite the entire prompt. That makes it difficult to know which change helped. Keep a baseline prompt and change one meaningful variable per test: the action, camera movement, lighting, style, or duration.", "Use the same reference image and the same available generation settings when comparing versions. If several settings change at once, the comparison cannot tell you whether the wording or the settings caused the difference."] },
      { h: "Write a clear baseline prompt", p: ["Start with a subject, one visible action, a setting, a camera instruction, and a lighting or style direction. Avoid adding long lists of adjectives before the main action is clear. Save the exact wording so you can return to it if an experiment makes the result worse.", "A useful baseline is specific enough to evaluate. Instead of a person in a beautiful city, try a cyclist riding past a row of brick storefronts, side-tracking camera at a steady pace, overcast afternoon light. You can then test one change, such as a low camera angle."] },
      { h: "Use a small review scorecard", p: ["After each generation, rate the result against the goal rather than judging only whether it looks impressive. Useful checks include subject accuracy, action clarity, motion stability, camera behavior, visual consistency, and framing. Note the most important failure in plain language.", "A short note such as subject correct, camera too fast, background stable is more useful than a vague label such as bad result. It tells you what to change next and helps you compare outputs from different sessions."] },
      { h: "Keep a prompt version history", p: ["Save the prompt, platform, model or mode where known, date, relevant settings, and a short result note. Model versions and platform controls can change, so a prompt that worked once is not a guarantee that it will behave identically later.", "Organize saved prompts by purpose, such as product reveal, character movement, landscape, or camera test. Keep successful examples alongside failed experiments and the reason they failed. This turns trial and error into a reusable working library."] },
      { h: "Know when to simplify or switch workflows", p: ["If the subject changes shape, remove unnecessary actions and reduce camera movement. If the scene looks generic, add a concrete environmental detail or a more specific material. If a character must remain recognizable, consider starting from a reference image and using a restrained image-to-video motion prompt.", "If several controlled tests still fail, the limitation may be the selected model, reference image, or task rather than the wording. Try a different supported workflow and check the platform's current controls instead of endlessly lengthening the prompt."] }
    ]
  },
];

posts.push(...(automatedPosts as Post[]));

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
