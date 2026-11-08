# Moss & Crumb

A small playground: a seasonal-cookie homepage drawn on a single Canvas 2D page.
Autumn 2026 · Season 03 · four flavours (Deep Cacao, Uji Dream, Cloud Taro, Sunny Lemon).

It's a concept piece. Nothing is sold, and the taste-note dots on the cards are placeholders.

## What to try

- Tap the cookie. It crumbles and a little plant grows in the clover garden.
- Pick another flavour from the tray at the bottom; each one grows its own plant.
- Try all four, and a Taster Box rises at the garden's corner. Click it (or its Pre-order tag) to "pre-order".
- The line at the bottom left shows how much of the season is left.

## Run it

The page is one static file, no build step. From the repo root:

```bash
python3 -m http.server 5174
```

Then open <http://127.0.0.1:5174/prototype/season.html>.

The repo also holds the original Next.js app (`npm install && npm run dev`); the prototype is separate from it.

## Files

- `prototype/season.html` – the page (canvas garden, note card, tray, box)
- `prototype/moss.html` – the earlier base version
- `public/image/` – cookie photos
- `src/` – the Next.js app

Made for laptop and desktop screens; there is no phone layout.
