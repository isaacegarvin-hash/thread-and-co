# Thread & Co. — starter clothing website

A clean, modern frontend template for a simple clothing store. It is a single static page with a hero, a six-item product grid, an about section, and a contact form. There is no backend, no payment processing, and no build step.

## Files

```
clothes-site/
├── index.html          Single-page site (nav, hero, shop, about, contact, footer)
├── css/styles.css      Layout, typography, and responsive styles
├── js/main.js          Mobile menu, add-to-cart toast, contact form thank-you
├── assets/             Local SVG product placeholders (works offline)
│   ├── tee.svg
│   ├── hoodie.svg
│   ├── denim-jacket.svg
│   ├── chinos.svg
│   ├── sneakers.svg
│   └── beanie.svg
├── screenshots/        Desktop (1280px) and mobile (390px) captures
└── README.md
```

## How to open it

- **In a browser:** open `index.html` directly, or from a terminal run:

  ```bash
  # from this folder
  python3 -m http.server 8000
  ```

  Then visit [http://localhost:8000](http://localhost:8000).

- **In Cursor:** File → Open Folder… and choose this `clothes-site` directory. Open `index.html`, then use a simple preview (Live Preview, the built-in simple browser, or “Open in Browser”). Because the site is plain HTML, CSS, and JavaScript, no install or compile step is required.

Typography uses Google Fonts (Cormorant Garamond and Outfit). If you are offline, the page still works and falls back to a system serif/sans stack. Product images are local SVGs, so the grid works without a network.

## What the JavaScript does

- Toggles a hamburger menu on small screens (`aria-expanded`, Escape and link clicks close it).
- “Add to cart” shows a short toast. There is no real cart or checkout.
- The contact form only validates on the client and then shows a thank-you message. Nothing is submitted or stored.

## Customize it

- **Brand name:** change “Thread & Co.” in `index.html` (header, about copy, footer) and the `<title>`.
- **Colors:** edit the CSS variables at the top of `css/styles.css` (`--bg`, `--ink`, `--accent`, and related tokens).
- **Products:** edit the six `<li class="product-card">` blocks in `index.html`. Swap `assets/*.svg` for your own photos (keep a 4:5 aspect ratio if you can). Update names, prices, and `alt` text.
- **Copy:** replace the hero headline, about story, and contact details.
- **Fonts:** the Google Fonts `<link>` is in `index.html`. Change the family there and in `--font-sans` / `--font-serif`.

When you are ready for a real store, add a cart, inventory, and a payment provider separately. This template is only the frontend showcase.
