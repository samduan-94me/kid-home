/* =====================================================================
   🤖 app.js — the "robot" that builds the page from my-stuff.js
   You don't need to edit this file, but you're welcome to peek!
   ===================================================================== */

const data = window.MY_STUFF || {};
const THEMES = ["space", "candy", "jungle", "paper"];

/* ---------- 1. Little helper to make HTML boxes ----------
   el("p", {class:"hi"}, "Hello")  makes  <p class="hi">Hello</p>      */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  for (const child of children.flat()) {
    if (child === undefined || child === null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

/* ---------- 2. Look at a link and figure out what it is ---------- */
function detect(rawUrl) {
  let u;
  try { u = new URL(rawUrl, location.href); } catch { return { kind: "link", icon: "🔗" }; }
  const host = u.hostname.replace(/^www\.|^m\./, "");
  const parts = u.pathname.split("/").filter(Boolean);

  // YouTube: watch?v=ID, youtu.be/ID, /shorts/ID, /embed/ID, /live/ID
  if (host === "youtu.be" && parts[0]) return yt(parts[0]);
  if (host.endsWith("youtube.com")) {
    const id = u.searchParams.get("v") || (["shorts", "embed", "live"].includes(parts[0]) && parts[1]);
    if (id) return yt(id);
  }

  // Vimeo: vimeo.com/123456  or  vimeo.com/123456/abcdef (private hash)
  if (host === "vimeo.com" && /^\d+$/.test(parts[0] || "")) {
    const hash = parts[1] ? `?h=${parts[1]}` : "";
    return { kind: "video", icon: "🎬", label: "Vimeo", embed: `https://player.vimeo.com/video/${parts[0]}${hash}` };
  }
  if (host === "player.vimeo.com") return { kind: "video", icon: "🎬", label: "Vimeo", embed: u.href };

  // Loom: loom.com/share/ID
  if (host === "loom.com" && (parts[0] === "share" || parts[0] === "embed") && parts[1]) {
    return { kind: "video", icon: "🎥", label: "Loom", embed: `https://www.loom.com/embed/${parts[1]}` };
  }

  // Scratch: scratch.mit.edu/projects/ID
  if (host === "scratch.mit.edu" && parts[0] === "projects" && /^\d+$/.test(parts[1] || "")) {
    return { kind: "game", icon: "🐱", label: "Scratch", embed: `https://scratch.mit.edu/projects/${parts[1]}/embed`, game: true };
  }

  // GitHub repo: github.com/owner/repo
  if (host === "github.com" && parts.length >= 2) {
    return { kind: "code", icon: "💻", label: "GitHub", repo: `${parts[0]}/${parts[1].replace(/\.git$/, "")}` };
  }
  if (host === "github.com") return { kind: "code", icon: "💻", label: "GitHub" };

  // Chat rooms
  const chats = {
    "discord.gg": "Discord", "discord.com": "Discord", "slack.com": "Slack",
    "zoom.us": "Zoom", "meet.google.com": "Google Meet", "teams.microsoft.com": "Teams",
    "chat.whatsapp.com": "WhatsApp", "t.me": "Telegram",
  };
  for (const [domain, name] of Object.entries(chats)) {
    if (host === domain || host.endsWith("." + domain)) return { kind: "chat", icon: "💬", label: name };
  }

  // Pictures
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(u.pathname)) return { kind: "picture", icon: "🖼️", label: "Picture" };

  return { kind: "link", icon: "🔗", label: host };
}

function yt(id) {
  return {
    kind: "video", icon: "🎬", label: "YouTube",
    embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
    thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

/* Friendly names for the filter chips */
const KIND_NAMES = {
  video: "🎬 Videos", game: "🐱 Games", code: "💻 Code",
  chat: "💬 Chat", picture: "🖼️ Pictures", link: "🔗 Links",
};

/* ---------- 3. Build one card ---------- */
function makeCard(item, index) {
  const info = detect(item.url);
  const title = item.title || info.label || item.url;
  let media = null;

  if (info.thumb) {
    // YouTube: show a picture first, load the real player only when clicked (faster page!)
    media = el("button", {
      class: "media poster", "aria-label": `Play ${title}`,
      onclick: (e) => e.currentTarget.replaceWith(frame(info.embed, title)),
    }, el("img", { src: info.thumb, alt: "", loading: "lazy" }), el("span", { class: "play" }, "▶"));
  } else if (info.embed) {
    media = frame(info.embed, title, info.game);
  } else if (info.kind === "picture") {
    media = el("img", { class: "media pic", src: item.url, alt: title, loading: "lazy" });
  }

  const repoBox = info.repo ? el("div", { class: "repo", "data-repo": info.repo }, "📦 ", info.repo) : null;

  const card = el("article", {
    class: `card kind-${info.kind}${media ? " has-media" : ""}`,
    "data-kind": info.kind,
    style: `--tilt:${((index * 37) % 5) - 2}deg`,
  },
    media,
    el("div", { class: "card-body" },
      el("span", { class: "badge" }, info.icon, " ", info.label || info.kind),
      el("h3", {}, title),
      item.note ? el("p", {}, item.note) : null,
      repoBox,
      el("a", { class: "go", href: item.url, target: "_blank", rel: "noopener" },
        info.kind === "chat" ? "Join →" : info.kind === "code" ? "See code →" : "Open →"),
    ),
  );

  if (info.repo) fillRepo(repoBox, info.repo);
  return card;
}

function frame(src, title, isGame) {
  return el("div", { class: `media frame${isGame ? " game" : ""}` },
    el("iframe", {
      src, title, loading: "lazy", allowfullscreen: "",
      allow: "autoplay; fullscreen; picture-in-picture; encrypted-media",
    }));
}

/* Ask GitHub for the repo's description and stars (no key needed) */
async function fillRepo(box, repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) return;
    const r = await res.json();
    box.replaceChildren(...[
      el("span", {}, "⭐ ", r.stargazers_count),
      r.language && el("span", {}, "🧩 ", r.language),
      r.description && el("span", { class: "desc" }, r.description),
    ].filter(Boolean));
  } catch { /* offline? that's fine, keep the simple version */ }
}

/* ---------- 4. Build the whole page ---------- */
function build() {
  // Header
  const avatar = document.getElementById("avatar");
  if (/[./]/.test(data.avatar || "")) avatar.replaceChildren(el("img", { src: data.avatar, alt: data.name }));
  else avatar.textContent = data.avatar || "🙂";
  document.getElementById("name").textContent = data.name || "My Page";
  document.getElementById("tagline").textContent = data.tagline || "";
  document.title = `${data.name || "My"} · Corner of the Internet`;

  document.getElementById("facts").replaceChildren(
    ...(data.facts || []).map((f, i) => el("li", { style: `--tilt:${(i % 2 ? 2 : -2)}deg` }, f)));
  document.getElementById("buttons").replaceChildren(
    ...(data.buttons || []).map((b) => el("a", { class: "btn", href: b.url, target: "_blank", rel: "noopener" }, b.label)));

  // Shelves: group items by their "shelf" name, keeping the order you wrote them
  const shelves = new Map();
  (data.stuff || []).forEach((item, i) => {
    const name = item.shelf || "⭐ My stuff";
    if (!shelves.has(name)) shelves.set(name, []);
    shelves.get(name).push(makeCard(item, i));
  });
  document.getElementById("shelves").replaceChildren(
    ...[...shelves].map(([name, cards]) =>
      el("section", { class: "shelf" }, el("h2", {}, name), el("div", { class: "grid" }, cards))));

  // Filter chips — only for kinds that actually appear
  const kinds = [...new Set([...document.querySelectorAll(".card")].map((c) => c.dataset.kind))];
  const chips = ["all", ...kinds].map((k) =>
    el("button", { class: "chip", "data-kind": k, "aria-pressed": k === "all" ? "true" : "false", onclick: () => filter(k) },
      k === "all" ? "✨ Everything" : KIND_NAMES[k]));
  document.getElementById("filters").replaceChildren(...(kinds.length > 1 ? chips : []));
}

function filter(kind) {
  document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.kind === kind)));
  document.querySelectorAll(".card").forEach((c) => { c.hidden = kind !== "all" && c.dataset.kind !== kind; });
  document.querySelectorAll(".shelf").forEach((s) => { s.hidden = !s.querySelector(".card:not([hidden])"); });
}

/* ---------- 5. Themes ---------- */
function setTheme(name) {
  document.documentElement.dataset.theme = name;
  document.querySelectorAll(".theme-dot").forEach((d) => d.setAttribute("aria-pressed", String(d.dataset.t === name)));
  try { localStorage.setItem("theme", name); } catch {}
}
function buildThemes() {
  document.getElementById("themes").replaceChildren(...THEMES.map((t) =>
    el("button", { class: "theme-dot", "data-t": t, title: `${t} theme`, "aria-label": `${t} theme`, onclick: () => setTheme(t) })));
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}
  setTheme(THEMES.includes(saved) ? saved : (THEMES.includes(data.theme) ? data.theme : "space"));
}

/* ---------- 6. X-ray mode: shows the name of every HTML box ---------- */
document.getElementById("xray").addEventListener("click", (e) => {
  const on = document.body.classList.toggle("xray");
  e.currentTarget.setAttribute("aria-pressed", String(on));
  if (on) document.querySelectorAll("body *").forEach((n) => n.setAttribute("data-tag", n.tagName.toLowerCase()));
});

buildThemes();
build();
