/* =====================================================================
   ✏️  MY STUFF  —  this is the ONLY file you need to edit!
   =====================================================================

   How it works:
   - Change the words inside the quotes "like this".
   - To add something new, copy one { ... } block in "stuff",
     paste it right below, and change the url.
   - Don't forget the comma , between blocks!
   - Save the file, then refresh the page in your browser.

   Paste ANY of these links and the page figures out what it is:
     🎬 YouTube   https://www.youtube.com/watch?v=XXXX  or  https://youtu.be/XXXX
     🎬 Vimeo     https://vimeo.com/123456
     🎥 Loom      https://www.loom.com/share/abc123...
     🐱 Scratch   https://scratch.mit.edu/projects/123456
     💻 GitHub    https://github.com/someone/some-repo
     💬 Chat      Discord / Slack / Zoom / Google Meet / Teams links
     🖼️ Pictures  any link ending in .png .jpg .gif .webp
     🔗 Anything else becomes a link card.
   ===================================================================== */

window.MY_STUFF = {

  // ---------- About me ----------
  name: "Your Name",
  avatar: "🦊",                 // an emoji, OR a picture link like "images/me.png"
  tagline: "I build games, make videos, and learn to code.",
  theme: "space",               // try: "space", "candy", "jungle", "paper"

  // Little facts that show up as stickers. Add as many as you like!
  facts: [
    "🎂 Age: 10",
    "🎮 Favorite game: Minecraft",
    "🍕 Favorite food: Pizza",
    "🚀 Dream job: Astronaut coder",
  ],

  // Buttons at the top (optional). Delete this list if you don't want them.
  buttons: [
    { label: "My GitHub", url: "https://github.com/samduan-94me" },
    { label: "Learn HTML", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
  ],

  // ---------- My stuff ----------
  // shelf: which group it goes in (make up any shelf name you want!)
  // title: the name shown on the card
  // note:  a short sentence about it (optional)
  // url:   the link — the page will decide how to show it
  stuff: [
    {
      shelf: "🎬 Videos",
      title: "The very first YouTube video",
      note: "Uploaded in 2005. Everything started here!",
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    },
    {
      shelf: "🎬 Videos",
      title: "A Vimeo video",
      note: "Vimeo links work too.",
      url: "https://vimeo.com/76979871",
    },
    // A Loom example — remove the two slashes // at the start of each line to turn it on:
    // {
    //   shelf: "🎬 Videos",
    //   title: "How I made my game",
    //   url: "https://www.loom.com/share/PASTE-YOUR-LOOM-ID-HERE",
    // },
    {
      shelf: "🐱 Games I made",
      title: "My Scratch game",
      note: "Click the green flag to play!",
      url: "https://scratch.mit.edu/projects/10128407",
    },
    {
      shelf: "💻 Code",
      title: "This website!",
      note: "The code for the page you are looking at right now.",
      url: "https://github.com/samduan-94me/home",
    },
    {
      shelf: "💬 Hang out",
      title: "Scratch Studio",
      note: "Where our club shares projects.",
      url: "https://scratch.mit.edu/studios/",
    },
    {
      shelf: "🔗 Cool links",
      title: "Learn web design (MDN)",
      note: "Where real web developers look things up.",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    },
  ],
};
