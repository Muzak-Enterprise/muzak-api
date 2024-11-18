import { genreService } from "../../src/services/genreService";

export async function generateGenres() {
  const count = await genreService.createMany(genres);

  console.log(`Generated ${count} genres`);
}

const genres = [
  "Blues",
  "Classique",
  "Country",
  "Disco",
  "Folk",
  "Funk",
  "Gospel",
  "Hard rock",
  "Hip-hop",
  "House",
  "Indie rock",
  "Jazz",
  "Metal",
  "New wave",
  "Pop",
  "Punk",
  "R&B",
  "Rap",
  "Reggae",
  "Rock",
  "Rock alternatif",
  "Rock progressif",
  "Soul",
  "Swing",
  "Techno",
  "Trap",
];
