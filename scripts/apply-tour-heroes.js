const fs = require("fs");
const path = require("path");

const srcDir = "C:/Users/MSI/.cursor/projects/c-Users-MSI-Desktop-payem-turizm/assets";
const destDir = "C:/Users/MSI/Desktop/payem-turizm/public/images/tour-heroes";
fs.mkdirSync(destDir, { recursive: true });

const map = {
  "hero-huser.jpg": "huser-yaylasi.jpg",
  "hero-elevit.jpg": "elevit-gito-yaylasi.jpg",
  "hero-uzungol.jpg": "uzungol-turu.jpg",
  "hero-mavigol.jpg": "mavigol-turu.jpg",
  "hero-batum.jpg": "batum-turu.jpg",
  "hero-karagol.jpg": "karagol-turu.jpg",
  "hero-sumela.jpg": "sumela-manastiri-turu.jpg",
  "hero-pokut.jpg": "pokut-yaylasi-turu.jpg",
  "hero-misir.jpg": "misir-turu.jpg",
  "hero-dubai.jpg": "dubai-turu.jpg",
  "hero-gap.jpg": "gap-turu.jpg",
  "hero-kapadokya.jpg": "kapadokya-turu.jpg",
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

const slugs = Object.values(map).map((f) => f.replace(/\.jpg$/, ""));

for (const slug of slugs) {
  const heroPath = `/images/tour-heroes/${slug}.jpg`;
  // Insert heroImage after coverImage line within each tour block
  const re = new RegExp(
    `(slug: "${slug}"[\\s\\S]*?coverImage: "/images/tours/[^"]+")`,
  );
  const next = seed.replace(re, `$1,\n    heroImage: "${heroPath}"`);
  if (next === seed) {
    // kapadokya might use kapadokya-final
    const re2 = new RegExp(
      `(slug: "${slug}"[\\s\\S]*?coverImage: "/images/tours/[^"]+")`,
    );
    console.log("MISS", slug);
  } else {
    seed = next;
    console.log("SET", slug);
  }
}

fs.writeFileSync(seedPath, seed);
console.log("seed updated");
