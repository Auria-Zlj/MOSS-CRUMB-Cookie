# Moss & Crumb

Website for **Moss & Crumb**, a cookie shop whose homepage changes with the season.

Each season the front page is re-themed around a limited run of cookies, the way a café rotates its seasonal menu. This repo has the current one: **Autumn 2026 · Season 03**, with four flavours that are only around until 20 December.

| Flavour | |
|---|---|
| Deep Cacao | dark chocolate, sea salt |
| Uji Dream | stone-ground matcha |
| Cloud Taro | purple taro, white chocolate |
| Sunny Lemon | lemon curd, fresh zest |

## The seasonal homepage

A cookie hangs above a paper-cut clover garden, with the season's cookies in a tray below it.

- **Tap the cookie** and it crumbles. A plant that belongs to that flavour grows in the garden: cocoa beans, tea buds, taro leaves, lemons.
- **Pick a flavour** from the tray to bring a different cookie in. A handwritten note on the right shows its name, a short description, its taste notes (rated in dots), and a Pre-order link.
- **Try all four flavours** and a Taster Box, one of each, appears at the corner of the garden. Its note replaces the flavour note.
- The season is shown as a timeline at the bottom left, with a marker for how much of it is left.

The page is drawn on a Canvas 2D element, and the whole layout scales to fit the window. Written for laptop and desktop screens; there is no phone layout yet. Pre-order is a stand-in: nothing is actually sold.

## Running it

The seasonal homepage is a single static file with no build step. From the repo root:

```bash
python3 -m http.server 5174
```

then open <http://127.0.0.1:5174/prototype/season.html>.

The repo also contains the Next.js app (React, Three.js) that holds the shop's original 3D cookie hero:

```bash
npm install
npm run dev
```

## What's where

- `prototype/season.html`: the seasonal homepage
- `prototype/moss.html`: the earlier grass version it grew out of
- `src/`: the Next.js app and its 3D cookie hero
- `public/image/`: cookie photos
