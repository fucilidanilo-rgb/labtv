
import { mkdirSync, writeFileSync } from "node:fs";

const tmdbApiKey = process.env.TMDB_API_KEY;
const springBootUrl =
  process.env.SPRING_BOOT_URL ||
  "https://labtv-backend.onrender.com/api";

if (!tmdbApiKey) {
  throw new Error("Manca la variabile TMDB_API_KEY");
}

const content = `export const environment = {
  production: true,
  tmdbApiKey: ${JSON.stringify(tmdbApiKey)},
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  imagesBaseUrl: 'https://image.tmdb.org/t/p/w500',
  springBootUrl: ${JSON.stringify(springBootUrl)}
};
`;

mkdirSync("src/environments", { recursive: true });

writeFileSync(
  "src/environments/environment.production.ts",
  content
);

console.log("Configurazione Angular production generata.");
