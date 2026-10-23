import { GAMES, type Game } from '../config';

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface LibraryGame extends Game {
  slug: string;
}

/** All games, each with the slug used by its /play/ route. */
export const games: LibraryGame[] = GAMES.map((game) => ({
  ...game,
  slug: slugify(game.name),
}));

// Catch configuration mistakes at build time rather than shipping dead links.
const seen = new Set<string>();
for (const game of games) {
  if (!game.slug) {
    throw new Error(`Game "${game.name}" needs a name containing letters or numbers.`);
  }
  if (seen.has(game.slug)) {
    throw new Error(`Two games resolve to /play/${game.slug}/. Give them different names.`);
  }
  seen.add(game.slug);
}

export function getGame(slug: string): LibraryGame | undefined {
  return games.find((game) => game.slug === slug);
}
