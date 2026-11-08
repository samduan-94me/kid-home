# ⭐ My Corner of the Internet

A profile page made from plain HTML, CSS and JavaScript. No build tools, no installs, free to host on GitHub Pages.

## 🗂️ What's in here

| File | What it does | Should I edit it? |
|---|---|---|
| `my-stuff.js` | Your name, emoji, facts and **all your links** | ✅ Start here! |
| `style.css` | Colors, fonts, sizes, themes | 🎨 Level 2 |
| `index.html` | The boxes that make up the page | 🧱 Level 3 |
| `app.js` | The "robot" that turns links into cards | 🤖 Level 4 |

## ✏️ Add something to your page

Open `my-stuff.js`, copy one block and change it:

```js
{
  shelf: "🐱 Games I made",
  title: "Space Dodge",
  note: "Use arrow keys to dodge the asteroids!",
  url: "https://scratch.mit.edu/projects/123456789",
},
```

Paste any of these and the page knows what to do:

| Link | Shows up as |
|---|---|
| YouTube (`youtube.com/watch?v=…`, `youtu.be/…`, `/shorts/…`) | Video with a play button |
| Vimeo (`vimeo.com/123456`) | Video player |
| Loom (`loom.com/share/…`) | Video player |
| Scratch (`scratch.mit.edu/projects/…`) | Playable game |
| GitHub (`github.com/name/repo`) | Code card with ⭐ stars and language |
| Discord, Slack, Zoom, Meet, Teams, WhatsApp, Telegram | Chat card with a "Join" button |
| Pictures (`.png .jpg .gif .webp .svg`) | The picture |
| Anything else | A link card |

> 💡 **Scratch tip:** your project must be **Shared** on Scratch, or it won't play.
> 💡 **Video tip:** the video must be public or "unlisted".

## 👀 See your changes

Easiest: double-click `index.html` to open it in your browser. Save, then refresh.

(Scratch and some videos like a real web address better. If something won't play, run `python -m http.server` in this folder and open http://localhost:8000.)

## 🔍 X-ray mode

Click **🔍 X-ray** on the page to see every HTML box and its tag name, like `<h1>`, `<article>` or `<button>`. Then find the same tags in `index.html` and `app.js`.

## 🎨 Make your own theme

In `style.css`, copy the whole `[data-theme="candy"] { … }` block, rename it (for example `ocean`), and change the colors. Then:

1. Add `"ocean"` to the `THEMES` list at the top of `app.js`
2. Add a color dot for it in `style.css`: `.theme-dot[data-t="ocean"] { background: teal; }`
3. Set `theme: "ocean"` in `my-stuff.js`

## 🚀 Put it on the internet (free)

1. Push these files to the `main` branch of a GitHub repo.
2. On GitHub, go to **Settings → Pages**.
3. Under **Source**, pick **Deploy from a branch**, then **main** and **/ (root)**, and click **Save**.
4. About a minute later the page is live at `https://<username>.github.io/<repo>/`.

**Using your own domain (like 94me):** under **Settings → Pages → Custom domain**, type the domain and save. GitHub adds a `CNAME` file for you. Then, at the place where you bought the domain, add a DNS record:
- for a subdomain like `home.example.com`: a `CNAME` record pointing to `<username>.github.io`
- for the bare domain: `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

Once DNS works, tick **Enforce HTTPS**.

## 👧🧒 Give each kid their own site (like `kida.94me.fyi`)

1. **Copy this repo.** On GitHub, click **Use this template → Create a new repository** (or **Fork**). Name it after the kid, for example `kida`.
2. **Add a `CNAME` file** at the root of the new repo. It holds one line: `kida.94me.fyi`
3. **Turn on Pages** in the new repo: **Settings → Pages → Deploy from a branch → main → / (root)**.
4. **Add a DNS record** for `94me.fyi` at the domain registrar: type `CNAME`, name `kida`, value `samduan-94me.github.io`.
5. Once the certificate is ready, tick **Enforce HTTPS** in Pages settings.
6. **List it on the hub:** add one line to `sites.js` in the [home](https://github.com/samduan-94me/home) repo.

## 🧪 Challenges for learners

1. ⭐ Change the emoji, name and facts.
2. ⭐ Add your own YouTube or Scratch link.
3. ⭐⭐ Make a new shelf called "📚 Books I love".
4. ⭐⭐ Change `--accent` in a theme and watch every button change color.
5. ⭐⭐⭐ Make your own theme (see above).
6. ⭐⭐⭐ In `style.css`, make the cards tilt more when you hover over them.
7. ⭐⭐⭐⭐ In `app.js`, teach `detect()` a new kind of link (a CodePen or a Google Slides embed?).
