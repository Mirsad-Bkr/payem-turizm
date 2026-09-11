const fs = require("fs");

const p = "C:/Users/MSI/Desktop/payem-turizm/src/db/seed-data.ts";
let s = fs.readFileSync(p, "utf8");

const slugs = [
  "huser-yaylasi",
  "elevit-gito-yaylasi",
  "uzungol-turu",
  "mavigol-turu",
  "batum-turu",
  "karagol-turu",
  "sumela-manastiri-turu",
  "pokut-yaylasi-turu",
  "misir-turu",
  "dubai-turu",
  "gap-turu",
  "kapadokya-turu",
];

for (const slug of slugs) {
  const re = new RegExp(
    `(slug: "${slug}"[\\s\\S]*?coverImage: )"/images/hero\\.jpg"`,
  );
  const next = s.replace(re, `$1"/images/tours/${slug}.jpg"`);
  if (next === s) console.log("MISS", slug);
  else {
    s = next;
    console.log("SET", slug);
  }
}

fs.writeFileSync(p, s);
console.log("done");
