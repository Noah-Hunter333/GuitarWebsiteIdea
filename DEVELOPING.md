# Developing the Guitarist site

How to run this site, change it, and not break it.

---

## Contents

1. [Start here](#1-start-here)
2. [What each file does](#2-what-each-file-does)
3. [Your daily loop](#3-your-daily-loop)
4. [Where to change things](#4-where-to-change-things)
5. [Common tasks](#5-common-tasks)
6. [House rules](#6-house-rules)
7. [Problems and fixes](#7-problems-and-fixes)
8. [Publishing](#8-publishing)

---

## 1. Start here

**Install:**

- VS Code
- Node.js (gives you `npx`, used for Sass)
- The **Live Server** extension

**Then:**

1. Open the `GuitarWebsiteIdea` folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server**.

   The site opens at `http://127.0.0.1:5500` or similar.

3. Open a terminal in this folder and start the Sass watcher:

   ```bash
   npx sass --watch main.scss main.css
   ```

4. Leave that terminal running. Save a `.scss` file and `main.css` updates by itself.

**Important:** always view the site through Live Server, not by double-clicking `index.html`.

`main.js` is an ES module. Browsers refuse to load those from `file://`.

**No terminal?** Install the **Live Sass Compiler** extension instead.
Then click **Watch Sass** in the status bar. It does the same job.

---

## 2. What each file does

```text
GuitarWebsiteIdea/
├─ index.html      the page markup
├─ main.scss       layout and section styles (you will mostly edit this)
├─ _colors.scss    every color and gradient
├─ _settings.scss  spacing, sizes, radius, shadows, speed, breakpoints
├─ _mixins.scss    reusable patterns (card, image frame, hover, grid)
├─ main.css        generated - do not edit
├─ main.css.map    lets DevTools show you the .scss line
├─ main.js         back-to-top button + active nav link
└─ imgs/           photos and logos
```

The `.scss` files are the real source.

`main.css` is built from them. Every compile overwrites it, so edits made there are lost.

---

## 3. Your daily loop

1. Change a token in `_colors.scss` or `_settings.scss`, or a rule in `main.scss`.
2. Save the file.
3. The watcher rewrites `main.css`.
4. Refresh the browser. Use **Ctrl + Shift + R** if you still see the old look.
5. Right-click anything in DevTools to see which `.scss` line styled it.

> Rule: never fix styles by editing `main.css`.

---

## 4. Where to change things

### Colors

Edit `_colors.scss`.

| Change | Token |
| --- | --- |
| Gold accent (titles, buttons, hovers) | `$gold-color` |
| Page background | `$black-color` |
| Alternate section background | `$dark-color` |
| Card and panel fill | `$Card-c` |
| Hero image darkening | `$HeroOverlay-c` |
| Card border tint | `$card-border` |

### Spacing and sizes

Edit `_settings.scss`.

| Change | Token |
| --- | --- |
| Space above and below sections | `$section-pad` |
| Gaps, margins, card padding | `$space-xs` to `$space-lg` |
| Page width | `$container-max` |
| Side padding | `$container-pad` |
| Corner roundness | `$radius`, `$radius-sm` |
| Border thickness | `$border-size`, `$border-thin` |
| Shadow depth | `$shadow` |
| Animation speed | `$speed` |
| Hover strength | `$pop-scale`, `$card-pop`, `$rise-distance` |
| Heading sizes | `$title-size`, `$hero-title-size`, `$card-title-size` |
| Where layouts break | `$bp-md`, `$bp-sm` |
| Narrowest card before a column drops | `$card-min` |

### Shared looks

Edit `_mixins.scss`.

| Change | Mixin |
| --- | --- |
| Every dark panel (cards, quote, links) | `card-surface` |
| Photo borders and shadow | `framed-image` |
| Scale-up on hover | `hover-pop` |
| Column count and gaps | `card-grid` |

### One specific section

Edit `main.scss`. It is split into commented blocks in the same order as `index.html`.

**Two shortcuts:**

- Same value written twice? Make it a token.
- Same group of properties written twice? Make it a mixin.

---

## 5. Common tasks

### Add a passion card

1. Copy one whole `.passion-card` block in `index.html`.
2. Change the icon, heading, and text.

No CSS needed. The grid fits as many columns as it can, so a fourth card flows in on its own.

The same works for `.gallery-item` and `.link-card`.

### Add a section

```html
<section id="lessons" class="lessons-section">
  <div class="container">
    <h2 class="section-title">Lessons</h2>
    <!-- content -->
  </div>
</section>
```

Then add a block to `main.scss`, in the same order as the page:

```scss
//lessons
.lessons-section {
  background-color: $dark-color;
}
```

`.container` handles the width. The `section` rule already adds the vertical padding.

### Add a nav link

1. Add the link next to the other nav items: `<a href="#lessons">Lessons</a>`.
2. Give the matching section `id="lessons"`.

The href and the id must match exactly.
That makes the scroll work. It is also what `main.js` uses to highlight the
active link in gold.

### Change the hero photo

1. Put your image in `imgs/`.
2. Update the path in `.hero`'s `background-image`.

To adjust the darkness, edit `$HeroOverlay-c`.
The second `rgba()` value controls the bottom of the fade.

### Add a gallery photo

1. Put the image in `imgs/`.
2. Point an existing `<img src="...">` at it, or copy a whole `.gallery-item` block.

Photos are `220px` tall with `object-fit: cover`, so any shape works.

For logos and illustrations, also add the `gallery-placeholder` class.
That way they shrink instead of cropping.

### Add JavaScript

Write one small function, then call it from the listeners at the bottom of `main.js`:

```js
//toggle a card open when it is clicked
function toggleCard(event) {
  event.currentTarget.classList.toggle("open");
}

document.querySelectorAll(".passion-card").forEach((card) => {
  card.addEventListener("click", toggleCard);
});
```

Keep each function to one job. Small functions are easy to remove later.

### Re-theme the site

Change `$gold-color` in `_colors.scss`.

Nav hovers, titles, buttons, the quote bar, link hover borders, and the
back-to-top button all follow. They all read that one token.

If you change `$Card-c` or `$HeroOverlay-c`, keep the `rgba()` alpha values.
Otherwise the panels lose their glassy look.

---

## 6. House rules

- **Indent with two spaces.** Match the file you are editing.
- **Keep section comments.** `//hero`, `//gallery`, and so on. Keep the blocks in page order.
- **Gradients end in `-c`.** `$Card-c`, `$HeroOverlay-c`. It is obvious at a glance.
- **No hardcoded colors in `main.scss`.** Add a token to `_colors.scss` instead.
- **Nest only for children.** `.passion-card h3` and `&:hover` are fine.
  Deep nesting makes overrides painful.
- **Use `rem` for sizes.** Use `px` only for hairline borders, like the existing rules.

### Optional: make the compile a script

```bash
npm init -y
npm install --save-dev sass
```

Add to `package.json`:

```json
"scripts": {
  "build:css": "sass main.scss main.css",
  "watch:css": "sass --watch main.scss main.css"
}
```

Now run `npm run watch:css`.

Add `node_modules/` to `.gitignore` if you do this.

---

## 7. Problems and fixes

### Styles change but the page looks the same

The watcher is not running, or the browser cached the old CSS.

Start `npx sass --watch main.scss main.css`, then hard-refresh with **Ctrl + Shift + R**.

### The back-to-top button never appears

The page is open as a `file://` path.

Serve it with Live Server instead.

### Cards show two across instead of three

The container is too narrow for three cards plus the gaps.

Lower `$card-min`, or widen `$container-max`, or reduce `$container-pad`.

### A gallery image is cropped oddly

`object-fit: cover` is cropping it.

Add the `gallery-placeholder` class for logos and illustrations.

### The page is blank

Sass hit an error, so `main.css` was not rewritten.

Check the watcher terminal for the error and the line number.

### A warning about `@import` on every compile

That is expected. Dart Sass is moving to `@use`.

The build still works.
Migrate later by replacing each `@import` with `@use "_colors.scss" as *;`
and so on.

---

## 8. Publishing

This folder is its own git repository, so GitHub Pages can host it as-is.

1. Commit and push your work.
2. On GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, then `main` and `/ (root)`.
4. The site appears at `https://<user>.github.io/<repo>/`.

No build on the server. `main.css` is committed next to the sources.
