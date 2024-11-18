import { db } from "../../src/database";
import { generateInstruments } from "./instruments";

async function main() {
  await generateInstruments();
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
