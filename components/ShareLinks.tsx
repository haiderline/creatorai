import { abs } from "@/lib/site";

export function ShareLinks({ path, title }: { path: string; title: string }) {
  const url = encodeURIComponent(abs(path));
  const text = encodeURIComponent(title);
  const links: [string, string][] = [
    ["X", `https://twitter.com/intent/tweet?text=${text}&url=${url}`],
    ["Reddit", `https://www.reddit.com/submit?url=${url}&title=${text}`],
    ["Pinterest", `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${url}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${url}`],
    ["WhatsApp", `https://wa.me/?text=${text}%20${url}`],
  ];
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">Share this prompt</p>
      <ul className="flex flex-wrap gap-2">
        {links.map(([name, href]) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-9! rounded-full! px-3.5!">{name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
