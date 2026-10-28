
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const tmdbApiKey = process.env.TMDB_API_KEY;
const springBootUrl =
  process.env.SPRING_BOOT_URL ||
  "https://labtv-backend.onrender.com/api";

if (!tmdbApiKey) {
  throw new Error("Manca la variabile TMDB_API_KEY");
}

mkdirSync("src/environments", { recursive: true });

const productionContent = `export const environment = {
  production: true,
  tmdbApiKey: ${JSON.stringify(tmdbApiKey)},
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  imagesBaseUrl: 'https://image.tmdb.org/t/p/w500',
  springBootUrl: ${JSON.stringify(springBootUrl)}
};
`;

writeFileSync(
  "src/environments/environment.production.ts",
  productionContent
);

// Crea environment.ts solo se non esiste già
if (!existsSync("src/environments/environment.ts")) {
  writeFileSync(
    "src/environments/environment.ts",
    `export const environment = {
  production: false,
  tmdbApiKey: '',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  imagesBaseUrl: 'https://image.tmdb.org/t/p/w500',
  springBootUrl: 'http://localhost:8080/api'
};
`
  );
}

console.log("Configurazione Angular generata correttamente.");
