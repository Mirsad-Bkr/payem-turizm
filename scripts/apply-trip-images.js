const fs = require("fs");
const path = require("path");

const srcDir = "C:/Users/MSI/.cursor/projects/c-Users-MSI-Desktop-payem-turizm/assets";
const destDir = "C:/Users/MSI/Desktop/payem-turizm/public/images/trips";
fs.mkdirSync(destDir, { recursive: true });

const map = {
  "trip-sumela.jpg": "sumela-manastiri.jpg",
  "trip-kavron.jpg": "kavron-yaylasi.jpg",
  "trip-palovit.jpg": "palovit-yaylasi.jpg",
  "trip-elevit.jpg": "elevit-yaylasi.jpg",
  "trip-badara.jpg": "badara-yaylasi.jpg",
  "trip-gito.jpg": "gito-yaylasi.jpg",
  "trip-huser.jpg": "huser-yaylasi-gezi.jpg",
  "trip-pokut.jpg": "pokut-yaylasi.jpg",
  "trip-ayder.jpg": "ayder-yaylasi.jpg",
  "trip-anitkabir.jpg": "anitkabir.jpg",
};

for (const [from, to] of Object.entries(map)) {
  const src = path.join(srcDir, from);
  const dest = path.join(destDir, to);
  if (!fs.existsSync(src)) {
    console.log("MISSING", from);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log("OK", to, fs.statSync(dest).size);
}

const seedPath = "C:/Users/MSI/Desktop/payem-turizm/src/db/seed-data.ts";
let seed = fs.readFileSync(seedPath, "utf8");

const slugToFile = {
  "sumela-manastiri": "sumela-manastiri.jpg",
  "kavron-yaylasi": "kavron-yaylasi.jpg",
  "palovit-yaylasi": "palovit-yaylasi.jpg",
  "elevit-yaylasi": "elevit-yaylasi.jpg",
  "badara-yaylasi": "badara-yaylasi.jpg",
  "gito-yaylasi": "gito-yaylasi.jpg",
  "huser-yaylasi-gezi": "huser-yaylasi-gezi.jpg",
  "pokut-yaylasi": "pokut-yaylasi.jpg",
  "ayder-yaylasi": "ayder-yaylasi.jpg",
  anitkabir: "anitkabir.jpg",
};

for (const [slug, file] of Object.entries(slugToFile)) {
  const re = new RegExp(
    `(slug: "${slug}"[\\s\\S]*?coverImage: )"/images/hero\\.jpg"`,
  );
  const next = seed.replace(re, `$1"/images/trips/${file}"`);
  if (next === seed) console.log("MISS", slug);
  else {
    seed = next;
    console.log("SET", slug);
  }
}

fs.writeFileSync(seedPath, seed);
console.log("seed updated");
