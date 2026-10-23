/**
 * The game library.
 *
 * To add a game, add one object to GAMES. It will appear on the home page and
 * get its own player at /play/<slug>/ automatically. The slug is derived from
 * `name` ("The Big War" → /play/the-big-war/).
 *
 * - `icon`  square-ish image in /public, e.g. /games/my-game.svg
 * - `link`  the URL of the deployed game, loaded in an iframe
 */
export interface Game {
  name: string;
  icon: string;
  link: string;
}

export const GAMES: Game[] = [
  {
    name: 'The Big War',
    icon: '/games/the-big-war.svg',
    link: 'https://the-big-war.weluvsnakes.com',
  },
];
