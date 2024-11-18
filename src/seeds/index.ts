import { db } from "../../src/database";
import { generateGenres } from "./genres";
import { generateInstruments } from "./instruments";

async function main() {
  await generateInstruments();
  await generateGenres();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
