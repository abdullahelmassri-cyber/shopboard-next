# ShopBoard

ShopBoard is a Next.js App Router storefront for bags, shoes, and accessories.
It uses server-fetched product data, a browser-persistent cart, a reusable
Tailwind UI kit, and an interactive light/dark theme.

## Requirements

- Node.js 20.9 or newer
- npm

## Install and run

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run build
npm run start
```

`npm run start` serves the most recent production build.

## Routes and features

- `/` — editorial storefront home page and product collection link.
- `/products` — product collection with category, price, stock status, and
  add-to-cart actions.
- `/products/[id]` — product detail, stock state, and add-to-cart action.
  Invalid IDs and products missing from the collection use the not-found page.
- `/cart` — persistent cart with quantity controls, removal, subtotal, and a
  confirmation dialog before clearing all items.
- `/checkout` — order summary and validated demo checkout form. An empty cart
  cannot be checked out. Saved IDs missing from the current product response
  are listed and must be removed from the cart before checkout can continue.

Checkout accepts a name, email address, and address. A successful submission
clears the cart and displays a thank-you message. This is a demo: no real order
or payment is created, and form data is not sent to an API or saved in browser
storage.

## Product API

The shared API client requests
`https://shopboard-api.vercel.app/api/products` on the server with caching
disabled. The product adapter validates the response shape and every product
before exposing the product data to pages. Product details are selected by ID
from this validated collection; no individual-product endpoint is assumed.
Product image URLs are mapped locally, with a placeholder used when an image is
missing or fails to load.

## Cart and theme persistence

Cart item IDs and quantities are stored in browser `localStorage` under
`shopboard-cart`. Saved values are validated before use; invalid or unreadable
data safely becomes an empty cart. The initial server snapshot is empty, and
the browser reads saved data after hydration to avoid a server/client markup
mismatch. When a saved product ID is absent from the API response, the cart
shows it as unavailable and excludes it from totals.

The selected theme is stored under `shopboard-theme`. If there is no saved
choice, the storefront follows the operating system preference. Storage access
failures leave the app usable for the current session.

## UI conventions

Shared `Button`, `Input`, `Card`, `Badge`, and native-dialog `Modal` components
live in `components/ui/`. Semantic color, radius, and font tokens are defined
in `app/globals.css`; Tailwind is used for component layout and styling.
Project conventions are documented in `CLAUDE.md`, and the installed Next.js
agent guidance is in `AGENTS.md`.
