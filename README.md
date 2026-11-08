# Moss & Crumb

A design concept for the homepage of a seasonal cookie shop. The homepage changes with each season's menu, so instead of a product grid it's a small garden you can play with.

![Moss & Crumb homepage](docs/preview.jpg)

Tap the cookie and it crumbles. A plant grows where the crumbs land, a different one for each flavour. Try all four and a taster box appears.

This version is Autumn 2026: Deep Cacao, Uji Dream, Cloud Taro and Sunny Lemon.

Some choices I made along the way:

- You learn about a flavour by trying it, not by reading about it.
- The deadline shows up once, as a progress line at the bottom left.
- There's no "tap me" label. The cookie hops now and then, and the ones you haven't tried bob in the tray.
- Each flavour gets its own colour. Everything else stays brown.

## Run it

The page is one static file. From the repo root:

```bash
python3 -m http.server 5174
```

Then open <http://127.0.0.1:5174/prototype/season.html>. It works best on a laptop or desktop.
