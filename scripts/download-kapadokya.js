const fs = require("fs");
const path = require("path");
const https = require("https");

const dir = "C:/Users/MSI/Desktop/payem-turizm/public/images/tours";
const url =
  "https://www.payemtravel.com/wp-content/uploads/2025/03/kapadokya-web-banner-payem-1-scaled-1536x1296.jpg";
const tmp = path.join(dir, "kapadokya-turu.tmp.jpg");
const out = path.join(dir, "kapadokya-turu.jpg");

function get(u) {
  return new Promise((res, rej) => {
    https
      .get(u, { headers: { "User-Agent": "Mozilla/5.0" } }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          return get(r.headers.location).then(res, rej);
        }
        const c = [];
        r.on("data", (d) => c.push(d));
        r.on("end", () => res(Buffer.concat(c)));
      })
      .on("error", rej);
  });
}

(async () => {
  const buf = await get(url);
  fs.writeFileSync(tmp, buf);
  try {
    fs.unlinkSync(out);
  } catch {}
  fs.renameSync(tmp, out);
  console.log("OK", buf.length);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
