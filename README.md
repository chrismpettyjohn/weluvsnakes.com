# weluvsnakes.com

The WeLuvSnakes studio site and game launcher. Static [Astro](https://astro.build) site with one
stylesheet and a small script per page. Every game is playable in an iframe at `/play/<slug>/`.

## Develop

```sh
bun install
bun dev           # local dev server
bun run build     # static site into dist/
bun run preview   # serve the built site
bun run check     # Astro + TypeScript diagnostics
```

## Add a game

Add one object to `GAMES` in [`src/config.ts`](src/config.ts):

```ts
export const GAMES: Game[] = [
  {
    name: 'The Big War',
    icon: '/games/the-big-war.svg',
    link: 'https://the-big-war.weluvsnakes.com',
  },
];
```

That is the whole change. The game shows up on the home page and gets a player at
`/play/the-big-war/` — the slug is derived from `name`.

- `name` — shown on the card and in the player bar. It also becomes the URL, so keep it stable.
- `icon` — a square-ish image in `public/`. SVGs and PNGs both work.
- `link` — the deployed game URL. It is loaded in the iframe.

Two games with the same name would collide, so the build fails loudly if that happens.

### Iframe requirements

The game's server must allow the site to frame it:

- Serve the game over HTTPS.
- Do not send `X-Frame-Options: DENY` or `SAMEORIGIN` for the game origin.
- If the game uses `Content-Security-Policy`, include `frame-ancestors https://weluvsnakes.com`.

Every player also has an "Open in new tab" link, so a game that refuses framing is still reachable.

## Where things live

- `src/config.ts` — the game library (`GAMES`)
- `src/site.ts` — studio name, description, and links
- `src/lib/games.ts` — derives URL slugs from game names and validates the list
- `src/layouts/Base.astro` — site shell (header, footer) and the full-screen player mode
- `src/pages/index.astro` — hero, game library, about
- `src/pages/play/[slug].astro` — the iframe player with fullscreen support
- `src/styles/global.css` — all styling; colours follow the system light/dark setting
- `public/` — brand images, game icons, favicon, and OG image, served as-is

## Deploy

`bun run build` emits a static site in `dist/`. Deploy that directory to any static host; the only
requirement is that `weluvsnakes.com` serves it over HTTPS so the games can be framed.
