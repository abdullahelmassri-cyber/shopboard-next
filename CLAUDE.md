# ShopBoard UI rules

- Keep route files in `app/`; place reusable UI in `components/ui/` and
  domain-specific code in `features/` or `lib/`.
- Keep pages and layouts as Server Components unless browser interaction or
  browser APIs require a small Client Component.
- Use the semantic color, radius, and font tokens from `app/globals.css` with
  Tailwind utilities. Do not add raw colors or arbitrary-value classes to UI
  components, and keep `app/globals.css` as the only stylesheet.
- Reuse `Button`, `Input`, `Card`, `Badge`, and `Modal` for shared controls and
  content surfaces. Use `cn()` when composing overridable class names.
- Use semantic HTML, accessible names and labels, visible keyboard focus, and
  native elements such as `<dialog>` where they fit. Keep controlled UI state
  explicit and restore focus sensibly after dialogs close.
- Use `next/link` for internal navigation. Fetch and validate product data
  through the shared server-side data layer; do not fetch it in effects.
