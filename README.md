# Moss & Crumb: a seasonal homepage concept

**Moss & Crumb is a fictional cookie brand.** This repository is a design and interaction concept, not a real shop. Nothing is for sale, and the Pre-order buttons are stand-ins.

The concept explores one question:

> How can the homepage of a limited seasonal menu feel like the season itself, and explain its products without a wall of text?

The result is an interactive homepage for **Autumn 2026 · Season 03**, with four flavours: Deep Cacao, Uji Dream, Cloud Taro and Sunny Lemon.

## Concept

Cafés rotate seasonal menus, and the shop window changes with them. Moss & Crumb applies the same idea to a website: every season the homepage is re-themed around that season's limited run of cookies. Instead of a product grid, the page is a single small scene that visitors play with and learn from.

### How it works

- **A garden that grows from the cookie.** A cookie floats above a paper-cut clover garden. Tapping it makes it crumble, and a plant tied to that flavour grows where the crumbs land: cocoa beans, tea buds, taro leaves, lemons. Trying a flavour is how visitors discover it.
- **A tray of cookies.** Four cookies sit in a kraft tray. Picking one brings it into the garden, and its slot in the tray goes empty.
- **A handwritten note instead of a product card.** Each flavour has a taped sticky note with its name, a one-line description, taste notes rated in dots, and a Pre-order link.
- **A reward for exploring.** Once all four flavours have been tried, a Taster Box with one of each rises at the edge of the garden. Its orange tag says Pre-order, and the note switches to the box.
- **The season as a timeline.** A season list at the bottom left shows where we are, with a progress line and the days left.

## Design process

The concept was developed in short rounds of making, comparing and cutting. These are the main questions and what was decided.

| Question | Explored | Decision and reasoning |
|---|---|---|
| **What is the scene?** | A brushable moss patch with a dropping cookie; cushions drawn like crayon; rounded mounds; felt balls with bouncy physics | The first idea, the moss patch, felt the most alive. The later styles felt like effort rather than improvement, so the work went back to the first and refined it. |
| **What is the page for?** | A one-off product hero; a seasonal promotion | A **seasonal, limited-run homepage** that is re-themed each season. It gives the garden a reason to exist and gives the brand a rhythm. |
| **What should the garden look like?** | Several outlines, densities and layouts | **Clover clumps in a paper-cut style**, with a fixed, seeded layout so the picture is identical on every load. Its look was then locked, and later work did not touch it. |
| **How do we present a flavour?** | A menu card; plain editorial text; a handwritten note taped to the page | The **handwritten sticky note**. It's warm, reads as a person's voice, and suits a small-batch brand. |
| **How do we mark "seasonal"?** | A kraft tag; a green swallowtail pennant; a torn note; a ticket; a garden label stake; a round topper | A **green pennant planted on the cookie**. Its text became "Seasonal special", because "Limited edition" felt wrong for cookies that return each year. |
| **What is the reward at the end?** | A wooden sign; a note on a stick; a round badge; an open kraft box | An **open kraft box showing the four cookies**, later named the Taster Box. It rises only after the last cookie's crumbs have landed, so the surprise isn't spoiled. |
| **How do we show the deadline?** | Days left on the flag; a progress ring; an orange price tag; an hourglass; a sprig that loses a leaf per week; leaves turning orange | The date was repeated in several places and read as clutter. It now lives **once**, as a progress line on the current season at the bottom left, with an always-visible "days left" label. A version that only showed on hover was rejected, since nobody would hover. |
| **How do we rank the information on the note?** | Everything in one colour and typeface; ingredient lists; generic scales (Sweet, Rich, Fresh); texture scales (Sweet, Bitter, Tangy, Chewy) | A clear order: **name** in the flavour's own colour, then a neutral one-line description, then **taste notes** as dots, then Pre-order highlighted in the flavour colour. The dots work like the intensity scale on a coffee capsule box, and each flavour has its own words (Roasty, Grassy, Nutty, Zesty) rather than one generic scale. |
| **How do visitors know the cookie is tappable?** | A text hint with an arrow; a strong shake | The hint was too faint, and the shake was too violent. The final answer is a **gentle hop every few seconds** until the first tap, and **untried cookies bob in the tray**. There are no labels. |
| **One name per product** | Short names in the tray, full names on the note | **Full names everywhere.** |
| **How does the layout scale?** | Responsive rules per element | The page is a fixed **1920 × 1000 design stage scaled as a whole** to the window, so every screen shows the same composition. It was checked on common laptop sizes and on high-DPI screens. |

## Principles

- **Show, don't tell.** Learning happens through touch, not paragraphs.
- **Say each thing once, in the right place.** The deadline, the name and the action each have a single home.
- **Colour carries meaning.** Each flavour has one colour. The action gets one highlight. Everything else stays quiet.
- **Hints should be felt, not read.** Motion invites a tap; text is a last resort.
- **Small, hand-made details.** Paper edges, tape, handwriting and slight tilts keep the page human.

## Accessibility

Key text uses a higher contrast. Taste dots carry text labels for screen readers, and changes of flavour are announced. The cookie and the box are reachable and operable by keyboard. Animation is reduced when the system asks for it.

## Running it

The concept is a single static file with no build step. From the repository root:

```bash
python3 -m http.server 5174
```

Then open <http://127.0.0.1:5174/prototype/season.html>.

It is drawn on a Canvas 2D element, and it is designed for laptop and desktop screens.

## Repository

- `prototype/season.html`: the seasonal homepage concept
- `prototype/moss.html`: the earlier moss-patch version it grew out of
- `src/`, `public/`: an earlier Next.js experiment with a 3D cookie hero, plus the cookie images (`npm install && npm run dev`)

## Status

A finished concept for laptop and desktop. Not covered: a phone layout, and a real shop behind the Pre-order buttons. The taste-note values are placeholders.
