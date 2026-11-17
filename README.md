# Thread & Co.

A quiet, single-page clothing storefront. It is a static starter: a hero, six pieces, an about section, and a contact form. There is no backend, no payment processing, and no build step, so the folder can be hosted on GitHub Pages as-is.

## Files

```
.
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── photos/           Lifestyle photographs (WebP, 4:5) and CREDITS.md
│   ├── tee.svg           Earlier illustration, not used on the page
│   ├── hoodie.svg
│   ├── denim-jacket.svg
│   ├── chinos.svg
│   ├── sneakers.svg
│   ├── beanie.svg
│   └── favicon.svg
├── screenshots/
│   ├── desktop.png    Full page at 1280px wide
│   └── mobile.png     Full page at 390px wide
└── README.md
```

## How to open it

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

No install or compile step is required. Typography uses Google Fonts (Cormorant Garamond for headlines, Outfit for text). Offline, the page falls back to a system serif and sans. Product and hero photographs are local WebP files, so the shop works without a network. Sources and the Pexels License are listed in `assets/photos/CREDITS.md`.

## What the page does

- The header links to Shop, About, and Contact. On small screens a button opens the menu; Escape, a link, or the button closes it.
- “Add to cart” confirms with a short toast and a brief “Added” label. There is no cart or checkout.
- The contact form checks the name, email, and message in the browser, then shows a thank-you note. Nothing is sent or stored.
- The footer states that this is a frontend starter.

## Customize it

- **Name:** “Thread & Co.” appears in the header, footer, and document title.
- **Color:** edit the variables at the top of `css/styles.css`. The palette is ivory, charcoal, and rust.
- **Type:** the Google Fonts link is in `index.html`. Families are also set on `--font-serif` and `--font-sans`.
- **Pieces:** edit the six product cards in `index.html`. Photographs live in `assets/photos/` at a 4:5 ratio (1280×1600). Update the name, price, description, and `alt` text together, and add any new photo to `assets/photos/CREDITS.md`.
- **Copy:** the hero, about story, and contact details are the brand text. The footer disclaimer should stay if the page is still only a frontend.

Motion is limited to a short hero entrance, hover on product images, and the menu and toast. It is skipped when the visitor has `prefers-reduced-motion` set.
