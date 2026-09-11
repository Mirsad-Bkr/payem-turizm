const fs = require("fs");
const path = require("path");

const dir = "C:/Users/MSI/Desktop/payem-turizm/public/images/tours";
const tmp = path.join(dir, "kapadokya-turu.tmp.jpg");
const finalAlt = path.join(dir, "kapadokya-final.jpg");

if (fs.existsSync(tmp)) {
  fs.copyFileSync(tmp, finalAlt);
  console.log("copied tmp -> kapadokya-final.jpg", fs.statSync(finalAlt).size);
}

const files = fs.readdirSync(dir);
for (const f of files) {
  console.log(f, fs.statSync(path.join(dir, f)).size);
}

const seed = fs.readFileSync("C:/Users/MSI/Desktop/payem-turizm/src/db/seed-data.ts", "utf8");
const covers = [...seed.matchAll(/coverImage: "(\/images\/tours\/[^"]+)"/g)].map((m) => m[1]);
console.log("covers:", covers.length);
covers.forEach((c) => console.log(c));

// If kapadokya locked, point seed to finalAlt name if we use kapadokya-turu.jpg missing/corrupt
const kap = path.join(dir, "kapadokya-turu.jpg");
if (fs.existsSync(finalAlt) && fs.statSync(finalAlt).size > 100000) {
  let s = seed;
  s = s.replace(
    'coverImage: "/images/tours/kapadokya-turu.jpg"',
    'coverImage: "/images/tours/kapadokya-final.jpg"',
  );
  fs.writeFileSync("C:/Users/MSI/Desktop/payem-turizm/src/db/seed-data.ts", s);
  console.log("seed kapadokya -> kapadokya-final.jpg");
}
